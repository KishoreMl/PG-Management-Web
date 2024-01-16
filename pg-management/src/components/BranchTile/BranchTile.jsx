import React from "react";
import IconMore from "../Icons/IconMore";
import './BranchTile.scss';

export class BranchTile extends React.Component{
    render() {
        return (
            <div className="branch-tile">
                <IconMore />
                <p>{this.props.branch.name}</p>
                <p>{this.props.branch.location}</p>
            </div>
        )
    }
}