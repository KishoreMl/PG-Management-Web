import React, { Component } from "react";
import './RoomTile.scss';
import { GuestCard } from "../GuestCard/GuestCard";

export class RoomTile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dropdown: "",
        }
    }
    render() {
        return (
            <div className="room-tile">
                <div className="tile-header">
                    <p>{this.props.room.name}</p>
                    {this.props.room.type === 'AC' && <p className="badge">{this.props.room.type}</p>}
                    <div className="tile-header-left">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {this.state.dropdown===""?this.setState({dropdown:"show"}):this.setState({dropdown:""})}}
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-three-dots-vertical"
                            viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>
                        <div className={`dropdown-list ${this.state.dropdown}`}>
                            <div className="list-option">Add Guest</div>
                            <div className="list-option">Remove Guest</div>
                            <div className="list-option">Edit Room</div>
                        </div>
                    </div>
                </div>
                <div className="tile-container">      
                    <GuestCard type="paid" />
                    <GuestCard type="not-paid" />
                    <GuestCard type="available" />
                </div>
            </div>  
        );
    }
}