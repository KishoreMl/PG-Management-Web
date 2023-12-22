import React from "react";
import { RightPanel } from "../RightPanel/RightPanel";
import { ToolBar } from "../ToolBar/ToolBar";
import { RoomsTable } from "../RoomsTable/RoomsTable";
import { GridView } from "../GridView/GridView";
import { getRooms } from "../../sdk/pgmanagement";
import './RoomsPage.scss';

export class RoomsPage extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            rooms: [
                    {
                        branchId:"branchId1",
                        roomId:"roomId1",
                        number:"101",
                        type:"AC",
                        capacity:3,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:true,ebPaid:false},
                            {guestId:"guestId3",name:"Siva",rentPaid:false,ebPaid:false}
                        ]
                    },
                    {
                        branchId:"branchId1",
                        roomId:"roomId2",
                        number:"102",
                        type:"AC",
                        capacity:4,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:true,ebPaid:false},
                            {guestId:"guestId3",name:"Siva",rentPaid:false,ebPaid:false}
                        ]
                    },
                    {
                        branchId:"branchId1",
                        roomId:"roomId3",
                        number:"103",
                        type:"AC",
                        capacity:2,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ]
                    }
                ],
            currentView:'grid',
            panelDisplay:true,
        }
    }
    
//    async componentDidMount() {
//         const response = await getRooms('branchId1');   
//         this.setState({ rooms: [response] }); 
//         console.log(this.state.rooms);
//     }

    setPanelDisplay = (display) => {
        this.setState({panelDisplay:display})
    }
    onRoomSelect(roomId)
    {
        console.log(roomId);
        this.setState({ panelDisplay: true })
    }
    onGuestSelect(guestId)
    {
        console.log(guestId);
        this.setState({ panelDisplay: true })
    }
    render()
    {
        return (
            <div>
                <ToolBar
                    currentView={this.state.currentView}
                    onViewChange={(view) => this.setState({ currentView: view })}
                />
                <div className="container">
                    {this.state.currentView === 'list' ?
                        <RoomsTable
                            rooms={this.state.rooms}
                            onGuestSelect={(guestId) => this.onGuestSelect(guestId)}
                        /> :
                        <GridView
                            rooms={this.state.rooms}
                            onRoomSelect={(roomId) => this.onRoomSelect(roomId)}
                            onGuestSelect={(guestId) => this.onGuestSelect(guestId)} 
                        />
                    } 
                    <RightPanel
                        panelDisplay={this.state.panelDisplay}
                        setPanelDisplay={(display) => this.setPanelDisplay(display)}
                    />
                </div>
            </div>    
        )
    }
}