import React from "react";
import './CreateRoom.scss';

class CreateRoom extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            display: true,
        }
    }

    render()
    {
        return (
            <>
                <div id="overlay" class={`overlay ${this.state.display?'show':''}`}></div>
                <div id="myModal" class={`modal ${this.state.display?'show':''}`}>
                    <div class="modal-content">
                        <span onClick={() => this.setState({display:false})} class="close">&times;</span>
                        <h2>Create Room</h2>
                        <input type="text"></input>
                        <select>
                            <option>Non-AC</option>
                            <option>AC</option>
                        </select>
                        <input></input>
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

export default CreateRoom;