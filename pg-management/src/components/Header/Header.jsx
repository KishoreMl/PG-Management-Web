import React from "react";
import IconLogo from "../Icons/IconLogo";
import IconPerson from "../Icons/IconPerson";
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
        this.state.showDropdown?this.setState({ showDropdown:false }) :this.setState({ showDropdown: true })
    }
    render() {
        return (
            <div className="header">
                <IconLogo color="white" size="26"/>
                <h1>PG Management</h1>
                <div className="header-left">
                    <IconPerson color="white" size="32" onClick={() => this.handleProfileClick()} />
                    {/* <div className={`dropdown-list ${this.state.showDropdown?'show':''}`}>
                        <div className="list-item">
                            <IconPerson size='19' />
                            Profile
                        </div>
                        <div className="list-item">Settings</div>
                        <div className="list-item">Bookings</div>
                        <div className="list-item">Tickets</div>
                    </div> */}
                </div>
            </div>
        )
    }
}