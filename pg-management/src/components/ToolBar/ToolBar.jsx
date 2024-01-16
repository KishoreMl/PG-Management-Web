import React from "react";
import IconGrid from "../Icons/IconGrid";
import IconList from "../Icons/IconList";
import IconCheck from "../Icons/IconCheck";
import IconCaretDown from "../Icons/IconCaretDown";
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
                             <IconCaretDown />
                        </div>
                        <div className={`branches-dropdown-list ${this.state.showDropdown?'show':''}`}>
                            {this.state.branches.map((branch) =>
                                <div className="listitem" onClick={() => this.onBranchSelect(branch)}>
                                    {branch} {this.state.selectedBranch? (this.state.selectedBranch === branch? <IconCheck />:null): <IconCheck />}
                                </div>
                            )}
                        </div>
                    </div> 
                </div>
                <div className="tool-bar-right">
                    {this.state.currentView === "list" ? 
                        <IconGrid size={20} onClick={() => this.handleView('grid')} /> :
                        <IconList size={20} onClick={() => this.handleView('list')} />
                    }
                    <button onClick={() => this.props.onCreateRoom()}>
                        Create Room
                    </button>
                </div>
            </div>
        )
    }
}
