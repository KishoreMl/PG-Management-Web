import React from "react";
import './CreateGuest.scss';

class CreateGuest extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            display: true,
        }
    }
    onSubmit() {
        
    }

    render()
    {
        return (
            <>
                <div id="overlay" className={`overlay ${this.state.display?'show':''}`}></div>
                <div id="myModal" className={`modal ${this.state.display?'show':''}`}>
                    <div className="modal-content">
                        <span onClick={() => this.props.onCloseModal()} className="close">&times;</span>
                        <h2>Create Guest</h2>
                        <input type="text"></input>
                        <input type='text'></input>
                        <input type="number"></input>
                        <div className="modal-footer">
                            <button>Cancel</button>
                            <button>Save</button>
                        </div>        
                    </div>
                </div>
            </>
            
        )
    }
}

export default CreateGuest;