import axios from 'axios';

/**
 * Base URL for all API requests.
 * Update this value (or replace with an environment variable) to point to a
 * staging or production backend.
 *
 * @example
 *   // To switch to production, change BASE_URL here:
 *   const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
 */
const LOCAL_URL = 'http://localhost:5000';
const BASE_URL = LOCAL_URL;

// ─── Branch APIs ─────────────────────────────────────────────────────────────

/**
 * Creates a new PG branch (property).
 *
 * @param {Object} pg - Branch payload.
 * @param {string} pg.branchName     - Display name of the branch.
 * @param {string} pg.location       - City / area.
 * @param {string} pg.address        - Full street address.
 * @param {string} pg.pincode        - Postal code.
 * @param {'MENS'|'WOMENS'|'BOTH'} pg.gender - Occupancy gender type.
 * @param {'AC'|'NON-AC'|'BOTH'} pg.type     - Air conditioning type.
 * @param {boolean} pg.isFoodAvailable - Whether food is provided.
 * @returns {Promise<void>} Resolves when the branch is created.
 * @todo Implement POST /branches request body and return created branch.
 */
export async function createBranch(pg) {}

/**
 * Fetches all branches owned by a given owner.
 *
 * Endpoint: GET /branches/:ownerId
 *
 * @param {string} ownerId - The owner's unique identifier.
 * @returns {Promise<Array<{
 *   branchId: string,
 *   branchName: string,
 *   location: string,
 *   address: string,
 *   pincode: string,
 *   gender: 'MENS'|'WOMENS'|'BOTH',
 *   type: 'AC'|'NON-AC'|'BOTH',
 *   isFoodAvailable: boolean
 * }>>} Array of branch objects.
 *
 * @known-issue The axios call is not awaited — `data` is always `undefined`
 *   on return. Fix: `const response = await axios.get(...)`.
 */
