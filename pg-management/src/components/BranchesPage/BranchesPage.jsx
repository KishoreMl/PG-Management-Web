import React from "react";
import { BranchTile } from "../BranchTile/BranchTile";
import './BranchesPage.scss';

export class BranchesPage extends React.Component{

    render()
    {
        return (
            <div className="branch-container">
                <BranchTile />
            </div>
        )
    }
}