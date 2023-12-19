import React from "react";
import { BranchTile } from "../BranchTile/BranchTile";
import './BranchesPage.scss';
import { getBranches } from "../../sdk/pgmanagement";

export class BranchesPage extends React.Component{

    branches = [];

    componentDidMount()
    {
        branches = getBranches(pgId);
    }

    onBranchSelect(branch)
    {
        console.log(branch);
    }

    render()
    {
        return (
            <div className="branch-container">
                {this.branches.map((branch) => {
                    <BranchTile
                        branch={branch}
                        onBranchSelect={(branch) => this.onBranchSelect(branch)}
                    />
                })} 
            </div>
        )
    }
}