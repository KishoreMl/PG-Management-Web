import React from "react";
import { RoomTile } from "../RoomTile/RoomTile";
import { Header } from "../Header/Header";
import './RoomsPage.scss';

export class RoomsPage extends React.Component{
    render()
    {
        const room = {
                name: "F6",
                type: "AC",
                capacity: 3,
                guests: [{
                name: "Raghu",
                age: 21,
                rentPaid: true,
                EBBillPaid: true,
      
                },
                {
                name: "Ram",
                age: 21,
                rentPaid: true,
                EBBillPaid: true,
                
                },
                {
                name: "Saravana",
                age: 21,
                rentPaid: true,
                EBBillPaid: true,
                },]
            }
        return (
           <div>
                <Header />
                <div className="room-container">
                    <RoomTile room={room} />
                    <RoomTile room={room} />
                    <RoomTile room={room}/>
                    <RoomTile room={room}/>
                </div>
            </div>
        )
    }
}