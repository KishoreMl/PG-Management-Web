import React from "react";
import './Tooltip.scss';
export class Tooltip extends React.Component{
    render()
    {
        return (
            <div className="tooltip-container">
                {this.props.children}
                <div className={`tooltip ${this.props.position}`}>{this.props.text}</div>
            </div>
        )
    }
}