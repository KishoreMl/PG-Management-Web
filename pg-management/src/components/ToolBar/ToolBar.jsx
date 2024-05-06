import React from "react";
import IconGrid from "../UIComponents/Icons/IconGrid";
import IconList from "../UIComponents/Icons/IconList";
import IconCheck from "../UIComponents/Icons/IconCheck";
import IconCaretDown from "../UIComponents/Icons/IconCaretDown";
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
