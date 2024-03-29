import React from "react";
import { BranchTile } from "../BranchTile/BranchTile";
import { getBranches } from "../../sdk/pgmanagement";
import './BranchesGridView.scss';


export class BranchesGridView extends React.Component{
    
    render()
    {    
        return (
                <div className="grid-container">
                    {this.props.branches && this.props.branches.map((branch) => 
                        <BranchTile
                            key={branch.id}
                            branch={branch}
                            onBranchSelect={(branchId) => this.props.onBranchSelect(branchId)}
                        />
                    )} 
                </div>  
        )
    }
}