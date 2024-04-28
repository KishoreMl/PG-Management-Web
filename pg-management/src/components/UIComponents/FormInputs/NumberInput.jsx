import React from "react";

class NumberInput extends React.Component{
    render() {
        return (
            <div>
                <label for={this.props.field.name}>{this.props.field.name}</label><br />
                <input
                    type="number"
                    min="1"
                    max="20"
                    onChange={(e) => console.log(e.target.value)}
                    id={this.props.field.name}>
                </input>
            </div>
        )
    }
}

export default NumberInput;