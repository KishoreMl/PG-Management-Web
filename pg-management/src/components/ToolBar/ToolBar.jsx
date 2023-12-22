import React from "react";
import './ToolBar.scss';

export class ToolBar extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            currentView:this.props.currentView
        }
    }
    render() {
        return (
            <div className="tool-bar">
                <div className="tool-bar-left">
                    <select name="branches" id="branches">
                        <option value="branch1">Branch 1</option>
                        <option value="branch2">Branch 2</option>
                        <option value="branch3">Branch 3</option>
                        <option value="branch4">Branch 4</option>
                    </select>
                </div>
                <div className="tool-bar-right">
                    {this.state.currentView === "list" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => { this.setState({ currentView: "grid" });this.props.onViewChange("grid") }}
                            width="22"
                            height="22"
                            fill="currentColor"
                            className="bi bi-grid-fill"
                            viewBox="0 0 16 16">
                            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                        </svg>) :
                        (<svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => { this.setState({ currentView: "list" }); this.props.onViewChange("list") }}
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-list"
                            viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>)}
                        <button>
                            Create Room
                        </button>
                </div>
            </div>
        )
    }
}