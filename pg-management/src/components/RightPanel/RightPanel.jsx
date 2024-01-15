import React from "react";
import guest from '../../static/guest.png';
import IconMap from "../Icons/IconMap";
import './RightPanel.scss';

export class RightPanel extends React.Component{

    render() { 
        return (
            <div className="right-panel">
                {!this.props.guest ?
                    <div>
                        <div className="panel-header">
                            <div className="header-left">
                                <IconMap icon="close" size={20} onClick={() => this.props.setPanelDisplay(false)} />
                            </div>    
                        </div>
                        <div className="panel-img">
                            <img src={guest}></img>
                        </div>
                        <div className="rightpanel-toolbar">
                            <IconMap icon="edit" size={20}  />
                            <IconMap icon="delete" size={21} />
                        </div>
                        <div className="panel-text">
                            <div className="panel-sub-text"><b>Name</b></div>
                            <div className="panel-sub-text">{this.props.guest.name}</div>
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
                                    <div className="chip success">
                                        Paid
                                    </div> :
                                    <div className="chip success">
                                        <IconMap icon='check-circle'  size="20" /> Paid
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="panel-text">
                            <div className="panel-sub-text"><b>EB bill</b></div>
                            <div className="panel-sub-text">
                                400
                                {this.props.guest.rentPaid ?
                                <div className="chip success">
                                    <IconMap icon='check-circle' size="20" color='rgb(21, 121, 21)'/> Paid
                                </div> :
                                <div className="chip danger">
                                    <IconMap icon='cross-circle' size="20" color='red'/> Not Paid
                                </div>}
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
                    </div> :
                    <div>
                        <IconMap icon="close" size={20} onClick={() => this.props.setPanelDisplay(false)} />
                        <div>Room no: {this.props.room.number}</div>
                        <div className="rightpanel-toolbar">
                            <IconMap icon="edit" size={20} onClick={() => console.log('edit')} />
                            <IconMap icon="delete" />
                        </div>
                        <div> Guests </div>
                        
                    </div>    
                }
                </div>
        )
    }
}