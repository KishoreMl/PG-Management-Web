import axios from 'axios';
const LOCAL_URL = "http://localhost:5000";
const BASE_URL = LOCAL_URL;

export async function createBranch(pg) {
    
}

export async function getBranches(pgId) {

}

export async function updateBranch(pgId) {
    
}

export async function deletepgBranch(pgId) {
    
}

export async function createGuest(guest) {
    
}

export async function getGuest(guestId) {
    
}

export async function updateGuest(guestId) {
    
}

export async function deleteGuest(guestId) {
    
}

export async function createRoom(room) {
    
}

export async function getRoom(roomId) {
    
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