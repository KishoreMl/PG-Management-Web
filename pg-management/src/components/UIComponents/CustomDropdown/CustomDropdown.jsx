import React from "react";
import IconCaretDown from "../Icons/IconCaretDown";
import IconCheck from "../Icons/IconCheck";
import "./CustomDropdown.scss";

class Dropdown extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: this.props.listitems[0],
            showDropdown: false,
        }
        this.dropdownRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
    handleClickOutside = (event) => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({ showDropdown: false});
        }
    }

    handleToggleDropdown() {
        this.state.showDropdown ? this.setState({ showDropdown: false }) : this.setState({ showDropdown: true });
    }

    onOptionSelect(option) {
        this.setState({selectedOption:option, showDropdown:false})
    }
    
    render() {
        return (
            <div className="dropdown-container" ref={this.dropdownRef}>
                {this.props.label && <p>{this.props.label}</p>}
                <div className="dropdown-button" onClick={() => this.handleToggleDropdown()}>
                    {this.state.selectedOption}
                    <IconCaretDown />
                </div>
                <div className={`dropdown-list ${this.state.showDropdown?'show':''}`}>
                    {this.props.listitems?.map((listitem) =>
                        <div className="listitem" key={listitem} onClick={() => this.onOptionSelect(listitem)}>
                            {listitem}
                            {this.state.selectedOption === listitem ? <IconCheck /> : null}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Dropdown;