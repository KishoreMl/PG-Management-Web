import React from "react";
import { RoomTile } from "../RoomTile/RoomTile";
import './GridView.scss';

export class GridView extends React.Component{
    constructor(props)
    {
        super(props);
    }
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
                <div className="room-container">
                    <RoomTile room={room} />
                    <RoomTile room={room} />
                    <RoomTile room={room} />
                    <RoomTile room={room} />  
                </div>
            </div>
        )
    }
}