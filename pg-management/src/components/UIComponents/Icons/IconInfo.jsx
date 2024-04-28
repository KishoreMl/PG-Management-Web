import React from "react";

function IconInfo(props) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClick ? () => props.onClick():null}
            width={props.size}
            height={props.size}
            fill={props.color || "curentColor"}
            className="mi-solid mi-info" 
            viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1.06 14.15c0 .55-.45 1-1 1s-1-.45-1-1v-4.14c0-.55.45-1 1-1s1 .45 1 1zm-1-7.11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"/>
        </svg>
    )
}

export default IconInfo;

