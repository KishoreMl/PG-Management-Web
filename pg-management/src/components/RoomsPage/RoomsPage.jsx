import React from "react";
import { RoomTile } from "../RoomTile/RoomTile";
import { Header } from "../Header/Header";
import { RightPanel } from "../RightPanel/RightPanel";
import { ToolBar } from "../ToolBar/ToolBar";
import { RoomsTable } from "../RoomsTable/RoomsTable";
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
           <div className="container">
                <Header />
                <ToolBar />
                
                <div className="room-container">
                    <RoomTile room={room} />
                    <RoomTile room={room} />
                    <RoomTile room={room}/>
                    <RoomTile room={room} />  
                </div>
                
            </div>
        )
    }
}