import React from "react";

function IconList(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClick ? () => props.onClick():null}
            width={props.size}
            height={props.size}
            fillRule={props.color || "curentColor"}
            className="bi bi-list"
            viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
    )
}

export default IconList;