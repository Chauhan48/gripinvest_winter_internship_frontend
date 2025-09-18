# Grip Invest Frontend (React + TypeScript + Vite)

This is the frontend for the Grip Invest assignment, built with React, TypeScript, and Vite.

## Prerequisites
- Node.js 20.19+ or 22.12+ (Vite requirement)
- npm 9+
- Optional: Docker Desktop (for containerized build/run)

## Getting Started (Local)
1. Install dependencies:
   ```bash
   npm ci
   ```
2. Start the dev server (HMR on http://localhost:5173):
   ```bash
   npm run dev
   ```
3. Lint the code:
   ```bash
   npm run lint
   ```
4. Run tests:
   ```bash
   npm test
   ```
5. Build for production:
   ```bash
   npm run build
   ```
6. Preview the production build locally:
   ```bash
   npm run preview
   ```

## Environment Variables
If your APIs require environment variables, create a `.env` file in the project root and prefix variables with `VITE_`. For example:
```bash
VITE_API_BASE_URL=http://localhost:3000
```
These will be available via `import.meta.env.VITE_API_BASE_URL`.

## Project Scripts
- `dev`: Start Vite dev server
- `build`: Type-check and build production bundle
- `preview`: Serve the built `dist/` locally
- `lint`: Run ESLint
- `test`: Run Jest tests

## Docker
Containerize and run the app using the included `Dockerfile`.

### Build Image
```bash
npm run docker:build
```
This builds the app and prepares a minimal runtime that serves the compiled `dist/` on port 5173.

### Run Container
```bash
npm run docker:run
```
The app will be available at `http://localhost:5173`.

### Notes
- Some networks may block Docker Hub; ensure Docker Desktop is logged in. If pulls fail, try again later or switch base images.
- The container exposes port 5173. Adjust the port mapping in `package.json` if needed.

## Tech Stack
- React 19, TypeScript, Vite 7
- MUI (Material UI)
- Axios, React Router
- Jest + Testing Library for tests

## Folder Structure
- `src/` application source
- `src/pages/` route-level pages
- `src/components/` shared components
- `src/api/` API clients
- `dist/` build output (generated)

## Troubleshooting
- Node version warning: If you see a Vite Node version warning, upgrade Node to 20.19+ or 22.12+.
- TypeScript errors on build: run `npm run build` and address the reported files.
