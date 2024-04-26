import React from "react"
import IconClose from "../Icons/IconClose";

class Modal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            display: true,
        }
    }
    render(){
        return(
            <React.Fragment>
                <div id="overlay" className={`overlay ${this.state.display?'show':''}`}></div>
                <div id="myModal" className={`modal ${this.state.display?'show':''}`}>
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>{this.props.title?this.props.title:"Modal header"}</h2>
                            <IconClose size='18' onClick={() => this.props.onCloseModal()} />
                        </div>
                        <div className="modal-content"> 
                            {this.props.children}
                        </div>  
                        <div className="modal-footer">
                            <div className="footer-right">
                                <button className="secondary" onClick={() => this.props.onCloseModal()}>
                                    {this.props.secondaryButtonText?this.secondaryButtonText:"Cancel"}
                                </button>
                                <button className="primary" type='submit' form='create-room'>
                                    {this.props.primaryButtonText?this.props.primaryButtonText:"Save"}
                                </button>
                            </div>
                        </div>        
                    </div>
                </div>
            </ React.Fragment>
        )
    }
}

export default Modal;