export async function getBranches(ownerId) {
  let data;
  axios
    .get(BASE_URL + '/branches/' + ownerId)
    .then((response) => {
      data = response.data;
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
  return data;
}

/**
 * Updates an existing PG branch.
 *
 * Endpoint: PATCH /branches/:pgId
 *
 * @param {string} pgId - The branch ID to update.
 * @returns {Promise<void>}
 * @todo Implement PATCH request with updated branch fields.
 */
export async function updateBranch(pgId) {}

/**
 * Deletes a PG branch.
 *
 * Endpoint: DELETE /branches/:pgId
 *
 * @param {string} pgId - The branch ID to delete.
 * @returns {Promise<void>}
 * @todo Implement DELETE request.
 */
export async function deletepgBranch(pgId) {}

// ─── Guest APIs ───────────────────────────────────────────────────────────────

/**
 * Creates a new guest record.
 *
 * @param {Object} guest - Guest payload.
 * @param {string} guest.name       - Full name of the guest.
 * @param {string} guest.type       - Guest type (e.g. student / professional).
 * @param {string} guest.roomNumber - Room assigned to the guest.
 * @param {string} guest.phoneNo    - Contact number.
 * @param {string} guest.address    - Residential address.
 * @param {string} guest.doj        - Date of joining (ISO date string).
 * @param {number} guest.advance    - Advance deposit amount.
 * @returns {Promise<void>} Resolves when the guest is created.
 * @todo Implement POST /guest request and return created guest.
 */
export async function createGuest(guest) {}

/**
 * Fetches full details for a single guest.
 *
 * Endpoint: GET /guest/:guestId
 *
 * @param {string} guestId - The guest's unique identifier.
 * @returns {Promise<{
 *   guestId: string,
 *   type: string,
 *   name: string,
 *   roomNumber: string,
 *   rentPaid: boolean,
 *   ebPaid: boolean,
 *   doj: string,
 *   dov: string,
 *   phoneNo: string,
 *   address: string,
 *   advance: number,
 *   advancePaid: boolean,
 *   advanceReturned: boolean,
 *   dues: Array<{ month: string, isRent: boolean, isEb: boolean }>
 * }>} Guest detail object.
 *
 * @known-issue The axios call is not awaited — `data` is always `undefined`
 *   on return. Fix: `const response = await axios.get(...)`.
 */
export async function getGuest(guestId) {
  let data;
  axios
    .get(BASE_URL + '/guest/' + guestId)
    .then((response) => {
      data = response.data;
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
  return data;
}

/**
 * Updates an existing guest record.
 *
 * Endpoint: PATCH /guest/:guestId
 *
 * @param {string} guestId - The guest ID to update.
 * @returns {Promise<void>}
 * @todo Implement PATCH request with updated guest fields.
 */
export async function updateGuest(guestId) {}

/**
 * Deletes a guest record.
 *
 * Endpoint: DELETE /guest/:guestId
 *
 * @param {string} guestId - The guest ID to delete.
 * @returns {Promise<void>}
 * @todo Implement DELETE request.
 */
export async function deleteGuest(guestId) {}

// ─── Room APIs ────────────────────────────────────────────────────────────────

/**
 * Creates a new room within a branch.
 *
 * @param {Object} room - Room payload.
 * @param {string} room.branchId    - Branch this room belongs to.
 * @param {string} room.roomNumber  - Display room number / label.
 * @param {'AC'|'NON-AC'} room.type - Air conditioning type.
 * @param {number} room.capacity    - Maximum number of guests.
 * @param {number} room.rent        - Monthly rent amount.
 * @param {number} room.perDayRent  - Per-day rent amount.
 * @returns {Promise<void>} Resolves when the room is created.
 * @todo Implement POST /rooms request and return created room.
 */
export async function createRoom(room) {}

/**
 * Fetches details for a single room.
 *
 * Endpoint: GET /rooms/:roomId
 *
 * @param {string} roomId - The room's unique identifier.
 * @returns {Promise<{
 *   roomId: string,
 *   number: string,
 *   type: 'AC'|'NON-AC',
 *   capacity: number,
 *   rent: number,
 *   perDayRent: number,
 *   ebReading: number,
 *   guests: Array<{ guestId: string, name: string, rentPaid: boolean, ebPaid: boolean }>
 * }>} Room detail object.
 *
 * @known-issue The axios call is not awaited — `data` is always `undefined`
 *   on return. Fix: `const response = await axios.get(...)`.
 * @known-issue `getRoom` and `getRooms` share the same URL pattern
 *   (`/rooms/:id`). The backend must distinguish room vs branch IDs.
 */
export async function getRoom(roomId) {
  let data;
  axios
    .get(BASE_URL + '/rooms/' + roomId)
    .then((response) => {
      data = response.data;
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
  return data;
}

/**
 * Fetches all rooms for a given branch.
 *
 * Endpoint: GET /rooms/:branchId
 *
 * @param {string} branchId - The branch whose rooms to retrieve.
 * @returns {Promise<Array<{
 *   branchId: string,
 *   roomId: string,
 *   roomNumber: string,
 *   type: 'AC'|'NON-AC',
 *   capacity: number,
 *   rent: number,
 *   perDayRent: number,
 *   guests: Array<{ guestId: string, name: string, rentPaid: boolean, ebPaid: boolean }>
 * }>>} Array of room objects.
 *
 * @known-issue The axios call is not awaited — `data` is always `undefined`
 *   on return. Fix: `const response = await axios.get(...)`.
 * @known-issue `getRooms` and `getRoom` share the same URL pattern
 *   (`/rooms/:id`). The backend must distinguish branch vs room IDs.
 */
export async function getRooms(branchId) {
  let data;
  axios
    .get(BASE_URL + '/rooms/' + branchId)
    .then((response) => {
      data = response.data;
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
  return data;
}

/**
 * Updates an existing room.
 *
 * Endpoint: PATCH /rooms/:roomId
 *
 * @param {string} roomId - The room ID to update.
 * @returns {Promise<void>}
 * @todo Implement PATCH request with updated room fields.
 */
export async function updateRoom(roomId) {}

/**
 * Deletes a room.
 *
 * Endpoint: DELETE /rooms/:roomId
 *
 * @param {string} roomId - The room ID to delete.
 * @returns {Promise<void>}
 * @todo Implement DELETE request.
 */
export async function deleteRoom(roomId) {}
