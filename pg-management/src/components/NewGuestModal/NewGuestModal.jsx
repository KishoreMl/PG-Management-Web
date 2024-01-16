import React from "react";
import IconClose from "../Icons/IconClose";

class CreateRoom extends React.Component{
    render() {
        return (
            <React.Fragment>
                <div id="overlay" className={`overlay ${this.state.display?'show':''}`}></div>
                <div id="myModal" className={`modal ${this.state.display?'show':''}`}>
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>New Guest</h2>
                            <IconClose size={18}  onClick={() => this.props.onCloseModal()} />
                        </div>
                        <div className="modal-content">
                            <label for="name">Name</label><br />
                            <input className="textbox" type="text" id="name"></input> <br />

                            <label for="contact">Contact</label><br />
                            <input className="textbox" type="text" id="contact"></input><br />
                            
                        </div>  
                        <div className="modal-footer">
                            <div className="footer-right">
                                <button className="secondary" onClick={() => this.props.onCloseModal()}>Cancel</button>
                                <button className="primary" onClick={() => console.log('Primary Button Clicked')}>Save</button>
                            </div>
                        </div>        
                    </div>
                </div>
            </ React.Fragment>
        )
    }
}

export default CreateRoom;