import React from "react";
import { GuestRightPanel } from "./GuestRightPanel";
import { RoomRightPanel } from "./RoomRightPanel";

import './RightPanel.scss';

export class RightPanel extends React.Component{

    constructor(props) {
        super(props);
            this.state = {  
                guestfields: [],
            }
        }

    renderPanel(){
        switch(this.props.type){
            case 'guest':
                return <GuestRightPanel {...this.props}/>;
            case 'room':
                return <RoomRightPanel {...this.props}/>
            default:
                break;
        }
    }
    render() { 
        return(
            <div>
                {this.renderPanel()}
            </div>
        )
    }
}