import React from "react";
import { RightPanel } from "../RightPanel/RightPanel";
import { ToolBar } from "../ToolBar/ToolBar";
import { RoomsTable } from "../RoomsTable/RoomsTable";
import './RoomsPage.scss';
import { GridView } from "../GridView/GridView";

export class RoomsPage extends React.Component{

    rooms = [];

    constructor(props)
    {
        super(props);
        this.state = {
            currentView: 'grid',
            panelDisplay: 'show',
        }
    }
    
    componentDidMount()
    {
        this.rooms = getRooms(branchId);
    }
    setPanelDisplay = () =>
    {
        this.setState({panelDisplay:""})
    }
    render()
    {
        return (
            <div className="container">
                <ToolBar
                    currentView={this.state.currentView}
                    onViewChange={(view) => this.setState({ currentView: view })}
                />
                {this.state.currentView === 'list' ?
                    <RoomsTable rooms = {this.rooms} /> :
                    <GridView rooms = {this.room} />
                } 
                <RightPanel
                    panelDisplay={this.state.panelDisplay}
                    setPanelDisplay={this.setPanelDisplay}
                />
            </div>
        )
    }
}