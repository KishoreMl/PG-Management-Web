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
                        capacity:3,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ]
                    },
                    {
                        branchId:"branchId1",
                        roomId:"roomId4",
                        number:"104",
                        type:"AC",
                        capacity:3,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ]
                    }
                ],
            currentView:'grid',
            showRightPanel: true,
            selectedGuest: '',
            selectedRoom:'',
        }
    }
    
//    async componentDidMount() {
//         const response = await getRooms('branchId1');   
//         this.setState({ rooms: [response] }); 
//         console.log(this.state.rooms);
//     }

    setPanelDisplay = (display) => {
        this.setState({showRightPanel:display})
    }
    onRoomSelect(roomId)
    {
        this.setState({ showRightPanel: true })
    }
    onGuestSelect(guestId)
    {
        this.setState({ showRightPanel: true })
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
                    <div className={`rightpanel-container ${this.state.showRightPanel? 'open':''}`}>
                        {this.state.showRightPanel && (
                            <RightPanel
                                guest={this.state.selectedGuest}
                                room={this.state.selectedRoom}
                                setPanelDisplay={(display) => this.setPanelDisplay(display)}
                            />
                        )}
                    </div>    
                </div>
            </div>    
        )
    }
}