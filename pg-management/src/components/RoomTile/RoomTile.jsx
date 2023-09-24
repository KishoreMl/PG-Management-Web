import React, { Component } from "react";
import './RoomTile.scss';

export class RoomTile extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="room-tile">
                <div className="tile-header">
                    <h4 className="room-name">{this.props.room.name}</h4>
                    <h4>{this.props.room.capacity} sharing</h4>
                    <p>{this.props.room.type}</p>
                </div>
                <div>
                    {this.props.room.guests.map((guest) => {
                        <div className="guest">
                            <div className="avatar"></div>
                            <div><p>{guest.name}</p> </div>
                        </div>
                    })} 
                </div>
            </div>  
        );
    }
}