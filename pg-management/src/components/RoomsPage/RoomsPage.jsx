import React from "react";
import { RightPanel } from "../RightPanel/RightPanel";
import { ToolBar } from "../ToolBar/ToolBar";
import { RoomsListView } from "../RoomsListView/RoomsListView";
import { RoomsGridView } from "../RoomsGridView/RoomsGridView";
import CreateModal from "../CreateModal/CreateModal";
import ConsentModal from "../ConsentModal/ConsentModal";
import NewGuest from "../NewGuestModal/NewGuestModal";
import IconPlusCircle from "../Icons/IconPlusCircle";
import IconCaretDown from "../Icons/IconCaretDown";
import { Toast } from "../Toast/Toast";
import './RoomsPage.scss';

class RoomsPage extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            rooms: [
                    {
                        branchId:"branchId1",
                        id:"roomId1",
                        number:"101",
                        type:"NON-AC",
                        capacity:5,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh Raghupathi ragav",rentPaid:true,ebPaid:false},
                            {guestId:"guestId3",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId4",name:"Akhilesh",rentPaid:true,ebPaid:false},
                            {guestId:"guestId5",name:"Siva",rentPaid:false,ebPaid:false}
                        ],
                        fields:[
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                        ]
                    },
                    {
                        branchId:"branchId1",
                        id:"roomId2",
                        number:"102",
                        type:"AC",
                        capacity:4,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:true,ebPaid:false},
                            {guestId:"guestId3",name:"Siva",rentPaid:false,ebPaid:false}
                        ],
                        fields:[
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                        ]
                    },
                    {
                        branchId:"branchId1",
                        id:"roomId3",
                        number:"103",
                        type:"AC",
                        capacity:2,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ],
                        fields:[
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                        ]
                    },
                    {
                        branchId:"branchId1",
                        id:"roomId4",
                        number:"104",
                        type:"AC",
                        capacity:1,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                           
                        ],
                        fields:[
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                        ]
                },
                    {
                        branchId:"branchId1",
                        id:"roomId5",
                        number:"104",
                        type:"AC",
                        capacity:3,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ],
                        fields:[
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                        ]
                },
                    {
                        branchId:"branchId1",
                        id:"roomId6",
                        number:"104",
                        type:"AC",
                        capacity:4,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ],
                        fields:[
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                        ]
                },
                    {
                        branchId:"branchId1",
                        id:"roomId7",
                        number:"104",
                        type:"AC",
                        capacity:3,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ],
                        fields:[
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                        ]
                },
                    {
                        branchId:"branchId1",
                        id:"roomId8",
                        number:"104",
                        type:"AC",
                        capacity:4,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                        ],
                        fields:[
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                        ]
                },
                    {
                        branchId:"branchId1",
                        id:"roomId9",
                        number:"104",
                        type:"AC",
                        capacity:3,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ],
                        fields:[
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                        ]
                },
                    {
                        branchId:"branchId1",
                        id:"roomId10",
                        number:"104",
                        type:"AC",
                        capacity:3,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ],
                        fields:[
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                        ]
                },
                    {
                        branchId:"branchId1",
                        id:"roomId11",
                        number:"104",
                        type:"AC",
                        capacity:3,
                        rent:6500,
                        guests:[
                            {guestId:"guestId1",name:"Ashwin",rentPaid:true,ebPaid:false},
                            {guestId:"guestId2",name:"Akhilesh",rentPaid:false,ebPaid:false}
                        ],
                        fields:[
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                            {name:"Fieldname",value:"Value"},
                        ]
                    }

            ],
            branches: [{ name: 'Branch 1', id: 'branchId1' },
                       { name: 'Branch 2', id: 'branchId2' },
                       { name: 'Branch 3', id: 'branchId3' },
                       { name: 'Branch 4', id: 'branchId4' },
            ],
            roomsToBeDisplayed: [],
            currentBranchId:'',
            currentView:'grid',
            showRightPanel: false,
            showCreateRoomModal: false,
            showConsentModal:false,
            showNewGuestModal: false,
            selectedGuest: '',
            selectedRoom: '',
            isLoading: false,
            rightPanelType: 'room',
        }
        
    }
    
   async componentDidMount() {
        const rooms  = this.state.rooms.map((room) => {
            return {...room, selected:false}
        });
        this.setState({roomsToBeDisplayed:rooms})
    }

    setPanelDisplay = (display) => {
        if(display === false){
            let rooms = this.state.roomsToBeDisplayed.map((room) => {
                if(room.selected){
                    return {...room,selected:false}
                }
                else{
                    return room;
                }
            })  
            this.setState({selectedRoom:'',selectedGuest:'',roomsToBeDisplayed:rooms})
        }
        this.setState({showRightPanel:display})
    }

    onRoomSelect(roomId) {  
        let selectedRoom = null;
        let rooms = this.state.rooms.map((room) => {
            if(room.id === roomId){
                selectedRoom = room;
                return {...room, selected:true}   
            }else{
                return room;
            }
        });
        this.setState({rightPanelType:'room', showRightPanel: true, selectedRoom: selectedRoom,roomsToBeDisplayed:rooms }) 
    }

    onGuestSelect(guest) {
        this.setState({selectedGuest:guest,rightPanelType:'guest',showRightPanel: true})
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

    handleFilters(filters) {

        if (filters.length>0) {
            console.log(filters);
            let filteredRooms = [];
            filters.map((filter) => {
                switch(filter.category)
                {
                    case 'Sharing':
                        let sharingFilteredRooms = this.state.rooms.filter((room) => room.capacity === filter.value)
                        filteredRooms = [...filteredRooms,...sharingFilteredRooms];
                        break;
                    case 'Type':
                        let typeFilteredRooms = this.state.rooms.filter((room) => room.type === filter.value)
                        filteredRooms = [...filteredRooms,...typeFilteredRooms];
                        break;
                    default:
                        filteredRooms = this.state.rooms;
                        break;    
                }
                
            })
            this.setState({ roomsToBeDisplayed: filteredRooms })
        }
        else {
            this.setState({roomsToBeDisplayed:this.state.rooms})
        }  
    }

    handleSearch(searchText){
        console.log(searchText);
    }

    handleBackButtonClick(){
        window.open('/','_self');
    }

    render()
    {
        return (
            <div>
                <Toast message="Room Created Successfully" type='warning' />
                {this.state.showCreateRoomModal ? 
                    <CreateModal 
                        title="Create Room"  
                        onCloseModal={() => this.onCreateRoom(false)} 
                    />
                : null}
                {this.state.showConsentModal ?
                    <ConsentModal
                        title="Delete Room"
                        modalMessage="Are you sure you want to Delete this Room?"
                    />
                :null}
                {this.state.showNewGuestModal ? 
                    <NewGuest onCloseModal={() => this.onCreateRoom(false)} /> 
                : null}
                <ToolBar
                    dropdownListItems={this.state.branches}
                    showDropdown={true}
                    showViewButton={true}
                    showBackButton={true}
                    enableSearch={true}
                    currentView={this.state.currentView}
                    createButtonText="Create Room"
                    onViewChange={(view) => this.onViewChange(view)}
                    onCreate={() => this.onCreateRoom(true)}
                    onFilterSelected={(filters) => this.handleFilters(filters)}
                    onSearch={(searchText)=>this.handleSearch(searchText)}
                    onBackButtonClick={() =>this.handleBackButtonClick()}
                />
                <div className="filter-bar">
                    <div className="filters-container">
                        <div className="filter-dropdown">Sharing <IconCaretDown  size='19'/></div>
                        <div className="filter-dropdown">Type <IconCaretDown  size='19'/></div>
                        <div className="filter-dropdown">Rent <IconCaretDown  size='19'/></div>
                    </div>    
                </div>
                {this.state.isLoading ? 
                    <div className="spinner">
                        <span class="loader"></span>
                    </div> :
                    <div className="container">
                        {this.state.currentView === 'list' ?
                            <RoomsListView
                                rooms={this.state.roomsToBeDisplayed}
                                onGuestSelect={(guestId) => this.onGuestSelect(guestId)}
                            /> :
                            <RoomsGridView
                                rooms={this.state.roomsToBeDisplayed}
                                onRoomSelect={(roomId) => this.onRoomSelect(roomId)}
                                onGuestSelect={(guest,e) => this.onGuestSelect(guest,e)} 
                                onTileOptionSelect={(e,option) => this.onTileOptionSelect(e,option)}
                            />
                        } 
                        <div className={`rightpanel-container ${this.state.showRightPanel?'open':''}`}>
                            {this.state.showRightPanel && (
                                <RightPanel  
                                    type={this.state.rightPanelType}
                                    guest={this.state.selectedGuest}
                                    room={this.state.selectedRoom}
                                    setPanelDisplay={(display) => this.setPanelDisplay(display)}
                                />
                            )}
                        </div>  
                    <button className="add-button" onClick={()=> this.onCreateRoom(true)}>
                        <IconPlusCircle color="white"/>
                    </button>
                </div>
                }       
            </div>    
        )
    }
}

export default RoomsPage;