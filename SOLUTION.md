# Solution

Quick notes on what I changed and why, split backend / frontend the same way the repo is.

## Backend

### Non-blocking I/O

The items route read the data file with `fs.readFileSync` on every request, which blocks the event loop. I moved all file access into `utils/dataStore.js`, which uses `fs/promises`. Writes go to a temp file that's then renamed over the target, so a crash mid-write can't leave a half-written `items.json` behind.

The routes themselves are thin. Each handler is wrapped in a small `asyncHandler` so a rejected promise gets forwarded to Express's error middleware instead of being swallowed. The actual work lives in `services/itemsService.js`. Concurrent `POST`s are serialized through a tiny promise-chain mutex (`utils/mutex.js`) so two writers can't both read, append, and clobber each other.

### Caching /api/stats

`GET /api/stats` recomputed the total and average price on every call. `utils/stats.js` now memoizes the result. The cache is cleared two ways: an `fs.watch` on the data directory, and an explicit `invalidate()` after a successful `POST /api/items`. The explicit call is the one I actually rely on — `fs.watch` is a best-effort backup since its behavior varies across platforms.

If a few requests hit while the cache is cold, they share a single in-flight promise, so the file is only read and parsed once.

### Pagination & search

`GET /api/items` accepts `q`, `page`, `limit`, and `offset`. `limit` defaults to 20 and is capped at 10000 so a caller can't ask the server to slice an unbounded array. Search is a case-insensitive substring match on the item name. The response carries the slice plus enough metadata to drive a UI: `{ items, total, limit, offset, page, hasMore }`.

### Hardening

A handful of standard production concerns:

- `helmet`, `compression`, and `cors` (origin configurable), plus `express.json` with a body-size limit.
- Rate limiting on writes only — GET/HEAD/OPTIONS skip the limiter.
- A request-id middleware that reuses or generates `X-Request-Id`, and `pino-http` structured logging with `Authorization`/`Cookie` redacted.
- A central error handler returning a consistent JSON shape, with stack traces included only outside production.
- `/healthz/live` and `/healthz/ready` (the latter confirms the data file is reachable).
- `server.js` sets sane HTTP timeouts and handles `SIGINT`/`SIGTERM` with a graceful shutdown plus a force-exit timer; `unhandledRejection`/`uncaughtException` are logged.

Config is parsed once in `config/env.js`. I also dropped a bogus `chai-as-afforded` dependency from `package.json` — it isn't a real package and broke `npm install`.

### Tests

Jest + Supertest, 17 tests across `items.test.js` and `stats.test.js`. They cover the items CRUD happy paths, the error cases (404 for unknown and non-numeric ids, 400 for invalid payloads), pagination and search, and the stats endpoint — including a check that two back-to-back calls return the same cached `computedAt`. `computeStats` is also tested directly as a pure function. The suite backs up `items.json` before the run, restores it after, and writes a small fixed sample in `beforeEach`.

## Frontend

### Structure

`pages/App.js` was doing everything, so I pulled the shell apart:

- `app/App.js` just composes `AppProviders` and `AppShell`.
- `AppProviders` mounts the router and the data context.
- `AppShell` is the skip link, nav, and the routed area.
- `AppRoutes` holds the route table. `ItemDetail` is `React.lazy`-loaded behind `Suspense`, and an unknown URL renders a real `NotFound` page rather than redirecting.

State lives in `state/DataContext.js`: a `useReducer` (the reducer is its own file, `itemsReducer.js`) exposed through two separate contexts, one for state and one for actions, so a component that only dispatches doesn't re-render when the item list changes.

Network calls are isolated in `services/`. `apiClient.js` is a thin `fetch` wrapper that builds query strings and throws a typed `ApiError` carrying the status code on any non-2xx response. `items.js` is just the two endpoint functions on top of it. Page logic sits in hooks (`useItemsPage`, `useItemDetail`), with `useDebouncedValue` and `useDocumentMeta` as small reusable ones. The detail page seeds itself from the list row's router state when it's there, then revalidates against the API.

### Fixing the memory leak

`Items.js` called `setState` after `fetch` resolved with no guard, so unmounting before the response arrived warned about updating an unmounted component — and with a fast typist, a stale response could overwrite a newer one.

