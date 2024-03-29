import React, { Component } from "react";
import IconInfo from "../Icons/IconInfo";
import IconCheckCircle from "../Icons/IconCheckCircle";
import IconAlert from "../Icons/IconAlert";

import './Toast.scss';
export class Toast extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }
    getIcon(type) {
        switch (type) {
            case 'success':
                return <IconCheckCircle size={19} color='green'/>
            case 'error':
                return <IconAlert size={19}  color='rgb(155, 6, 6)'/>
            case 'warning':
                return <IconInfo size={19}  color='rgb(135, 135, 5)'/>
            default:
                return <IconInfo size={19} />
        }
    }

    render() {
        return (
            <div className={`toast ${this.state.show ? 'show' : ''} ${this.props.type}`}>
                {this.getIcon(this.props.type)}
                {this.props.message}
            </div>
        )
    }   
}