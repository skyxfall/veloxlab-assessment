import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Items from './Items';
import { DataProvider } from '../state/DataContext';

jest.mock('react-window', () => {
  const ReactLib = require('react');
  return {
    FixedSizeList: ({ children: Row, itemCount, itemData }) =>
      ReactLib.createElement(
        'ul',
        null,
        Array.from({ length: itemCount }).map((_, index) =>
          ReactLib.createElement(Row, {
            key: index,
            index,
            style: {},
            data: itemData,
          }),
        ),
      ),
  };
});

function mockFetchResponse(payload) {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(payload),
  });
}

function renderItems() {
  return render(
    <MemoryRouter>
      <DataProvider>
        <Items />
      </DataProvider>
    </MemoryRouter>,
  );
}

describe('Items page', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      mockFetchResponse({
        items: [
          { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 2499 },
          { id: 2, name: 'Standing Desk', category: 'Furniture', price: 1199 },
        ],
        total: 2,
        limit: 50,
        offset: 0,
        page: 1,
        hasMore: false,
      }),
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  test('renders items from API', async () => {
    renderItems();
    expect(await screen.findByText('Laptop Pro')).toBeInTheDocument();
    expect(screen.getByText('Standing Desk')).toBeInTheDocument();
  });

  test('triggers a new request when typing in the search box', async () => {
    const user = userEvent.setup();
    renderItems();
    await screen.findByText('Laptop Pro');

    await act(async () => {
      await user.type(screen.getByLabelText(/search items/i), 'laptop');
    });

    await waitFor(() => {
      const lastCall = global.fetch.mock.calls.at(-1)[0];
      expect(lastCall).toContain('q=laptop');
    });
  });

  test('aborts the in-flight request on unmount', async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');
    const { unmount } = renderItems();
    unmount();
    expect(abortSpy).toHaveBeenCalled();
    abortSpy.mockRestore();
  });
});
