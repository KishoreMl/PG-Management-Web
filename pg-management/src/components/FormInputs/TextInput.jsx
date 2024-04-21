import React from "react";

class TextInput extends React.Component{

    render() {
        return (
            <div>
                <label htmlFor="room-capacity">{this.props.field.name}</label><br />
                <input type='text'></input>
            </div>  
        )
    }
}

export default TextInput;