# Take‑Home Assessment

Item Catalog - React Window

<img width="1411" height="1358" alt="image" src="https://github.com/user-attachments/assets/0fd343f9-1325-4a44-b9f8-a541b1248e83" />

Item Details

<img width="1411" height="888" alt="image" src="https://github.com/user-attachments/assets/420fba20-0d74-438d-8adc-467730e0003f" />

Item Not Found


<img width="1411" height="888" alt="image" src="https://github.com/user-attachments/assets/bd1db151-e4fc-4fa2-af92-62b35a451a64" />

Page Not Found

<img width="1411" height="888" alt="image" src="https://github.com/user-attachments/assets/dd2f487b-5068-4d11-9306-c86beffe5913" />



Welcome, candidate! This project contains **intentional issues** that mimic real‑world scenarios.
Your task is to refactor, optimize, and fix these problems.

## Objectives

### 🔧 Backend (Node.js)

1. **Refactor blocking I/O**  
   - `src/routes/items.js` uses `fs.readFileSync`. Replace with non‑blocking async operations.

2. **Performance**  
   - `GET /api/stats` recalculates stats on every request. Cache results, watch file changes, or introduce a smarter strategy.

3. **Testing**  
   - Add **unit tests** (Jest) for items routes (happy path + error cases).

### 💻 Frontend (React)

1. **Memory Leak**  
   - `Items.js` leaks memory if the component unmounts before fetch completes. Fix it.

2. **Pagination & Search**  
   - Implement paginated list with server‑side search (`q` param). Contribute to both client and server.

3. **Performance**  
   - The list can grow large. Integrate **virtualization** (e.g., `react-window`) to keep UI smooth.

4. **UI/UX Polish**  
   - Feel free to enhance styling, accessibility, and add loading/skeleton states.

### 📦 What We Expect

- Idiomatic, clean code with comments where necessary.
- Tests that pass via `npm test` in both frontend and backend.
- A brief `SOLUTION.md` describing **your approach and trade‑offs**.

## Quick Start

node version: 18.XX
```bash
nvm install 18
nvm use 18

# Terminal 1
cd backend
npm install
npm start

# Terminal 2
cd frontend
npm install
npm start
```

> The frontend proxies `/api` requests to `http://localhost:3001`.
