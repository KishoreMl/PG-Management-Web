import React, { Component } from "react";
import { GuestCard } from "../GuestCard/GuestCard";
import IconPersonAdd from "../Icons/IconPersonAdd";
import IconPersonRemove from "../Icons/IconPersonRemove";
import IconDelete from "../Icons/IconDelete";
import IconEdit from "../Icons/IconEdit";
import IconMore from "../Icons/IconMore";

import './RoomTile.scss';

export class RoomTile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false,
            selected: false,
            dropdownList:['Add Guest','Remove Guest','Edit Room', 'Delete Room'],
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

    getAvailableBeds(difference) {
        let availableBeds = [];
        for (let i = 0; i < difference; i++)
        {
            availableBeds.push('Available');
        }
        return availableBeds;
    }
    render() {
        return (
            <div
                className={`room-tile ${this.state.selected ? 'tile-selected' : ''}`}
                onClick={() => this.handleRoomSelect()}>
                <div className="tile-header">
                    <p>{this.props.room.number}</p>
                    {this.props.room.type === 'AC' && <p className="badge">{this.props.room.type}</p>}
                    <div className="tile-header-left" ref={this.dropdownRef}>
                        <IconMore  onClick={() => this.handleShowDropdown()}  />
                        <div className={`dropdown-list ${this.state.showDropdown ? 'show' : ''}`}>
                            {this.state.dropdownList.map((listitem) => 
                                <div className="list-item" onClick={(e) => this.props.onTileOptionSelect(e, 'Add Guest')}>
                                    <IconPersonAdd size='19' />
                                    {listitem}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="tile-container">   
                    {this.props.room.guests.map((guest) =>   
                        <GuestCard
                            guest={guest}
                            key={guest.guestId}
                            onClick={(e) => this.props.onGuestSelect(guest,e)} 
                        />
                    )} 
                    {this.getAvailableBeds(this.props.room.capacity - this.props.room.guests.length).map((bed) =>
                         <GuestCard guest={null} />
                    )}
                    
                </div>
            </div>  
        );
    }
}