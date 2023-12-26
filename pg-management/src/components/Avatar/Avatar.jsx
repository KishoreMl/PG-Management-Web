import React from "react";
import './Avatar.scss';
    
export class Avatar extends React.Component{
    
    convertToInitials(name) {   
        var names = name.split(" ");
        if (names.length === 1) {
            var initials = names[0].split("")
            return initials[0].toUpperCase() + initials[1].toUpperCase();
        }
        else {
            var firstInitial = names[0].split("");
            var secondInitial = names[1].split("");
            return firstInitial[0].toUpperCase() + secondInitial[0].toUpperCase();   
        }
    }
    render()
    {
        return (
            <div
                className={`avatar ${this.props.guest?this.props.guest.rentPaid?'green':'red':''}`}
                onClick={this.props.guest?() => this.props.onGuestSelect(this.props.guest.guestId):null}
            >
                <p>{this.convertToInitials(this.props.guest?this.props.guest.name:'Available')}</p> 
                <span className="tooltip">{this.props.guest?this.props.guest.name:'Available'}</span>
            </div>
        )
    }
}