import React from "react";
import IconLogo from "../Icons/IconLogo";
import IconApps from "../Icons/IconApps";
import IconSettings from "../Icons/IconSettings";
import IconTicket from "../Icons/IconTicket";
import IconPerson from "../Icons/IconPerson";
import IconBookings from "../Icons/IconBooking";
import './Header.scss';

export class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showDropdown:false,
        }
    }
    handleProfileClick()
    {
        this.state.showDropdown ?
            this.setState({ showDropdown: false }):
            this.setState({ showDropdown: true });
    }
    handleItemSelect(selectedItem)
    {
        console.log(selectedItem);
    }
    render() {
        return (
            <div className="header">
                <IconLogo color="white" size="26"/>
                <h1>PG Management</h1>
                <div className="header-left">
                    <IconApps color="white" size="32" onClick={() => this.handleProfileClick()} />
                    <div className={`header-dropdown-list ${this.state.showDropdown?'show':''}`}>
                        <div className="list-item" onClick={()=>this.handleItemSelect('Profile')}>
                            <IconPerson size={20} />
                            Profile
                        </div>
                        <div className="list-item">
                            <IconSettings size={20} onClick={()=>this.handleItemSelect('Settings')}/>
                            Settings
                        </div>
                        <div className="list-item">
                            <IconBookings size={20} onClick={()=>this.handleItemSelect('Bookings')}/>
                            Bookings
                        </div>
                        <div className="list-item">
                            <IconTicket size={20} onClick={()=>this.handleItemSelect('Tickets')}/>
                            Tickets
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}