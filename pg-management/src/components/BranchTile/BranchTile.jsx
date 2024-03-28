import React from "react";
import IconMore from "../Icons/IconMore";
import IconLogo from "../Icons/IconLogo";
import './BranchTile.scss';

export class BranchTile extends React.Component{
    render() {
        return (
            <div className="branch-tile" onClick={() => this.props.onBranchSelect(this.props.branch.id)}>
                 <div className="content">
                    <IconLogo color="grey" size="155"/>
                 </div>
                <div className="footer">
                    <div>
                        <p>{this.props.branch.name}</p>
                        <p>{this.props.branch.location}</p>
                    </div>
                    <IconMore />
                </div>
            </div>
        )
    }
}