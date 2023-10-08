import React from 'react';
import './GuestCard.scss';
import user from '../../static/guest.png';

export class GuestCard extends React.Component{
    constructor(props) {
        super(props);
        
    }
    render(){
        return (
            <div className={`guest-card ${this.props.type}`}>
                <div className='guest-img'>
                    <img src={user}></img>
                </div>
                <div className='guest-details'>
                    <p>{this.props.type === 'available' ? "Available":"Guest Name"}</p>
                </div>   
            </div>
        )
    }
}