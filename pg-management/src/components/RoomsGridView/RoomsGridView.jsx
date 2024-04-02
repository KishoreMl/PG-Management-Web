import React from "react";
import { RoomTile } from "../RoomTile/RoomTile";
import './RoomsGridView.scss';

export class RoomsGridView extends React.Component{

    render()
    {
        return (
            <div className="grid-container">
                {this.props.rooms.map((room) => 
                    <RoomTile
                        room={room}
                        key={room.id}
                        onRoomSelect={(roomId) => this.props.onRoomSelect(roomId)}
                        onGuestSelect={(guest) => this.props.onGuestSelect(guest)} 
                        onTileOptionSelect={(option) => this.props.onTileOptionSelect(option)}
                    />
                )} 
            </div> 
        )
    }
}