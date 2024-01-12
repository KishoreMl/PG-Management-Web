import React, { Component } from "react";
import { GuestCard } from "../GuestCard/GuestCard";
import IconMap from "../Icons/IconMap";
import './RoomTile.scss';

export class RoomTile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: "",
            selected:false,
        }
         this.dropdownRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({ showDropdown: false });
        }
    }

    handleShowDropdown() {
        this.state.showDropdown?this.setState({ showDropdown:false }) :this.setState({ showDropdown: true })
    }

    handleRoomSelect() {
        this.setState({ selected: this.state.selected ? false : true });
        this.props.onRoomSelect(this.props.room.roomId)
    }
    render() {
        return (
            <div
                className={`room-tile ${this.state.selected ? 'selected' : ''}`}
                onClick={() => this.handleRoomSelect()}>
                <div className="tile-header">
                    <p>{this.props.room.number}</p>
                    {this.props.room.type === 'AC' && <p className="badge">{this.props.room.type}</p>}
                    <div className="tile-header-left" ref={this.dropdownRef}>
                        <IconMap
                            icon="more"
                            onClick={() => this.handleShowDropdown()}     
                        /> 
                        <div className={`dropdown-list ${this.state.showDropdown?'show':''}`}>
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