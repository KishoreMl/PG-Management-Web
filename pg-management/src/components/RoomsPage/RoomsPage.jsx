import React from "react";
import { RightPanel } from "../RightPanel/RightPanel";
import { ToolBar } from "../ToolBar/ToolBar";
import { RoomsTable } from "../RoomsTable/RoomsTable";
import { GridView } from "../GridView/GridView";
import { getRooms } from "../../sdk/pgmanagement";
import './RoomsPage.scss';

export class RoomsPage extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            rooms: [],
            currentView: 'grid',
            panelDisplay: 'show',
        }
    }
    
   async componentDidMount() {
        const response = await getRooms('pgId1');   
        this.setState({ rooms: [response] }); 
        console.log(this.state.rooms);
    }

    setPanelDisplay = () =>{
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
                    <RoomsTable rooms = {this.state.rooms} /> :
                    <GridView rooms = {this.state.rooms} />
                } 
                <RightPanel
                    panelDisplay={this.state.panelDisplay}
                    setPanelDisplay={this.setPanelDisplay}
                />
            </div>
        )
    }
}