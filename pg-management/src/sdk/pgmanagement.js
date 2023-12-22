import axios from 'axios';
const LOCAL_URL = "http://localhost:5000";
const BASE_URL = LOCAL_URL;

export async function createBranch(pg) {
    
}

export async function getBranches(ownerId) {
    let data;
    axios.get(BASE_URL+"/branches/"+ownerId)
        .then(response => {
            data = response.data;
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        })
    return data;
}

export async function updateBranch(pgId) {
    
}

export async function deletepgBranch(pgId) {
    
}

export async function createGuest(guest) {
    
}

// get guest details
export async function getGuest(guestId) {
    let data;
    axios.get(BASE_URL+"/guest/"+guestId)
        .then(response => {
            data = response.data;
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        })
    return data;
}

export async function updateGuest(guestId) {
    
}

export async function deleteGuest(guestId) {
    
}

export async function createRoom(room) {
    
}

export async function getRoom(roomId) {
    let data;
    axios.get(BASE_URL+"/rooms/"+roomId)
        .then(response => {
            data = response.data;
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        })
    return data;
    
}
export async function getRooms(branchId) {
    let data;
    axios.get(BASE_URL+"/rooms/"+branchId)
        .then(response => {
            data = response.data;
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        })
    return data;
}

export async function updateRoom(roomId) {
    
}

export async function deleteRoom(roomId) {
    
}