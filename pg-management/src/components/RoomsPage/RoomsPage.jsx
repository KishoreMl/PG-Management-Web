import React from "react";
import { RightPanel } from "../RightPanel/RightPanel";
import { ToolBar } from "../ToolBar/ToolBar";
import { RoomsTable } from "../RoomsTable/RoomsTable";
import { GridView } from "../GridView/GridView";
import { getRooms } from "../../sdk/pgmanagement";
import CreateRoom from "../CreateRoomModal/CreateRoomModal";
import NewGuest from "../NewGuestModal/NewGuestModal";
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
                        capacity:5,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:true,ebPaid:false},
                            {guestId:"guestId3",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId4",name:"Akhilesh",rentPaid:true,ebPaid:false},
                            {guestId:"guestId5",name:"Siva",rentPaid:false,ebPaid:false}
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
                        capacity:4,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ]
                },
                    {
                        branchId:"branchId1",
                        roomId:"roomId11",
                        number:"104",
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
                        roomId:"roomId5",
                        number:"104",
                        type:"AC",
                        capacity:4,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ]
                },
                    {
                        branchId:"branchId1",
                        roomId:"roomId6",
                        number:"104",
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
                        roomId:"roomId7",
                        number:"104",
                        type:"AC",
                        capacity:4,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                        ]
                },
                    {
                        branchId:"branchId1",
                        roomId:"roomId8",
                        number:"104",
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
                        roomId:"roomId9",
                        number:"104",
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
                        roomId:"roomId10",
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
            branches: [{ name: 'Branch 1', id: 'branchId1' },
                       { name: 'Branch 2', id: 'branchId2' },
                       { name: 'Branch 3', id: 'branchId3' },
                       { name: 'Branch 4', id: 'branchId4' },
                    ],
            currentBranchId:'',
            currentView:'grid',
            showRightPanel: false,
            showCreateRoomModal: false,
            showNewGuestModal: false,
            selectedGuest: '',
            selectedRoom: '',
            isLoading: false
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

    onRoomSelect(roomId) {
        console.log("on room select: "+roomId);
        let room = this.state.rooms.filter((room) => room.roomId === roomId);
        this.setState({ showRightPanel: true, selectedRoom: room }) 
    }

    onGuestSelect(guest, e) {
        e.stopPropgation();
        console.log(guest);
        this.setState({selectedGuest:guest,showRightPanel: true})
    }
    
    onBranchSelect(branchId){
        this.setState({currentBranchId:branchId})
    }

    onCreateRoom(display) {    
        this.setState({showCreateRoomModal:display})
    }

    onViewChange(view) {
        this.setState({ currentView: view })
    }
    
    onTileOptionSelect(event, option) {
        event.stopPropgation();
        switch (option) {
            case 'Add Guest':
                this.setState({ showNewGuestModal: true });
                break;
            case 'Remove Guest':
                console.log('Remove Guest');
                break;
            case 'Edit Room':
                console.log('Edit Room');
                break;
            default:
                break;
        }
    }

    render()
    {
        return (
            <div>
                {this.state.showCreateRoomModal ? <CreateRoom onCloseModal={() => this.onCreateRoom(false)} /> : null}
                {this.state.showNewGuestModal ? <NewGuest onCloseModal={() => this.onCreateRoom(false)} /> : null}
                    <ToolBar
                        branches={this.state.branches}
                        currentView={this.state.currentView}
                        onViewChange={(view) => this.onViewChange(view)}
                        onCreateRoom={() => this.onCreateRoom(true)}
                    />
                    {this.state.isLoading ? 
                        <div className="spinner">
                            <span class="loader"></span>
                        </div> :
                        <div className="container">
                            {this.state.currentView === 'list' ?
                                <RoomsTable
                                    rooms={this.state.rooms}
                                    onGuestSelect={(guestId) => this.onGuestSelect(guestId)}
                                /> :
                                <GridView
                                    rooms={this.state.rooms}
                                    onRoomSelect={(roomId) => this.onRoomSelect(roomId)}
                                    onGuestSelect={(guest,e) => this.onGuestSelect(guest,e)} 
                                    onTileOptionSelect={(e,option) => this.onTileOptionSelect(e,option)}
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
                    }
                </div>    
        )
    }
}