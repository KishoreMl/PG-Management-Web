import React from "react";
import IconClose from "../Icons/IconClose";
import IconEdit from "../Icons/IconEdit";
import IconDelete from "../Icons/IconDelete";
import IconPersonAdd from "../Icons/IconPersonAdd";
import './RightPanel.scss';

export class RoomRightPanel extends React.Component{

    constructor(props) {
        super(props);
            this.state = {  
                guestfields: [],
            }
        }
    render() { 
        return (
            <div className="right-panel">
                <div className="panel-header">
                    <h3>Room Details</h3>
                    <div className="header-left">
                        <IconClose size='20' onClick={() => this.props.setPanelDisplay(false)} />
                    </div>    
                </div>
                <div className="panel-content"> 
                    <div className="panel-toolbar">
                        <div className="icon-container">
                            <div className="icon"><IconEdit size={20} /></div>
                            <div className="tooltip">Edit</div>
                        </div>
                        <div className="icon-container">
                            <div className="icon"><IconPersonAdd size={20} /></div>
                            <div className="tooltip">Add Guest</div>
                        </div>
                        <div className="icon-container">
                            <div className="icon"><IconDelete size={21} /></div>
                            <div className="tooltip">Delete Room</div>
                        </div>
                    </div>
                    <div className="panel-text" id="room-no">
                        <div className="panel-sub-text"><b>Room No</b></div>
                        <div className="panel-sub-text">106</div>  
                    </div>
                    <div className="panel-guestcard-container">
                        <div className="panel-guestcard">Guestname</div>
                        <div className="panel-guestcard">Guestname</div>
                        <div className="panel-guestcard">Guestname</div>
                        <div className="panel-guestcard">Guestname</div>
                    </div>
                    <div className="panel-text">
                        <div className="panel-sub-text"><b>Rent</b></div>
                        <div className="panel-sub-text">
                            6500
                        </div>
                    </div>
                    <div className="panel-text">
                        <div className="panel-sub-text"><b>EB bill</b></div>
                        <div className="panel-sub-text">
                            400
                        </div>
                    </div>
                    <div className="panel-text">
                        <div className="panel-sub-text"><b>Type</b></div>
                        <div className="panel-sub-text">AC</div>
                    </div>
                   
                </div>          
            </div>
        )
    }
}