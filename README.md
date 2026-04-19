# PG Management Web

A React-based single-page web application for managing PG (Paying Guest) accommodations and hostels — covering branches, rooms, and guests with a dynamic UI.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Building for Production](#building-for-production)
  - [Running Tests](#running-tests)
- [Configuration](#configuration)
- [API / SDK](#api--sdk)
- [Roadmap](#roadmap)

---

## Overview

PG Management Web is a client-side application built with **React 18** and **React Router v6**. It provides a management interface for PG / hostel operators to:

- Browse and manage **branches** (properties) through grid and list views
- Manage **rooms** within a branch, including filters, custom fields, and detail panels
- Track **guests** assigned to rooms with dedicated detail panels and forms
- Support future features including login, settings, license management, payment integration, and WhatsApp messaging

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 18 |
| Routing | React Router v6 |
| Build Tool | Create React App (`react-scripts` 5) |
| HTTP Client | Axios |
| Styling | Sass (SCSS modules) |
| Testing | Jest + React Testing Library |
| Linting | ESLint (`eslint-config-react-app`), Stylelint (SCSS) |
| Formatting | Prettier |

---

## Project Structure

```
PG-Management-Web/
├── public/                  # Static assets and PWA manifest
├── src/
│   ├── App.js               # Root layout and router setup
│   ├── index.js             # React 18 entry point (createRoot)
│   ├── pages/
│   │   └── BranchesPage/    # Home screen — branch grid and list views
│   ├── components/
│   │   ├── RoomsPage/       # Rooms management (filters, modals, panels)
│   │   ├── BranchesGridView/
│   │   ├── BranchesListView/
│   │   ├── BranchTile/
│   │   ├── RoomsGridView/
│   │   ├── RoomsListView/
│   │   ├── RoomTile/
│   │   ├── RightPanel/      # Dispatches to GuestRightPanel / RoomRightPanel
│   │   ├── Header/
│   │   ├── ToolBar/
│   │   ├── GuestCard/
│   │   ├── UIComponents/    # Modal, Toast, Tooltip, FormInputs, Icons, etc.
│   │   ├── LoginPage/       # (Placeholder — not yet routed)
│   │   ├── Settings/        # (Placeholder — not yet routed)
│   │   └── LicensePage/     # (Placeholder — not yet routed)
│   ├── mockData/            # branches.json, rooms.json (dev data)
│   ├── sdk/
│   │   └── pgmanagement.js  # Axios API helpers (base URL: localhost:5000)
│   └── vars.scss            # Global SCSS variables and theming
├── .editorconfig
├── .prettierrc.json
├── .stylelintrc.json
└── package.json
```

---

## Features

### Branches
- Grid and list view toggle for branch (property) cards
- Create branch modal
- Navigate into a branch to view its rooms

### Rooms
- Grid and list view toggle for room cards
- Filter rooms by sharing type, room type, and rent range
- Right panel for detailed room information
- Create room modal with dynamic custom fields (text, radio, checkbox, dropdown, number)
- Consent modal and new guest form

### Guests
- Guest detail right panel (`GuestRightPanel`)
- Guest card component with avatar support

### Shared UI Components
- Reusable `Modal`, `Toast`, `Tooltip`
- Custom form inputs and dropdown
- Icon library (`UIComponents/Icons/`)

---

## Getting Started

### Prerequisites

- **Node.js** v16 or later
- **npm** v8 or later

### Installation

```bash
git clone https://github.com/KishoreMl/PG-Management-Web.git
cd PG-Management-Web
npm install
```

### Running the App

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in the browser. The page hot-reloads on file changes.

> The app currently uses **mock data** for rooms and branches. To connect to a live backend, update `BASE_URL` in `src/sdk/pgmanagement.js` and implement the API stub functions.

### Building for Production

```bash
npm run build
```

Outputs an optimized production bundle to the `build/` directory.

### Running Tests

```bash
npm test
```

Launches Jest in interactive watch mode.

---

## Configuration

| File | Purpose |
|---|---|
| `.editorconfig` | UTF-8, 2-space indent, LF line endings, trim trailing whitespace |
| `.prettierrc.json` | Code formatting (single quotes, print width 125) |
| `.stylelintrc.json` | SCSS linting (`stylelint-config-standard-scss`, `stylelint-order`) |
| `package.json` → `eslintConfig` | Extends `react-app` and `react-app/jest` |
| `public/manifest.json` | PWA manifest (CRA default) |

---

## API / SDK

API calls are centralized in `src/sdk/pgmanagement.js` using **Axios**.

- **Base URL:** `http://localhost:5000` (hardcoded; update for different environments)
- Covers CRUD operations for **branches**, **rooms**, and **guests**
- Several functions are currently **stubs** — implementation pending backend readiness

> **Known issue — async/await bug:** `getBranches`, `getGuest`, `getRoom`, and `getRooms` use `.then()` without `await`, so they always return `undefined`. Each needs to be rewritten as `const response = await axios.get(...)`.

> **Known issue — URL collision:** `getRoom(roomId)` and `getRooms(branchId)` call the same endpoint pattern (`GET /rooms/:id`). The backend must distinguish between a room ID and a branch ID, or the paths should be made distinct (e.g. `/rooms/by-branch/:branchId`).

---

### Branch Functions

| Function | Method | Endpoint | Status | Parameters |
|---|---|---|---|---|
| `createBranch(pg)` | POST | `/branches` | Stub | `pg: { branchName, location, address, pincode, gender, type, isFoodAvailable }` |
| `getBranches(ownerId)` | GET | `/branches/:ownerId` | Async bug | `ownerId: string` |
| `updateBranch(pgId)` | PATCH | `/branches/:pgId` | Stub | `pgId: string` |
| `deletepgBranch(pgId)` | DELETE | `/branches/:pgId` | Stub | `pgId: string` |

**Branch object shape** (from API Design):

```json
{
  "branchId": "string",
  "branchName": "string",
  "location": "string",
  "address": "string",
  "pincode": "string",
  "gender": "MENS | WOMENS | BOTH",
  "type": "AC | NON-AC | BOTH",
  "isFoodAvailable": true
}
```

---

### Room Functions

| Function | Method | Endpoint | Status | Parameters |
|---|---|---|---|---|
| `createRoom(room)` | POST | `/rooms` | Stub | `room: { branchId, roomNumber, type, capacity, rent, perDayRent }` |
| `getRoom(roomId)` | GET | `/rooms/:roomId` | Async bug | `roomId: string` |
| `getRooms(branchId)` | GET | `/rooms/:branchId` | Async bug | `branchId: string` |
| `updateRoom(roomId)` | PATCH | `/rooms/:roomId` | Stub | `roomId: string` |
| `deleteRoom(roomId)` | DELETE | `/rooms/:roomId` | Stub | `roomId: string` |

**Room object shape** (from API Design):

```json
{
  "roomId": "string",
  "branchId": "string",
  "roomNumber": "string",
  "type": "AC | NON-AC",
  "capacity": 3,
  "rent": 5000,
  "perDayRent": 200,
  "ebReading": 120,
  "guests": [
    { "guestId": "string", "name": "string", "rentPaid": true, "ebPaid": false }
  ]
}
```

---

### Guest Functions

| Function | Method | Endpoint | Status | Parameters |
|---|---|---|---|---|
| `createGuest(guest)` | POST | `/guest` | Stub | `guest: { name, type, roomNumber, phoneNo, address, doj, advance }` |
| `getGuest(guestId)` | GET | `/guest/:guestId` | Async bug | `guestId: string` |
| `updateGuest(guestId)` | PATCH | `/guest/:guestId` | Stub | `guestId: string` |
| `deleteGuest(guestId)` | DELETE | `/guest/:guestId` | Stub | `guestId: string` |

**Guest object shape** (from API Design):

```json
{
  "guestId": "string",
  "type": "string",
  "name": "string",
  "roomNumber": "string",
  "rentPaid": true,
  "ebPaid": false,
  "doj": "2024-01-15",
  "dov": "2024-07-15",
  "phoneNo": "string",
  "address": "string",
  "advance": 5000,
  "advancePaid": true,
  "advanceReturned": false,
  "dues": [
    { "month": "2024-03", "isRent": false, "isEb": true }
  ]
}
```

---

### Future Scope — Ticket APIs (not yet implemented)

| Function | Method | Endpoint | Description |
|---|---|---|---|
| `createTicket(ticket)` | POST | `/tickets` | Log a maintenance issue for a room |
| `getTickets(branchId)` | GET | `/tickets/:branchId` | List all tickets for a branch |
| `updateTicket(ticketId)` | PATCH | `/tickets/:ticketId` | Update status or add comments |
| `deleteTicket(ticketId)` | DELETE | `/tickets/:ticketId` | Remove a ticket |

**Ticket object shape:**

```json
{
  "ticketId": "string",
  "branchId": "string",
  "roomId": "string",
  "roomNumber": "string",
  "issue": "string",
  "status": "string",
  "comments": "string",
  "cAt": "2024-01-15T10:00:00Z",
  "cBy": "string",
  "mAt": "2024-01-20T14:00:00Z",
  "mBy": "string"
}
```

---

## Roadmap

- [ ] Migrate remaining `.jsx` components to `.tsx` (TypeScript)
- [ ] Fix room filter bugs
- [ ] Wire up `LoginPage` route and authentication flow
- [ ] Complete `Settings` page
- [ ] Fix Create Room / Create Branch modal issues
- [ ] Replace mock data with live API calls
- [ ] License management page
- [ ] Payment integration
- [ ] WhatsApp messaging notifications
- [ ] Guest proof / document file storage
