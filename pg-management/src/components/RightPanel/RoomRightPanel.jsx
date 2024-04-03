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
                        <div className="panel-sub-text">{this.props.room.number}</div>  
                    </div>
                    <div className="panel-text">
                        <div className="panel-sub-text"><b>Sharing</b></div>
                        <div className="panel-sub-text">{this.props.room.capacity}</div>
                    </div>
                    <div className="panel-text">
                        <div className="panel-sub-text"><b>Available</b></div>
                        <div className="panel-sub-text">{this.props.room.capacity - this.props.room.guests.length}</div>
                    </div>
                    <div className="panel-text">
                        <div className="panel-sub-text"><b>Guests</b></div>
                    </div>
                    <div className="panel-guestcard-container">
                        {this.props.room.guests.map((guest) =>
                            <div className="panel-guestcard" key={guest.id}>
                                <div className="guestcard-text">
                                    {guest.name}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="panel-text">
                        <div className="panel-sub-text"><b>Rent</b></div>
                        <div className="panel-sub-text">
                            {this.props.room.rent}
                        </div>
                    </div>
                    <div className="panel-text">
                        <div className="panel-sub-text"><b>EB bill</b></div>
                        <div className="panel-sub-text">
                            {this.props.room.ebBill}
                        </div>
                    </div>
                    <div className="panel-text">
                        <div className="panel-sub-text"><b>Type</b></div>
                        <div className="panel-sub-text">{this.props.room.type}</div>
                    </div>
                    {this.props.room.fields && this.props.room.fields.map((field) =>    
                        <div className="panel-text" key={field.id}>
                            <div className="panel-sub-text"><b>{field.name}</b></div>
                            <div className="panel-sub-text">{field.value}</div>
                        </div>
                    )}
                   
                </div>          
            </div>
        )
    }
}