import React from "react";

function IconCaretDown(props)
{
    return (
        <svg 
            onClick={props.onClick ? () => props.onClick():null}
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 20}
            height={props.size || 20}
            fill={props.color || "curentColor"}
            className="mi-outline mi-caret-down" 
            viewBox="0 0 24 24">
            <path d="m12.6 14.74 4.22-4.58c.43-.46.06-1.16-.6-1.16H7.78c-.66 0-1.03.7-.6 1.16l4.22 4.58c.31.34.89.34 1.2 0"/>
        </svg>
    );
}

export default IconCaretDown;