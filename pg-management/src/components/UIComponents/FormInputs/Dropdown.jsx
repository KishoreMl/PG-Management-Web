import React from 'react';

class Dropdown extends React.Component{

    render() {
        return (
            <div>
                <label for={this.props.field.name}>{this.props.field.name}</label><br />
                <select id={this.props.field.name}>
                    {this.props.field.options.map((option) =>
                        <option>{option}</option>
                    )}
                </select>
            </div>
        )
    }
}

export default Dropdown;