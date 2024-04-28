import React from "react";
import IconLogo from "../UIComponents/Icons/IconLogo";
import IconApps from "../UIComponents/Icons/IconApps";
import IconSettings from "../UIComponents/Icons/IconSettings";
import IconTicket from "../UIComponents/Icons/IconTicket";
import IconPerson from "../UIComponents/Icons/IconPerson";
import IconBookings from "../UIComponents/Icons/IconBooking";
import './Header.scss';

export class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showDropdown:false,
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
                <div className="header-right" ref={this.dropdownRef}>
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