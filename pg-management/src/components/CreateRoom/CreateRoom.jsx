import React from "react";
import './CreateRoom.scss';

class CreateRoom extends React.Component{

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
                        <h2>Create Room</h2>
                        <input type="text"></input>
                        <select>
                            <option>Non-AC</option>
                            <option>AC</option>
                        </select>
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

export default CreateRoom;