import React from 'react';
import './GuestCard.scss';
import user from '../../static/guest.png';

export class GuestCard extends React.Component{
    constructor(props) {
        super(props);    
    }
    render(){
        return (
            <div className={`guest-card ${this.props.guest.rentPaid?'paid':'not-paid'}`}>
                <div className='guest-img'>
                    <img src={user}></img>
                </div>
                <div className='guest-details'>
                    <p>{this.props.guest.name}</p>
                </div>   
            </div>
        )
    }
}