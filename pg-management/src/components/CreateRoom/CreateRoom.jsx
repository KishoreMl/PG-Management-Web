import React from "react"
import IconClose from "../Icons/IconClose";
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
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>Create Room</h2>
                            <IconClose size='18' onClick={() => this.props.onCloseModal()} />
                        </div>
                        <div className="modal-content">
                            <label for="room-no">Room no</label><br />
                            <input className="textbox" type="text" id="room-no"></input> <br />
                             <label for="room-type">Type</label><br />
                            <select id="room-type">
                                <option>Non-AC</option>
                                <option>AC</option>
                            </select><br />
                             <label for="room-capacity">Sharing</label><br />
                            <input className="textbox" type="text"id="room-capacity"></input><br/>
                        </div>  
                        <div className="modal-footer">
                            <div className="footer-right">
                                <button className="secondary" onClick={() => this.props.onCloseModal()}>Cancel</button>
                                <button className="primary" onClick={() => console.log('Primary Button Clicked')}>Save</button>
                            </div>
                        </div>        
                    </div>
                </div>
            </>
            
        )
    }
}

export default CreateRoom;