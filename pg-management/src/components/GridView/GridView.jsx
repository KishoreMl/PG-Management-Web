import React from "react";
import { RoomTile } from "../RoomTile/RoomTile";
import './GridView.scss';

export class GridView extends React.Component{
    constructor(props){
        super(props);
    }
    render()
    {
        return (
            <div className="grid-container">
                {this.props.rooms.map((room) => 
                    <RoomTile
                        room={room}
                        key={room.roomId}
                        onRoomSelect={(roomId) => this.props.onRoomSelect(roomId)}
                        onGuestSelect={(guest,e) => this.props.onGuestSelect(guest,e)} 
                        onTileOptionSelect={(option) => this.props.onTileOptionSelect(option)}
                    />
                )}
            </div> 
        )
    }
}