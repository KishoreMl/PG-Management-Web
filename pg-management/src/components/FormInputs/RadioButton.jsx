import React from "react";

class RadioButtons extends React.Component{

    radioInput = {name:'Food Type',options:['Non-Veg','Veg']}
    render(){
        return (
            <div>
                <p>{this.props.field.name}</p>
                {this.props.field.options.map((option) =>
                    <div>
                        <input type='radio' id={option} name={this.props.field.name}></input>
                        <label for={option}>{option}</label>
                    </div>
                )} 
            </div>
        )
    }
}

export default RadioButtons;