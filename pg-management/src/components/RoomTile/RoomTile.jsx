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

    getAvailableBeds(difference) {
        let availableBeds = [];
        for (let i = 0; i < difference; i++)
        {
            availableBeds.push('Available');
        }
        return availableBeds;
    }

    getDropdownIcons(option){
        switch(option){
            case 'Add Guest':
                return <IconPersonAdd size='19' />;
            case 'Remove Guest':
                return <IconPersonRemove size='19' />;
            case 'Edit Room':
                return <IconEdit size='19' />;
            case 'Delete Room':
                return <IconDelete size='19' />;
            default:                
                break;    
        }
    }
    render() {
        return (
            <div
                className={`room-tile ${this.props.room.selected ? 'tile-selected' : ''}`}
                onClick={() => this.props.onRoomSelect(this.props.room.id)}
            >
                <div className="tile-header">
                    <p>{this.props.room.number}</p>
                    {this.props.room.type === 'AC' && <p className="badge">{this.props.room.type}</p>}
                    <div className="tile-header-right" ref={this.dropdownRef}>
                        <IconMore  onClick={(e) => {
                                e.stopPropagation(); 
                                this.handleShowDropdown();
                            }}  
                        />
                        <div className={`dropdown-list ${this.state.showDropdown ? 'show' : ''}`}>
                            {this.state.dropdownList.map((listitem) => 
                                <div className="list-item" onClick={(e) => {
                                    e.stopPropagation(); 
                                    this.props.onTileOptionSelect(listitem)}}
                                >
                                    {this.getDropdownIcons(listitem)}
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
                            onClick={(e) => { 
                                e.stopPropagation();
                                this.props.onGuestSelect(guest)
                            }} 
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