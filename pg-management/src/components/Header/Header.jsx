import React from "react";
import IconLogo from "../Icons/IconLogo";
import IconPerson from "../Icons/IconPerson";
import './Header.scss';

export class Header extends React.Component{
    render() {
        return (
            <div className="header">
                <IconLogo color="white" size="26"/>
                <h1>PG Management</h1>
                <div className="header-left">
                    <IconPerson color="white" size="32"/>
                </div>
            </div>
        )
    }
}