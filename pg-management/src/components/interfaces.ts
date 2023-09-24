interface PG{
    name: string;
    id: string;
    ownerName: string;
    password: string;
    noOfBaranches: string;
}

interface Branch{
    pgId: string;
    name: string;
    id: string;
    location: string;
    noOfRooms: number;
}

interface Room{
    branchId: string;
    name: string;
    id: string;
    type: string;
    capacity: number;
    rent: number;
    currentEbBill: number;
    availablesBeds: number;
}

interface Guest{
    name: string;
    id: string;
    age: number;
    phoneNumber: number;
    address: string;
    roomId: string;
    roomNumber: string;
    advancePaid: boolean;
    rentPaid: boolean;
}