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
                    {this.props.branches.length > 1 ?
                        <select name="branches" id="branches">
                            {this.props.branches.map((branch) => 
                                <option value={branch.id}>{branch.name}</option>
                            )}
                        </select> :
                        <div>
                            {this.props.branches[0]}
                        </div>
                    }   
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
