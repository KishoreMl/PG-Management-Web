import React from "react";
import { RightPanel } from "../RightPanel/RightPanel";
import { ToolBar } from "../ToolBar/ToolBar";
import { RoomsTable } from "../RoomsTable/RoomsTable";
import './RoomsPage.scss';
import { GridView } from "../GridView/GridView";

export class RoomsPage extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            currentView: 'grid',
            panelDisplay: 'show',
        }
    }
     setPanelDisplay = () =>
    {
        this.setState({panelDisplay:""})
    }
    render()
    {
        return (
            <div className="container">
                <RightPanel panelDisplay={this.state.panelDisplay} setPanelDisplay={ this.setPanelDisplay} />
                <ToolBar currentView={this.state.currentView} onViewChange={(view)=>this.setState({currentView:view})} />
                {this.state.currentView === 'list' ? <RoomsTable /> : <GridView room={this.room} />} 
            </div>
        )
    }
}