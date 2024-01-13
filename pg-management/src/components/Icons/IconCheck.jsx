
import React from "react";

function IconCheck(props)
{
    return (
        <svg
            onClick={props.onClick ? () => props.onClick():null}
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 20}
            height={props.size || 20}
            fill={props.color || "curentColor"}
            className="mi-outline mi-check"
            viewBox="0 0 24 24">
            <path d="M9 18c-.26 0-.51-.1-.71-.29l-4-4A.996.996 0 1 1 5.7 12.3l3.29 3.29 9.29-9.29a.996.996 0 1 1 1.41 1.41l-10 10c-.2.2-.45.29-.71.29Z"/>
        </svg>
    );
}

export default IconCheck;

