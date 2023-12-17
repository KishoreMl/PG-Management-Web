import React from "react";
import './BranchTile.scss';
import IconMap from "../Icons/IconMap";

export class BranchTile extends React.Component{
    render() {
        return (
            <div className="branch-tile">
                <IconMap icon='more' />
            </div>
        )
    }
}