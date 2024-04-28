import React from "react";
import IconGrid from "../UIComponents/Icons/IconGrid";
import IconList from "../UIComponents/Icons/IconList";
import IconCheck from "../UIComponents/Icons/IconCheck";
import IconCaretDown from "../UIComponents/Icons/IconCaretDown";
import IconFilter from "../UIComponents/Icons/IconFilter";
import IconSearch from "../UIComponents/Icons/IconSearch";
import IconArrowback from "../UIComponents/Icons/IconArrowback";
import { ToolTip } from "../UIComponents/ToolTip/ToolTip";
import './ToolBar.scss';

export class ToolBar extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            currentView: this.props.currentView,
            showDropdown: false,
            showFilterOptions: false,
            isFilterApplied:true,
            displayIcons:true,
            selectedBranch: this.props.dropdownListItems ? this.props.dropdownListItems[0].name : '',
            selectedFilters: [],
            selectedFilter:'Sharing',
            filters:['Sharing','Type','Rent'],
            filterOptions:{
                sharingFilters:[
                    {name:"1 Sharing", value:1, selected:false},
                    {name:"2 Sharing", value:2, selected:false},
                    {name:"3 Sharing", value:3, selected:false},
                    {name:"4 Sharing", value:4, selected:false},
                    {name:"5 Sharing", value:5, selected:false},
                ],
                roomTypeFilters:[
                    {name:"AC", value:"AC",selected:false},
                    {name:"NON-AC", value:"NON-AC",selected:false}
                ],
                rentFilters:[
                    {name:"5000", value:5000,selected:false},
                    {name:"6000", value:6000,selected:false},
                    {name:"7000", value:7000,selected:false},
                    {name:"8000", value:8000,selected:false},
                ]
            }
        }
        this.dropdownRef = React.createRef();
        this.filterRef = React.createRef();
        this.searchRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
    handleClickOutside = (event) => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({ showDropdown: false});
        }
        if(this.filterRef.current && !this.filterRef.current.contains(event.target)){
            this.setState({ showFilterOptions: false});
        }
    }

    handleView(view){
        this.setState({ currentView: view})
        this.props.onViewChange(view)
    }

    handleToggleDropdown() {
        this.state.showDropdown ? this.setState({ showDropdown: false }) : this.setState({ showDropdown: true });
    }

    handleFilterButtonClick() {
        this.state.showFilterOptions ? this.setState({ showFilterOptions: false }) : this.setState({ showFilterOptions: true });
    }

    onFilterSelect(filter){
        this.setState({selectedFilter:filter})
    }

    onFilterOptionSelect(currentFilter) {
        switch(currentFilter.category){
            case "Sharing":
                    let sharefilters = this.state.filterOptions.sharingFilters.map((filter) => {
                        if(filter.value === currentFilter.value){
                            filter.selected = !filter.selected;
                        }
                        return filter;
                    });
                    this.setState({ filterOptions: {sharingFilters: sharefilters} });
                    break;
            case "Type":  
                let typefilters = this.state.filterOptions.roomTypeFilters.map((filter) => {
                    if(filter.value === currentFilter.value){
                        filter.selected = !filter.selected;
                    }
                    return filter;
                });
                this.setState({ filterOptions: {roomTypeFilters: typefilters} });
                break;
            default:
                break;
        }
        const index = this.state.selectedFilters.findIndex((filter) => filter.value === currentFilter.value);
        if (index !== -1)
        {  
            const updatedFilters = this.state.selectedFilters.filter((filter) => currentFilter.value !== filter.value);
            this.setState({ selectedFilters: updatedFilters }, () => {
                this.props.onFilterSelected(this.state.selectedFilters); 
            });
        }
        else {
            const updatedFilters = [...this.state.selectedFilters, currentFilter];
            this.setState({ selectedFilters: updatedFilters }, () => {
                this.props.onFilterSelected(this.state.selectedFilters); 
            });  
        }
               
    }

    onBranchSelect(branch) {
        this.setState({ selectedBranch: branch });
        this.handleToggleDropdown();
    }

    handleSearchIconClick(){
        this.setState({displayIcons:false})
    }

    render() {
        return (
            <div className="tool-bar">
                <div className={`tool-bar-left ${this.state.displayIcons?'':'hide'}` }>   
                    {this.props.showBackButton && <IconArrowback onClick={() => this.props.onBackButtonClick()}/>}    
                    {this.props.showDropdown?
                        <div
                            className="dropdown-container" 
                            ref={this.dropdownRef}>
                            <div className="dropdown-button" onClick={() => this.handleToggleDropdown()}>
                                {this.state.selectedBranch}
                                {this.props.showDropdown?<IconCaretDown />:null}
                            </div>
                            <div className={`branches-dropdown-list ${this.state.showDropdown?'show':''}`}>
                                {this.props.dropdownListItems?.map((item) =>
                                    <div className="listitem" key={item.id} onClick={() => this.onBranchSelect(item.name)}>
                                        {item.name}
                                        {this.state.selectedBranch === item.name ? <IconCheck /> : null}
                                    </div>
                                )}
                            </div>
                        </div>
                    :null} 
                </div>
                {this.props.enableSearch && 
                    <div className={`search ${this.state.displayIcons?'':'show'}`}> 
                        <input type="text" placeholder="Search" ref={this.searchRef} />
                        <IconSearch size="24" onClick={()=>this.props.onSearch(this.searchRef.current.value)} />
                    </div>
                } 
                <div className={`tool-bar-right ${this.state.displayIcons?'':'hide'}`}>
                    <div className="search-button" onClick={()=> this.handleSearchIconClick()}>
                        <IconSearch size={20}/>
                    </div>
                    <div className="filter-button-container" ref={this.filterRef}>
                        <ToolTip text="Filter" >
                            <IconFilter size={20} onClick={() => this.handleFilterButtonClick()} />
                        </ToolTip>
                        {this.state.selectedFilters.length>0 && <div className="dot"></div>}
                        <div className={`filter-dropdown ${this.state.showFilterOptions?'show':''}`}>
                            <div className="filter-category-container">
                                {this.state.filters.map((filter) =>
                                    <div 
                                        className={`filter-category ${this.state.selectedFilter===filter?'selected':''}`}
                                        onClick={()=> this.onFilterSelect(filter)}>
                                        {filter}
                                    </div>
                                )}
                            </div>
                            <div className="filter-options-container"> 
                                {this.state.selectedFilter==="Sharing" && 
                                    this.state.filterOptions.sharingFilters.map((option) =>
                                    <div 
                                        className="filter-option"
                                        onClick={() => this.onFilterOptionSelect({category:"Sharing", value:option.value})} >
                                        {option.name}
                                        {option.selected && <IconCheck size={20} color="#3171e0" />}
                                    </div>
                                )}
                                {this.state.selectedFilter === "Type" && 
                                    this.state.filterOptions.roomTypeFilters.map((option) =>
                                    <div 
                                        className="filter-option"
                                        onClick={() => this.onFilterOptionSelect({category:"Type", value:option.value})} >
                                        {option.name}
                                        {option.selected && <IconCheck size={20} color="#3171e0" />}
                                    </div>
                                )}
                                {this.state.selectedFilter === "Rent" && 
                                    this.state.filterOptions.rentFilters.map((option) =>
                                    <div 
                                        className="filter-option"
                                        onClick={() => this.onFilterOptionSelect({category:"Rent", value:option.value})} >
                                        {option.name}
                                        {option.selected && <IconCheck size={20} color="#3171e0" />}
                                    </div>
                                )}   
                            </div>
                       </div>
                    </div>
                    {this.props.showViewButton?
                        (this.state.currentView === "list" ? 
                            <ToolTip text="Grid View" position='top'>
                                <IconGrid size={20} onClick={() => this.handleView('grid')} />  
                            </ToolTip>:
                            <ToolTip text="List View">
                                <IconList size={20} onClick={() => this.handleView('list')} />      
                            </ToolTip>
                        )
                        :null
                    }
                    <button onClick={() => this.props.onCreate()} className="create-button">
                        {this.props.createButtonText?this.props.createButtonText:'Create'}
                    </button>
                </div>
            </div>
        )
    }
}
