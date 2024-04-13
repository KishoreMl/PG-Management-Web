import React from "react"
import IconClose from "../Icons/IconClose";
import './CreateModal.scss';

class CreateModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            display: true,
            roomNo: '',
            roomType: '',
            capacity:'',
            fields:[
                {name:'address',type:'text'},
                {name:'city',type:'text '},
                {name:'address',type:'text'},
            ]
        }
    }

    handleRoomNoChange(e){
        this.setState({roomNo:e.target.value})
    }

    handleRoomTypeChange(e) {
        this.setState({roomType:e.target.value})
    }

    handleCapacityChange(e) {
        this.setState({capacity:e.target.value})
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        const Room = {
            roomoNo: this.state.roomNo,
            type: this.state.roomType,
            capacity:this.state.capacity,
        }
        console.log(Room);
        this.props.onCloseModal();
    }

    render()
    {
        return (
            <React.Fragment>
                <div id="overlay" className={`overlay ${this.state.display?'show':''}`}></div>
                <div id="myModal" className={`modal ${this.state.display?'show':''}`}>
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>{this.props.title}</h2>
                            <IconClose size='18' onClick={() => this.props.onCloseModal()} />
                        </div>
                        <div className="modal-content">
                            <form id='create-room' onSubmit={(e) => this.handleFormSubmit(e)}>
                                <label htmlFor="room-no">Room no</label><br />
                                <input
                                    className="textbox"
                                    type="text"
                                    id="room-no"
                                    value={this.state.roomNo}
                                    onChange={(e) => this.handleRoomNoChange(e)}>
                                </input> <br />
                                <label htmlFor="room-type">Type</label><br />
                                <select
                                    id="room-type"
                                    value={this.state.roomType}
                                    onChange={(e) => this.handleRoomTypeChange(e)}>
                                    <option>Non-AC</option>
                                    <option>AC</option>
                                </select><br />
                                <label htmlFor="room-capacity">Sharing</label><br />
                                <input
                                    className="textbox"
                                    type="text"
                                    id="room-capacity"
                                    value={this.state.capacity}
                                    onChange={(e) => this.handleCapacityChange(e)}>
                                </input><br />
                            </form>    
                        </div>  
                        <div className="modal-footer">
                            <div className="footer-right">
                                <button className="secondary" onClick={() => this.props.onCloseModal()}>Cancel</button>
                                <button className="primary" type='submit' form='create-room'>Save</button>
                            </div>
                        </div>        
                    </div>
                </div>
            </ React.Fragment>
            
        )
    }
}

export default CreateModal;