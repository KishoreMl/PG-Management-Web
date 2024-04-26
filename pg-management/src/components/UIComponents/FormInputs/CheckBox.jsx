import React from "react";

class CheckBox extends React.Component{
    render() {
        return (
            <div>
                <p>{this.props.field.name}</p>
                {this.props.field.options.map((option) => 
                    <div>
                        <input type='checkbox' id={option} name={this.props.field.name}></input>
                        <label for={option}>{option}</label>
                    </div>
                )}
            </div>
        )
    }
}

export default CheckBox;