Each fetching hook now creates an `AbortController` and aborts it in the effect cleanup. On top of that the data context keeps a `requestId` ref and ignores any response that isn't the latest, so even out-of-order responses can't clobber newer state.

### Search, virtualization, performance

Search is server-side via the `q` param. The input is debounced (300 ms) so typing doesn't fire a request per keystroke, and while the debounce settles the list shows a thin progress bar so it's clear something is pending.

The list can get large, so it's virtualized with `react-window` (`FixedSizeList`) — only the visible rows are in the DOM. Because the whole result set is virtualized, I dropped page-by-page navigation entirely: the client requests a large window in one call and you scroll it. A small "Viewing X–Y of Z" readout tracks the visible range in place of page buttons.

The re-render surface is kept small with `React.memo` on the presentational components and the state/actions context split mentioned above.

### Styling

There was almost no styling to start with, so I built a small design system under `design-system/`, organized as atoms / molecules / organisms / templates.

It's Tailwind underneath. The design tokens (color, type scale, spacing, radii, and so on) are defined once in `design-system/tokens.js` and fed into `tailwind.config.js`, so the utility classes and the theme stay in sync from a single source. `tokens.css` mirrors the few values that need to exist as CSS custom properties, and `index.css` pulls in Tailwind plus a small modern reset.

### Markup, SEO, accessibility

`index.html` has the usual head metadata: `lang`, viewport, description, theme-color, Open Graph / Twitter tags, a web manifest, `preconnect`s for the font host and the API, and a JSON-LD `WebSite` block. Per-route `<title>` and meta are handled by `useDocumentMeta`, which also restores the previous values on unmount.

Markup uses real landmarks (`<nav>`, `<main>`, `<header>`, `<article>`, `<search>`) and a sensible heading order. There's a skip link, a visible `:focus-visible` outline, `aria-busy` on the list while it loads, errors in a `role="alert"` region, and the loading bar exposed as a `progressbar`. `robots.txt` and `manifest.webmanifest` ship from `public/`.

### Tests

`Items.test.js` renders the page against a mocked `fetch` and checks that items appear, that typing in the search box triggers a request with the `q` param, and that unmounting aborts the in-flight request. `react-window` is mocked to render every row synchronously so the assertions don't depend on scroll position.

### Dependency audit

`react-scripts@5.0.1` is unmaintained and its transitive dependencies trip `npm audit` on a fresh install. Running `npm audit fix --force` "resolves" this by installing `react-scripts@0.0.0` — an empty placeholder package with no binary — so the install succeeds but `npm start` then fails with `spawn react-scripts ENOENT`. That's not a fix, so `react-scripts` stays pinned at `5.0.1`.

Instead, the `overrides` block in `package.json` bumps the genuinely fixable transitive deps to patched versions: `nth-check`, `postcss`, `serialize-javascript`, `resolve-url-loader`, `underscore`, and `http-proxy-agent` (the last pulls the Jest/jsdom test toolchain off the vulnerable `@tootallnate/once` chain). That clears 9 of the 11 advisories with no rollback — `npm install`, `npm run build`, `npm start`, and `npm test` all still pass.

The remaining 2 are both `webpack-dev-server`: a dev-server-only advisory with no production or build impact. Its only patched release (`5.x`) makes a breaking API change that `react-scripts@5.0.1`'s internal dev-server config doesn't support — overriding to it gets `npm audit` to zero but crashes `npm start`. Short of replacing the build tooling, the honest choice is to accept those two; they're left in place and called out here.

## Trade-offs

- Data is still a JSON file on disk. `dataStore.js` is the only thing that touches it, so swapping in SQLite or Postgres later is a contained change.
- The client fetches a large window of items at once instead of paging through the API. For this dataset that's fine and virtualization keeps it smooth; for a genuinely huge catalog I'd switch to windowed/infinite fetching against the pagination params the server already supports.
- Rate limiting and the stats cache both live in-process, so they don't hold across multiple instances. `express-rate-limit` accepts a Redis store, and the stats cache would need to move to a shared cache or just be recomputed per instance.
- No data-fetching library. For something much larger I'd reach for React Query and drop most of the context-plus-effects code, but the surface here is small enough that staying dependency-free felt right.

## Running

```bash
# Backend — http://localhost:3001
cd backend && npm install && npm start
npm test

# Frontend — http://localhost:3000
cd frontend && npm install && npm start
npm test
```
