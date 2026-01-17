import React from "react";
import TextInput from "./TextInput";
import RadioButtons from "./RadioButton";
import CheckBox from "./CheckBox";
import Dropdown from "./Dropdown";
import NumberInput from "./NumberInput";

class FormInput extends React.Component {
    render(){
        switch (this.props.field.type) {
            case 'text':
                return <TextInput field={this.props.field} onChange={this.props.onChange}/>;
            case 'radio':
                return <RadioButtons field={this.props.field} onChange={this.props.onChange} />;
            case 'checkbox':
                return <CheckBox field={this.props.field} onChange={this.props.onChange}/>;
            case 'dropdown':
                return <Dropdown field={this.props.field} onChange={this.props.onChange}/>;
            case 'number':
                return <NumberInput field={this.props.field} onChange={this.props.onChange}/>;
            default:
                return <div></div>
        }
    }
    
}

export default FormInput;