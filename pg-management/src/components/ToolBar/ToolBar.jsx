import React from "react";
import IconMap from "../Icons/IconMap";
import './ToolBar.scss';

export class ToolBar extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            currentView: this.props.currentView,
            showDropdown: false,
            branches: ['branch name 1', 'branch name 2', 'branch name 3', 'branch name 4'],
            selectedBranch: '',
        }
        this.dropdownRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
        this.setState({selectedBranch:this.state.branches[0]})
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
    handleClickOutside = (event) => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({ showDropdown: false });
        }
    }

    handleView(view){
        this.setState({ currentView: view})
        this.props.onViewChange(view)
    }

    handleToggleDropdown() {
        this.state.showDropdown ? this.setState({ showDropdown: false }) : this.setState({ showDropdown: true });
    }

    onBranchSelect(branch) {
        this.setState({ selectedBranch: branch });
        this.handleToggleDropdown();
    }

    render() {
        return (
            <div className="tool-bar">
                <div className="tool-bar-left">
                    <div
                        className="dropdown-container" 
                        ref={this.dropdownRef}>
                        <div className="dropdown-button" onClick={() => this.handleToggleDropdown()}>
                            {this.state.selectedBranch}
                             <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                fill="currentColor" 
                                className="mi-outline mi-caret-down" 
                                viewBox="0 0 24 24">
                                <path d="m12.6 14.74 4.22-4.58c.43-.46.06-1.16-.6-1.16H7.78c-.66 0-1.03.7-.6 1.16l4.22 4.58c.31.34.89.34 1.2 0"/>
                            </svg>
                        </div>
                        <div className={`branches-dropdown-list ${this.state.showDropdown?'show':''}`}>
                            {this.state.branches.map((branch) =>
                                <div className="listitem" onClick={() => this.onBranchSelect(branch)}>
                                    {branch} {this.state.selectedBranch? (this.state.selectedBranch === branch? <IconMap icon='check' />:null):<IconMap icon='check' />}
                                </div>
                            )}
                        </div>
                    </div> 
                </div>
                <div className="tool-bar-right">
                    {this.state.currentView === "list" ? 
                        <IconMap icon="grid" size={20} onClick={() => this.handleView('grid')} />:
                        <IconMap icon="list" size={20} onClick={() => this.handleView('list')} />
                    }
                    <button onClick={() => this.props.onCreateRoom()}>
                        Create Room
                    </button>
                </div>
            </div>
        )
    }
}
