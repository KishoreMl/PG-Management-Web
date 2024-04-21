import React from "react";
import { BranchesGridView } from "../../components/BranchesGridView/BranchesGridView";
import CreateModal from "../../components/CreateModal/CreateModal";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import { getBranches } from "../../sdk/pgmanagement";

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
    
    onBranchSelect(branchId){
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
                <div className="container">
                   <BranchesGridView 
                     branches={this.state.branches} 
                     onBranchSelect={(branchId) => this.onBranchSelect(branchId)} 
                   />
                </div>
            </>
        )
    }
}