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
