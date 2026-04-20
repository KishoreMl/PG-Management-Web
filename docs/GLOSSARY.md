# Glossary — PG Management Web

Domain-specific terms, abbreviations, and technical vocabulary used throughout the PG Management Web codebase, documentation, and API design.

---

## Domain Terms

### Advance
A refundable security deposit collected from a guest at the time of check-in. Tracked via the `advance`, `advancePaid`, and `advanceReturned` fields on the Guest object.

### Branch
A single physical PG property or hostel location managed by an owner. Each branch has its own address, gender policy, AC type, and food availability. Branches contain one or more rooms.

> Also referred to as **PG** or **property** in some contexts.

### DOJ (Date of Joining)
The date on which a guest checked into a room. Stored as an ISO date string (e.g. `"2024-01-15"`).

### DOV (Date of Vacating)
The date on which a guest vacated or is expected to vacate a room. Stored as an ISO date string.

### Dues
A record of unpaid rent or EB (electricity bill) for a specific month. Each due entry on the Guest object has the shape:
```json
{ "month": "2024-03", "isRent": false, "isEb": true }
```

### EB (Electricity Board) Reading
The electricity meter reading for a room, used to calculate the electricity bill for guests. Stored as a numeric value on the Room object (`ebReading`).

### EB Paid / `ebPaid`
A boolean flag indicating whether a guest has paid their electricity bill for the current period.

### Food Available / `isFoodAvailable`
A boolean flag on a Branch indicating whether the property provides meals to guests.

### Gender Policy
Defines which gender(s) are allowed to occupy a branch. Possible values:
- `MENS` — male occupants only
- `WOMENS` — female occupants only
- `BOTH` — mixed occupancy

### Guest
An individual person who is assigned to a room in a branch. Guests have personal details (name, phone, address), financial details (rent status, advance, dues), and stay dates (DOJ, DOV).

### Guest Type
A classification for a guest, typically used to distinguish between student and working professional occupants. Stored as a free-text string on the Guest object.

### License
An entitlement or subscription record that controls access to the application or specific features. Managed via the `LicensePage` component (currently a placeholder). Tied to the Owner profile (`license` field in Owner Details API).

### Owner
The operator or administrator who manages one or more PG branches. The owner profile includes their name, PG name, license details, electricity price per unit, and configurable custom fields for guests and rooms.

### Per Day Rent / `perDayRent`
The daily rental rate for a room, used when a guest's stay does not span a full month.

### PG (Paying Guest)
An accommodation model where tenants pay for a room in a shared property, typically including basic amenities. The application is built to manage PG properties.

### Rent Paid / `rentPaid`
A boolean flag indicating whether a guest has paid their monthly rent for the current period.

### Room
A physical room within a branch. Each room has a room number, capacity (maximum number of guests), rent amounts, AC type, and a list of currently assigned guests.

### Room Number / `roomNumber`
A human-readable label for a room within a branch (e.g. `"101"`, `"A2"`). Not necessarily a numeric ID.

### Sharing Type
The category of occupancy for a room based on the number of guests it accommodates (e.g. single, double, triple). Used as a filter option in the Rooms view.

### Ticket
A maintenance or support issue logged against a room or branch. Tickets track the issue description, status, comments, and audit metadata (`cAt`, `cBy`, `mAt`, `mBy`). Part of the future scope — not yet implemented in the UI or SDK.

---

## Technical Terms

### Axios
The HTTP client library used in `src/sdk/pgmanagement.js` to communicate with the backend REST API.

### BASE_URL
The root URL used for all API requests. Currently hardcoded to `http://localhost:5000`. Should be replaced with the `REACT_APP_API_URL` environment variable for environment-specific deployments.

### BranchesPage
The root/home page of the application (`/`). Displays a list of all branches belonging to the owner in either grid or list view.

### BranchTile
A card-style component used in `BranchesGridView` to display a summary of a single branch.

### Create React App (CRA)
The build toolchain used to scaffold and build this project (`react-scripts` 5). Provides a development server, bundler (webpack), and test runner (Jest) with zero manual configuration.

### Custom Fields
Owner-configurable fields that can be added to rooms or guests beyond the standard fields. Defined in the Owner Details API response under `GuestFields` and `RoomFields`. Supported types in the Create Room modal: text, radio, checkbox, dropdown, number.

### GuestCard
A component that renders a guest's avatar and summary information, used within room detail panels.

### GuestRightPanel
The right-side detail panel that displays full information for a selected guest.

### Header
The top navigation bar rendered globally across all pages.

### Mock Data
Static JSON files located in `src/mockData/` (`branches.json`, `rooms.json`) used as a substitute for live API responses during development.

### Modal
A reusable overlay dialog component from `UIComponents/Modal`. Used for the Create Branch, Create Room, and consent forms.

### Owner Details API
A backend endpoint (planned) that returns the owner's profile including their name, PG name, license, electricity price per unit, and customisable guest/room field definitions.

### React Router v6
The routing library used to manage client-side navigation between pages. Routes are defined declaratively using `<Routes>` and `<Route>` components in `App.js`.

### RightPanel
A container component (`RightPanel.jsx`) that dispatches to either `RoomRightPanel` or `GuestRightPanel` depending on what is selected in the rooms view.

### RoomsPage
The rooms management screen accessible at `/rooms`. Displays all rooms for a selected branch with grid/list view toggle, filter controls, and a right panel for detail view.

### RoomRightPanel
The right-side detail panel that displays full information for a selected room, including its guests.

### RoomTile
A card-style component used in `RoomsGridView` to display a summary of a single room.

### SCSS Module
A `.scss` file co-located with a component that contains its styles. Global variables are imported from `vars.scss`.

### SDK (`pgmanagement.js`)
The central module in `src/sdk/pgmanagement.js` that exports async functions for each CRUD operation across branches, rooms, and guests. Acts as the single integration point between the UI and the backend.

### SPA (Single-Page Application)
An application that loads a single HTML page and dynamically updates content via JavaScript, without full page reloads. This project is a React-based SPA.

### Stub
An SDK function that has been defined with the correct signature and JSDoc but has no implementation body. Marked with `@todo` comments. These functions need to be completed once the backend API is available.

### Toast
A reusable notification component from `UIComponents/Toast` that displays a brief, dismissible message to the user.

### ToolBar
The action bar within a page that contains view-toggle controls (grid/list), filter dropdowns, and action buttons (e.g. Create Room).

### ToolTip
A hover-triggered informational overlay component from `UIComponents/ToolTip`.

### `vars.scss`
The global SCSS variables file at `src/components/vars.scss`. Defines shared design tokens such as colours, spacing values, font sizes, and breakpoints consumed across all component stylesheets.

---

## Abbreviations Quick Reference

| Abbreviation | Full Form                        |
|--------------|----------------------------------|
| AC           | Air Conditioned                  |
| CRA          | Create React App                 |
| DOJ          | Date of Joining                  |
| DOV          | Date of Vacating                 |
| EB           | Electricity Board (bill/reading) |
| PG           | Paying Guest                     |
| SDK          | Software Development Kit         |
| SPA          | Single-Page Application          |
| UI           | User Interface                   |
| UX           | User Experience                  |
