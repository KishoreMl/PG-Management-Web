import React, { Component } from "react";
import './RoomTile.scss';
import { GuestCard } from "../GuestCard/GuestCard";
import IconMap from "../Icons/IconMap";

export class RoomTile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dropdown: "",
            selected:false,
        }
    }
    render() {
        return (
            <div
                className={`room-tile ${this.state.selected ? 'selected' : ''}`}
                onClick={() => {
                    this.setState({ selected: this.state.selected ? false : true });
                    this.props.onRoomSelect(this.props.room.roomId)
                }}>
                <div className="tile-header">
                    <p>{this.props.room.number}</p>
                    {this.props.room.type === 'AC' && <p className="badge">{this.props.room.type}</p>}
                    <div className="tile-header-left">
                        <IconMap
                            icon="more"
                            onClick={() => {
                                this.state.dropdown === "" ?
                                this.setState({ dropdown: "show" }) :
                                this.setState({ dropdown: "" })
                            }}
                        /> 
                        <div className={`dropdown-list ${this.state.dropdown}`}>
                            <div className="list-option" onClick={() => this.props.onTileOptionSelect('Add Guest')}>Add Guest</div>
                            <div className="list-option" onClick={() => this.props.onTileOptionSelect('Remove Guest')}>Remove Guest</div>
                            <div className="list-option" onClick={() => this.props.onTileOptionSelect('Edit Room')}>Edit Room</div>
                        </div>
                    </div>
                </div>
                <div className="tile-container">   
                    {this.props.room.guests.map((guest) => 
                        <GuestCard
                            guest={guest}
                            onClick={(e) => this.props.onGuestSelect(guest,e)} 
                        />
                    )} 
                    {(this.props.room.capacity-this.props.room.guests.length>0)?
                        <GuestCard guest={null} />
                        :null
                    }
                </div>
            </div>  
        );
    }
}