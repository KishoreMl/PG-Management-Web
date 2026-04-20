# System Architecture — PG Management Web

## Table of Contents

- [Overview](#overview)
- [Architecture Style](#architecture-style)
- [High-Level Diagram](#high-level-diagram)
- [Frontend Architecture](#frontend-architecture)
  - [Entry Point & Root Layout](#entry-point--root-layout)
  - [Routing](#routing)
  - [Page Components](#page-components)
  - [Feature Components](#feature-components)
  - [Shared UI Components](#shared-ui-components)
- [SDK / API Layer](#sdk--api-layer)
  - [Base Configuration](#base-configuration)
  - [Resource Modules](#resource-modules)
  - [Known Issues](#known-issues)
- [Data Flow](#data-flow)
  - [Current (Mock Data)](#current-mock-data)
  - [Target (Live Backend)](#target-live-backend)
- [Styling System](#styling-system)
- [State Management](#state-management)
- [Testing](#testing)
- [Build & Tooling](#build--tooling)
- [Future Architecture Considerations](#future-architecture-considerations)

---

## Overview

PG Management Web is a **React 18 single-page application (SPA)** built for PG (Paying Guest) hostel operators. It provides a management interface for browsing branches (properties), managing rooms within each branch, and tracking guest assignments.

The application currently operates in a **client-only mode** — all data is sourced from local mock JSON files. The SDK layer (`src/sdk/pgmanagement.js`) is designed and stubbed to communicate with a REST backend at `http://localhost:5000` once it is available.

---

## Architecture Style

| Dimension         | Decision                                          |
|-------------------|---------------------------------------------------|
| Application type  | Client-side SPA (no SSR)                          |
| Frontend framework | React 18 with functional components and hooks    |
| Routing           | React Router v6 (declarative `<Routes>`)          |
| Backend (future)  | REST API (Node.js / Express — not in this repo)   |
| HTTP client       | Axios (`src/sdk/pgmanagement.js`)                 |
| Styling           | Sass (SCSS modules, per-component `.scss` files)  |
| Language          | JavaScript (JSX); LoginPage and Settings use TSX  |
| Build system      | Create React App (`react-scripts` 5)              |

---

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (SPA)                        │
│                                                          │
│  ┌──────────┐   ┌──────────────────────────────────┐    │
│  │  Header  │   │         React Router              │    │
│  └──────────┘   │                                   │    │
│                 │  /          → BranchesPage        │    │
│                 │  /rooms     → RoomsPage            │    │
│                 └──────────────────────────────────-┘    │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │                  SDK Layer                        │   │
│  │          src/sdk/pgmanagement.js (Axios)          │   │
│  └────────────────────┬─────────────────────────────┘   │
└───────────────────────┼─────────────────────────────────┘
                        │ HTTP (REST)
                        ▼
          ┌─────────────────────────┐
          │   Backend REST API      │
          │   http://localhost:5000 │
          │   (not in this repo)    │
          └─────────────────────────┘
```

---

## Frontend Architecture

### Entry Point & Root Layout

| File              | Role                                                                 |
|-------------------|----------------------------------------------------------------------|
| `src/index.js`    | React 18 entry point — mounts `<App />` via `createRoot`             |
| `src/App.js`      | Root component — renders `<Header>` and the `<Router>` with routes   |
| `src/App.css`     | Global reset and base styles                                         |
| `src/index.css`   | Body-level styles                                                    |
| `src/vars.scss`   | Global SCSS variables and design tokens (colours, spacing, fonts)    |

### Routing

React Router v6 is configured in `App.js` with two active routes:

| Path      | Component       | Description                              |
|-----------|-----------------|------------------------------------------|
| `/`       | `BranchesPage`  | Home screen — grid / list of branches    |
| `/rooms`  | `RoomsPage`     | Rooms management screen for a branch     |

The following components are implemented but **not yet wired to routes**:

| Component      | Planned Route    |
|----------------|------------------|
| `LoginPage`    | `/login`         |
| `Settings`     | `/settings`      |
| `LicensePage`  | `/license`       |

### Page Components

```
src/pages/
└── BranchesPage/
    └── BranchesPage.jsx    ← Lists all branches (grid or list view)
```

`BranchesPage` is the main entry screen. It reads branch mock data and delegates rendering to `BranchesGridView` or `BranchesListView` depending on the selected view mode.

### Feature Components

```
src/components/
├── RoomsPage/              ← Full rooms management screen
│   ├── RoomsPage.jsx
│   └── RoomsPage.scss
├── BranchesGridView/       ← Grid layout for branch cards
├── BranchesListView/       ← List/table layout for branches
├── BranchTile/             ← Individual branch card (used in grid view)
├── RoomsGridView/          ← Grid layout for room cards
├── RoomsListView/          ← List/table layout for rooms
├── RoomTile/               ← Individual room card (used in grid view)
├── RightPanel/
│   ├── RightPanel.jsx      ← Dispatcher — decides which panel to render
│   ├── RoomRightPanel.jsx  ← Detailed room info panel
│   └── GuestRightPanel.jsx ← Detailed guest info panel
├── Header/                 ← Top navigation bar
├── ToolBar/                ← View-toggle, filter, and action controls
├── GuestCard/              ← Guest avatar + summary card
├── LoginPage/              ← (Placeholder, not yet routed)
├── Settings/               ← (Placeholder, not yet routed)
└── LicensePage/            ← (Placeholder, not yet routed)
```

**Component communication pattern:**

- Parent components hold state (selected branch, view mode, open panels).
- State and callbacks are passed down via **props**.
- No global state manager (Redux / Context API) is currently used.

### Shared UI Components

Located at `src/components/UIComponents/`:

| Component        | Purpose                                               |
|------------------|-------------------------------------------------------|
| `Modal`          | Generic overlay modal wrapper                         |
| `Toast`          | Temporary notification banner                         |
| `ToolTip`        | Hover tooltip wrapper                                 |
| `FormInputs`     | Reusable input controls (text, radio, checkbox, etc.) |
| `CustomDropdown` | Styled dropdown selector                              |
| `Avatar`         | User / guest avatar display                           |
| `Icons`          | SVG icon library                                      |

---

## SDK / API Layer

### Base Configuration

All HTTP calls are centralised in `src/sdk/pgmanagement.js` using **Axios**.

```
BASE_URL = http://localhost:5000   (hardcoded; use REACT_APP_API_URL env var to override)
```

### Resource Modules

| Resource  | Functions                                                     | Endpoints                     |
|-----------|---------------------------------------------------------------|-------------------------------|
| Branches  | `createBranch`, `getBranches`, `updateBranch`, `deletepgBranch` | `/branches`, `/branches/:id` |
| Rooms     | `createRoom`, `getRoom`, `getRooms`, `updateRoom`, `deleteRoom` | `/rooms`, `/rooms/:id`       |
| Guests    | `createGuest`, `getGuest`, `updateGuest`, `deleteGuest`        | `/guest`, `/guest/:id`       |

**Planned (not yet implemented):**

| Resource  | Functions                                                     | Endpoints                     |
|-----------|---------------------------------------------------------------|-------------------------------|
| Tickets   | `createTicket`, `getTickets`, `updateTicket`, `deleteTicket`  | `/tickets`, `/tickets/:id`   |
| Owner     | `createOwner`, `updateOwner`, `deleteOwner`                   | `/owner`, `/owner/:id`       |

### Known Issues

1. **Async/await bug** — `getBranches`, `getGuest`, `getRoom`, and `getRooms` use `.then()` without `await`, causing the function to always return `undefined`. Each must be rewritten as:
   ```js
   const response = await axios.get(...);
   return response.data;
   ```

2. **URL collision** — `getRoom(roomId)` and `getRooms(branchId)` both call `GET /rooms/:id`. The backend must distinguish between a room ID and a branch ID, or the paths must be made distinct (e.g. `GET /rooms/by-branch/:branchId`).

---

## Data Flow

### Current (Mock Data)

```
BranchesPage
    │
    ├── import branches from src/mockData/branches.json
    │
    └── RoomsPage
            │
            └── import rooms from src/mockData/rooms.json
```

Mock files reside in `src/mockData/` and are imported directly. No network request is made in the current state.

### Target (Live Backend)

```
Component
    │
    ├── calls SDK function (e.g. getBranches(ownerId))
    │
    ├── SDK → Axios → GET http://localhost:5000/branches/:ownerId
    │
    └── response.data → component state → re-render
```

To switch from mock data to live data:
1. Fix the async/await bugs in `pgmanagement.js`.
2. Replace direct mock imports with SDK function calls inside `useEffect` hooks.
3. Set `REACT_APP_API_URL` in a `.env` file to point to the backend.

---

## Styling System

- Each component has a co-located `.scss` file (e.g. `Header.jsx` + `Header.scss`).
- Global design tokens (colours, spacing, breakpoints) are defined in `src/components/vars.scss`.
- Linting is enforced by **Stylelint** (`stylelint-config-standard-scss` + property order rules).
- No CSS-in-JS solution is used.

---

## State Management

The application uses **local component state only** (`useState`, `useEffect`). There is no Redux, Zustand, or React Context API in use. For the current scope this is appropriate; as feature complexity grows (authentication, cross-page notifications, global user context), a lightweight global state solution should be introduced.

---

## Testing

| Tool                     | Purpose                                        |
|--------------------------|------------------------------------------------|
| Jest                     | Test runner and assertion library              |
| React Testing Library    | Component rendering and interaction testing    |
| `src/App.test.js`        | Baseline smoke test for the root `<App />`     |
| `src/setupTests.js`      | Jest setup — imports `@testing-library/jest-dom` |

Run all tests:
```bash
npm test
```

---

## Build & Tooling

| Tool              | Config file             | Purpose                                        |
|-------------------|-------------------------|------------------------------------------------|
| Create React App  | `package.json`          | Build, dev server, test runner                 |
| ESLint            | `package.json` (eslintConfig) | JS/JSX linting (`react-app` ruleset)     |
| Stylelint         | `.stylelintrc.json`     | SCSS linting and property ordering             |
| Prettier          | `.prettierrc.json`      | Code formatting (single quotes, width 125)     |
| EditorConfig      | `.editorconfig`         | UTF-8, 2-space indent, LF line endings         |

Production build:
```bash
npm run build   # outputs to build/
```

---

## Future Architecture Considerations

| Area                   | Notes                                                                                 |
|------------------------|---------------------------------------------------------------------------------------|
| Authentication         | `LoginPage` exists as a placeholder; backend auth flow and protected routes needed    |
| TypeScript migration   | `LoginPage.tsx` and `Settings.tsx` already use TSX; remaining `.jsx` files to follow  |
| Global state           | Introduce React Context or Zustand when auth/user context spans multiple pages        |
| Environment config     | Replace hardcoded `BASE_URL` with `REACT_APP_API_URL` from `.env`                     |
| Backend API            | Resolve URL collision between `getRoom` / `getRooms` before going live               |
| Ticket system          | Maintenance ticket APIs are designed but not yet implemented in the SDK or UI         |
| File storage           | Guest proof / document upload (mentioned in Features.txt roadmap)                     |
| Payments               | Payment integration planned (gateway TBD)                                             |
| Notifications          | WhatsApp messaging trigger integration planned                                         |
| License management     | `LicensePage` placeholder exists; license validation flow to be designed              |
