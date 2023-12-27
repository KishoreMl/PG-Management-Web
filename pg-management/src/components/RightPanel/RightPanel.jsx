import React from "react";
import './RightPanel.scss';
import guest from '../../static/guest.png';
import IconMap from "../Icons/IconMap";

export class RightPanel extends React.Component{

    render() { 
        return (
            <div className="right-panel">
                {this.props.guest === '' ?
                    <>
                        <IconMap icon="close" size={20} onClick={() => this.props.setPanelDisplay(false)} />
                        <div className="panel-img">
                            <img src={guest}></img>
                        </div>
                        <div className="rightpanel-toolbar">
                            <IconMap icon="edit" size={20} onClick={() => console.log('edit')} />
                            <button>Mark as Paid</button>
                        </div>
                        <div className="panel-text">
                            <div className="panel-sub-text"><b>Name</b></div>
                            <div className="panel-sub-text">Sample name</div>
                        </div>
                        <div className="panel-text">
                            <div className="panel-sub-text"><b>Room No</b></div>
                            <div className="panel-sub-text">106</div>
                        </div>
                        <div className="panel-text">
                            <div className="panel-sub-text"><b>Rent</b></div>
                            <div className="panel-sub-text">
                                6500
                                {this.props.guest.rentPaid ?
                                <div className="badge">Paid</div> :
                                <div className="badge success">Paid</div>}
                            </div>
                        </div>
                        <div className="panel-text">
                            <div className="panel-sub-text"><b>EB bill</b></div>
                            <div className="panel-sub-text">
                                400
                                {this.props.guest.rentPaid ?
                                <div className="badge">Paid</div> :
                                <div className="badge">Not Paid</div>}
                            </div>
                        </div>
                        <div className="panel-text">
                            <div className="panel-sub-text"><b>Contact</b></div>
                            <div className="panel-sub-text">1234567890</div>
                        </div>
                        <div className="panel-text">
                            <div className="panel-sub-text"><b>Work/College</b></div>
                            <div className="panel-sub-text">Company name</div>
                        </div>
                        <div className="panel-text">
                            <div className="panel-sub-text"><b>Address</b></div>
                            <div className="panel-sub-text">sample address</div>  
                        </div>
                    </> :
                    <div>
                        <h1>Room details</h1>
                    </div>    
                }
                </div>
        )
    }
}