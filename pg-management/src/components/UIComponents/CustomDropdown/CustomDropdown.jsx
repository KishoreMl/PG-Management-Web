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
    
    render() {
        return (
            <div className="dropdown-container" ref={this.dropdownRef}>
                <div className="dropdown-button">
                    {this.state.selectedOption}
                    <IconCaretDown />
                </div>
                <div className="dropdown-list">
                    {this.props.listitems?.map((listitem) =>
                        <div className="listitem" key={listitem} onClick={() => console.log(listitem)}>
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