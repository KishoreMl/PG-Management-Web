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
            <div>
                <div className="room-container">
                    {this.props.rooms.map((room) => {
                        <RoomTile room={room} />
                    })}
                </div>
            </div>
        )
    }
}