import React from "react";
import './RightPanel.scss';
import guest from '../../static/guest.png';

export class RightPanel extends React.Component{
    render() {
        const guestPanel = (<div className="right-panel">
                                <div className="panel-img">
                                    <img src={guest}></img>
                                </div>
                                <p>Guest Name</p>
                                <p>Room No: 106</p>
                                <div className="">
                                    <p>Rent: 6500</p>
                                    <p className={`paid`}>Paid</p>
                                    <button>Mark as Paid</button>
                                </div>
                                <div className=""><p>Contact: 1234567890</p></div>
                                <div className=""><p>Email: abc@gmail.com</p></div>
                            </div>);
        return (
            <div className="">

            </div>
        )
    }
}