import React from "react";
import './RightPanel.scss';
import guest from '../../static/guest.png';
import IconMap from "../Icons/IconMap";

export class RightPanel extends React.Component{

       guestPanel = (<div className="right-panel">
        <IconMap icon="close" size={20} onClick={() => this.props.setPanelDisplay()} />
                        <div className="panel-img">
                            <img src={guest}></img>
                        </div>
                        <div className="rightpanel-toolbar">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#252A2E"
                                class="bi bi-pencil-square"
                                viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            <button>Mark as Paid</button>
                        </div>
                        <p>Guest Name</p>
                        <p>Room No: 106</p>
                        <div className="">
                            <p>Rent: 6500</p>
                        </div>
                        <div className=""><p>Contact: 1234567890</p></div>
                        <div className=""><p>Email: abc@gmail.com</p></div>
                    </div>);
    render() { 
        return (
            <div className={`panel-container ${this.props.panelDisplay}`}>
               {this.guestPanel}
            </div>
        )
    }
}