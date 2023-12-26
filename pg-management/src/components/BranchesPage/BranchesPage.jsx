import React from "react";
import { BranchTile } from "../BranchTile/BranchTile";
import { getBranches } from "../../sdk/pgmanagement";
import './BranchesPage.scss';


export class BranchesPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            branches:[]
        }
    }

    componentDidMount(){
        this.state.branches = getBranches();
    }

    onBranchSelect(branch){
        console.log(branch);
    }

    render()
    {    
        return (
            <div className="branch-container">
                {this.state.branches.map((branch) => {
                    <BranchTile
                        branch={branch}
                        onBranchSelect={(branch) => this.onBranchSelect(branch)}
                    />
                })} 
            </div>
        )
    }
}