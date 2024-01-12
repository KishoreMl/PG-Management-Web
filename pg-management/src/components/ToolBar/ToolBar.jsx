import React from "react";
import IconMap from "../Icons/IconMap";
import './ToolBar.scss';

export class ToolBar extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            currentView:this.props.currentView
        }
    }

    handleView(view){
        this.setState({ currentView: view})
        this.props.onViewChange(view)
    }

    render() {
        return (
            <div className="tool-bar">
                <div className="tool-bar-left">
                   <div className="dropdown-container">
                        <div className="dropdown-button">
                             Branch name
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
                        <div className="branches-dropdown-list">
                            <div className="listitem">Branch name 2</div>
                            <div className="listitem">Branch name 3</div>
                            <div className="listitem">Branch name 4</div>
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
