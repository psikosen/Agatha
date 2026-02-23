# GSAD Frontend

React 19 + TypeScript + Vite frontend for the Global Situation Awareness Dashboard.

## Setup

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:5173` and proxies `/api` requests to the backend at `http://localhost:3001`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check and production build |
| `npm run test` | Run Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | ESLint check |
| `npm run preview` | Preview production build |

## Stack

- **React 19** — UI framework
- **TypeScript 5.9** — type safety
- **Vite 7** — build tool and dev server
- **Zustand** — lightweight state management
- **react-grid-layout** — draggable/resizable widget grid
- **Vitest** — test runner
- **ESLint** — linting

## Structure

```
src/
├── components/
│   ├── layout/         # DashboardHeader, GridDashboard, WidgetFrame, ErrorBoundary
│   └── widgets/        # 25 widget components (index.ts maps IDs to components)
├── config/
│   ├── gridSpec.ts     # Widget definitions and default grid positions
│   └── dataSources.ts  # API endpoint mappings
├── stores/
│   └── dashboardStore.ts  # Zustand store (layout, presets, widget state)
├── styles/
│   └── global.css      # Dark theme CSS variables and global styles
├── types/
│   └── widget.ts       # TypeScript interfaces
├── __tests__/          # Test files
├── App.tsx             # Root component
└── main.tsx            # Entry point
```
