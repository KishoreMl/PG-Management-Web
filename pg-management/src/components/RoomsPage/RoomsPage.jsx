import React from "react";
import { RightPanel } from "../RightPanel/RightPanel";
import { ToolBar } from "../ToolBar/ToolBar";
import { RoomsListView } from "../RoomsListView/RoomsListView";
import { RoomsGridView } from "../RoomsGridView/RoomsGridView";
import RadioButtons from "../UIComponents/FormInputs/RadioButton";
import TextInput from "../UIComponents/FormInputs/TextInput";
import Dropdown from "../UIComponents/FormInputs/Dropdown";
import CustomDropdown from "../UIComponents/FormInputs/CustomDropdown/CustomDropdown";
import CheckBox from "../UIComponents/FormInputs/CheckBox";
import NumberInput from "../UIComponents/FormInputs/NumberInput";
import Modal from "../UIComponents/Modal/Modal";
import IconPlusCircle from "../UIComponents/Icons/IconPlusCircle";
import IconCaretDown from "../UIComponents/Icons/IconCaretDown";
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
            fields:[
                { name: 'address',type: 'text',},
                { name: 'Food Type', type: 'radio', options: ['Veg', 'Non-Veg'] },
                { name: 'Amenities', type: 'checkbox', options: ['AC', 'Heater', 'washing Machine'] },
                { name: 'Dropdown', type: 'dropdown', options: ['option1', 'option2', 'option3', 'option4'] },
                { name: 'Sharing', type:'number'},
            ],
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

    onModalClose(display){
        this.setState({showConsentModal:display})
    }

    onViewChange(view) {
        this.setState({ currentView: view })
    }
    
    onTileOptionSelect(option) {
        switch (option) {
            case 'Add Guest':
                this.setState({ showNewGuestModal: true });
                break;
            case 'Remove Guest':
                this.setState({showConsentModal:true})
                break;
            case 'Edit Room':
                console.log('Edit Room');
                break;
            case 'Delete Room':
                this.setState({showConsentModal:true})
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

    getInputType(field) {
        switch (field.type) {
            case 'text':
                return <TextInput field={field} />;
            case 'radio':
                return <RadioButtons field={field} />;
            case 'checkbox':
                return <CheckBox field={field} />;
            case 'dropdown':
                return <Dropdown field={field} />;
            case 'number':
                return <NumberInput field={field} />;
            default:
                return <div></div>
        }
    }

    render()
    {
        return (
            <div>
                <Toast message="Room Created Successfully" type='warning' />
                {this.state.showCreateRoomModal ? 
                    <Modal 
                        title="Create Room"  
                        onCloseModal={() => this.onCreateRoom(false)} 
                    >
                        <form id='create-room' onSubmit={(e) => this.handleFormSubmit(e)}>
                                <label htmlFor="room-no">Room no</label><br />
                                <input
                                    className="textbox"
                                    type="text"
                                    id="room-no"
                                    value={this.state.roomNo}
                                >
                                </input> <br />    
                            <CustomDropdown
                                listitems={['Non-AC', 'AC']}
                                label='Type'
                                onOptionChange={(option) => console.log(option)}
                            />
                                {this.state.fields.map((field) =>
                                    this.getInputType(field)
                                )}
                            </form>
                    </Modal>
                : null}
                {this.state.showConsentModal ?
                    <Modal
                        title="Delete Room"
                        modalMessage="Are you sure you want to Delete this Room?"
                        onCloseModal={() => this.onModalClose(false)}
                    >
                        <p>Are you sure want to delete this</p>
                    </Modal>
                :null}
                {this.state.showNewGuestModal ? 
                    <Modal onCloseModal={() => this.onCreateRoom(false)} /> 
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
                
                {this.state.isLoading ? 
                    <div className="spinner">
                        <span class="loader"></span>
                    </div> :
                    <div className="main-container">
                        <div className="middle-panel">
                            <div className="filter-bar">
                                <div className="filters-container">
                                    <div className="filter-dropdown">
                                        <div className="filter-dot"> </div>
                                        <div className="filter-button">Sharing <IconCaretDown size='19' /></div>
                                        <div className="filter-dropdown-list">
                                            <div className="filter-listitem"> 1 Sharing </div>
                                            <div className="filter-listitem"> 2 Sharing </div>
                                            <div className="filter-listitem"> 3 Sharing </div>
                                            <div className="filter-listitem"> 4 Sharing </div>
                                        </div>
                                    </div>

                                    <div className="filter-dropdown">
                                        <div className="filter-button">Rent <IconCaretDown size='19' /></div>
                                        <div className="filter-dropdown-list">
                                            
                                        </div>
                                    </div>

                                    <div className="filter-dropdown">
                                        <div className="filter-button">Types<IconCaretDown size='19' /></div>
                                        <div className="filter-dropdown-list">
                                            
                                        </div>
                                    </div>
                                    
                                </div>    
                            </div>
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
                                        onTileOptionSelect={(option) => this.onTileOptionSelect(option)}
                                    />
                                }   
                                <button className="add-button" onClick={()=> this.onCreateRoom(true)}>
                                    <IconPlusCircle color="white"/>
                                </button>
                            </div>
                        </div>  
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
                    </div>    
                }       
            </div>    
        )
    }
}

export default RoomsPage;