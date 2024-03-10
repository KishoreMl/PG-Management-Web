import React from "react";
import IconGrid from "../Icons/IconGrid";
import IconList from "../Icons/IconList";
import IconCheck from "../Icons/IconCheck";
import IconCaretDown from "../Icons/IconCaretDown";
import IconFilter from "../Icons/IconFilter";
import IconSearch from "../Icons/IconSearch";
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
            selectedBranch: this.props.dropdownListItems ? this.props.dropdownListItems[0].name : '',
            selectedFilters: [],
            filterCategories: 
                {
                    availabilty: {
                        options: [
                            { name: 'Available', value:'available', isSelected:false}
                        ]
                    },
                    sharing: {
                        options: [
                            { name: '1 Sharing', value: 1, isSelected:false },
                            { name: '2 Sharing', value: 2, isSelected:false },
                            { name: '3 Sharing', value: 3, isSelected:false },
                            { name: '4 Sharing', value: 4, isSelected:false },
                        ]
                    },
                    type: {
                        options: [
                            { name: 'AC', value: 'AC', isSelected: false },
                            { name: 'Non-AC', value: 'Non-AC', isSelected: false }
                        ]
                    }
                },
        }
        this.dropdownRef = React.createRef();
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

    onFilterSelect(filter) {
        console.log(filter)
        if (filter.isSelected === 'on')
        {
            let filters = [filter, ...this.state.selectedFilters];
            this.setState({ selectedFilters: filters });
            console.log(this.state.selectedFilters);
            this.props.onFilterSelected(filters[0]);
        }
        else {
            console.log(this.state.selectedFilters);
        }
         
    }

    onBranchSelect(branch) {
        this.setState({ selectedBranch: branch });
        this.handleToggleDropdown();
    }

    render() {
        return (
            <div className="tool-bar">
                <div className="tool-bar-left">       
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
                                       {item.name}   {this.state.selectedBranch === item.name? <IconCheck />:null}
                                    </div>
                                )}
                            </div>
                        </div>
                    :null} 
                </div>
                {this.props.enableSearch && 
                    <div className="search"> 
                        <input type="text" placeholder="Search" ref={this.searchRef} />
                        <IconSearch size="24" onClick={()=>this.props.onSearch(this.searchRef.current.value)} />
                    </div>
                } 
                <div className="tool-bar-right">
                    <div className="filter-button-container">
                        <IconFilter size={20} onClick={() => this.handleFilterButtonClick()} />
                        {this.state.selectedFilters.length>0 && <div className="dot"></div>}
                        <div className={`filter-dropdown ${this.state.showFilterOptions?'show':''}`}>
                            <div className="filter-category-container">
                                <div className="filter-category">Rooms</div>
                                <div className="filter-category selected">Sharing</div>
                                <div className="filter-category">Type</div>
                                <div className="filter-category">Guests</div>
                                <div className="filter-category">Rent</div>
                                <div className="filter-category">Eb</div>
                            </div>
                            <div className="filter-options-container"> 
                                {this.state.filterCategories.sharing.options.map((option) =>
                                    <div className="filter-option">
                                        {option.name} 
                                        <input type="checkbox"  onChange={(e) => this.onFilterSelect({category:'sharing',value:option.value,isSelected:e.target.value})}></input>
                                    </div>
                                )}
                            </div>
                       </div>
                    </div>
                    {this.props.showViewButton?
                        (this.state.currentView === "list" ? 
                            <IconGrid size={20} onClick={() => this.handleView('grid')} /> :
                            <IconList size={20} onClick={() => this.handleView('list')} />
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
