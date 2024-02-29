import React from "react";
import { BranchTile } from "../BranchTile/BranchTile";
import { getBranches } from "../../sdk/pgmanagement";
import CreateModal from "../CreateModal/CreateModal";
import { ToolBar } from "../ToolBar/ToolBar";
import { useHistory } from "react-router";
import './BranchesPage.scss';


export class BranchesPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showCreateModal:false,
            branches:[
                {id:'bid1',name: 'branch name 1', location: 'location 1'}, 
                {id:'bid2',name: 'branch name 2', location: 'location 2'}, 
                {id:'bid3',name: 'branch name 3', location: 'location 3'}, 
                {id:'bid4',name: 'branch name 4', location: 'location 4'},
                {id:'bid5',name: 'branch name 1', location: 'location 1'}, 
                {id:'bid6',name: 'branch name 2', location: 'location 2'}, 
                {id:'bid7',name: 'branch name 3', location: 'location 3'}, 
                {id:'bid8',name: 'branch name 4', location: 'location 4'},
                {id:'bid9',name: 'branch name 1', location: 'location 1'}, 
                {id:'bid10',name: 'branch name 2', location: 'location 2'}, 
                {id:'bid11',name: 'branch name 3', location: 'location 3'}, 
                {id:'bid12',name: 'branch name 4', location: 'location 4'}
            ]
        }
    }
    // componentDidMount(){
    //     const branches = getBranches();
    //  }
    onBranchSelect(branchId){
        console.log(branchId);
        window.open('/rooms','_self');
    }
    handleCreateModal(display){
        this.setState({showCreateModal:display});
    }

    render()
    {    
        return (
            <>
                {this.state.showCreateModal ? 
                    <CreateModal 
                        title="Create Branch" 
                        onCloseModal={() => this.handleCreateModal(false)} 
                    /> 
                : null}
                <ToolBar 
                    showDropdown={false}  
                    createButtonText="Create Branch"
                    showViewButton={false}
                    onCreate={() => this.handleCreateModal(true)}
                />
                <div className="branch-container">
                    {this.state.branches.map((branch) => 
                        <BranchTile
                            key={branch.id}
                            branch={branch}
                            onBranchSelect={(branchId) => this.onBranchSelect(branchId)}
                        />
                    )} 
                </div>
            </>
        )
    }
}