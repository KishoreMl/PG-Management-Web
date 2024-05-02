import React from "react";
import { RightPanel } from "../RightPanel/RightPanel";
import { ToolBar } from "../ToolBar/ToolBar";
import { RoomsListView } from "../RoomsListView/RoomsListView";
import { RoomsGridView } from "../RoomsGridView/RoomsGridView";
import CustomDropdown from "../UIComponents/CustomDropdown/CustomDropdown";
import Modal from "../UIComponents/Modal/Modal";
import IconPlusCircle from "../UIComponents/Icons/IconPlusCircle";
import IconCaretDown from "../UIComponents/Icons/IconCaretDown";
import IconCheckBoxChecked from "../UIComponents/Icons/IconCheckBoxChecked";
import IconCheckBoxUnchecked from "../UIComponents/Icons/IconCheckBoxUnchecked";
import { getInputType } from "../UIComponents/FormInputs/form.helper";
import { Toast } from "../Toast/Toast";
import './RoomsPage.scss';
import IconCheck from "../UIComponents/Icons/IconCheck";

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
            filterDropdown:-1,
            filters: [
                {
                    name: "Sharing",
                    options: [
                        {option:"1 Sharing", value:1, selected:false},
                        {option:"2 Sharing", value:2, selected:false},
                        {option:"3 Sharing", value:3, selected:false},
                        {option:"4 Sharing", value:4, selected:false},
                        {option:"5 Sharing", value:5, selected:false},
                    ]
                },
                {
                    name: "Type",
                    options: [
                        {option:"AC", value:"AC",selected:false},
                        {option:"NON-AC", value:"NON-AC",selected:false}
                    ]
                },
                {
                    name: "Rent",
                    options: [
                        {option:"5000", value:5000,selected:false},
                        {option:"6000", value:6000,selected:false},
                        {option:"7000", value:7000,selected:false},
                        {option:"8000", value:8000,selected:false},
                    ]
                }
            ],
        }
        this.dropdownRef = React.createRef();
        
    }
    
   async componentDidMount() {
        const rooms  = this.state.rooms.map((room) => {
            return {...room, selected:false}
        });
       this.setState({ roomsToBeDisplayed: rooms })
       document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({ filterDropdown: -1});
        }
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
            this.setState({ roomsToBeDisplayed: this.state.rooms })
        }  
    }

    handleSearch(searchText){
        console.log(searchText);
    }

    handleBackButtonClick(){
        window.open('/','_self');
    }

    onFilerSelect(index) {
        this.setState(prevState => ({
            filterDropdown: prevState.filterDropdownn === index ? null : index
        }));
    }

    onFilterOptionSelect(filterIndex,optionIndex) {
        const updatedFilters = [...this.state.filters]; 
        updatedFilters[filterIndex].options.forEach((option, index) => {
            if (index === optionIndex){
                option.selected = option.selected? false: true; 
            }
        });
        this.setState({ filters: updatedFilters });
        this.handleFilters({category:updatedFilters[filterIndex].name,value:updatedFilters[filterIndex].options[optionIndex].value});

    }

    getCreateRoomModal() {
        return (
            <Modal title="Create Room"  onCloseModal={() => this.onCreateRoom(false)} >
                <form id='create-room' onSubmit={(e) => this.handleFormSubmit(e)}>
                        <label htmlFor="room-no">Room no</label><br />
                        <input
                            className="textbox"
                            type="text"
                            id="room-no"
                            value={this.state.roomNo}
                        />
                        <br />    
                    <CustomDropdown
                        listitems={['Non-AC', 'AC']}
                        label='Type'
                        onOptionChange={(option) => console.log(option)}
                    />
                        {this.state.fields.map((field) =>
                            getInputType(field)
                        )}
                </form>
            </Modal>
        )
    }

    render()
    {
        return (
            <div>
                <Toast message="Room Created Successfully" type='warning' />
                {this.state.showCreateRoomModal ? 
                    this.getCreateRoomModal()
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
                                <div className="filters-container" ref={this.dropdownRef}>
                                    {this.state.filters.map((filter,filterIndex) => 
                                        <div className="filter-dropdown" key={filterIndex}>
                                            <div className="filter-button" onClick={() => this.onFilerSelect(filterIndex)}>
                                                {filter.name} <IconCaretDown size='19' />  
                                            </div>
                                            <div className={`filter-dropdown-list ${this.state.filterDropdown === filterIndex ? 'show':''}`}>
                                                {filter.options.map((option,optionIndex) =>
                                                    <div className="filter-listitem" onClick={() => this.onFilterOptionSelect(filterIndex, optionIndex)}>
                                                        {option.selected?<IconCheckBoxChecked size='20'/>:<IconCheckBoxUnchecked size='20'/>}
                                                        {option.option} 
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}     
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