import React from 'react';
import './GuestCard.scss';
import user from '../../static/guest.png';

export class GuestCard extends React.Component{
    
    render(){
        return (
            <div
                className={`guest-card ${this.props.guest ? this.props.guest.rentPaid ? 'paid' : 'not-paid' : ''}`}
                draggable={true}
                onClick={this.props.onClick}>
                <div className='guest-img'>
                    <img src={user} alt=''></img>
                </div>
                <div className='guest-details'>
                    {this.props.guest?this.props.guest.name:'Available'}
                </div>   
            </div>
        )
    }
}