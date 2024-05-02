
import React from "react";

function IconCheckBoxUnchecked(props)
{
    return (
        <svg 
            onClick={props.onClick ? () => props.onClick():null}
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 20}
            height={props.size || 20}
            fill={props.color || "curentColor"}
            className="mi-solid mi-checkbox-unchecked" 
            viewBox="0 0 24 24">
            <path d="M18.24 5.76v12.48H5.76V5.76zm0-1.76H5.76A1.776 1.776 0 0 0 4 5.76v12.48A1.776 1.776 0 0 0 5.76 20h12.48A1.776 1.776 0 0 0 20 18.24V5.76A1.776 1.776 0 0 0 18.24 4"/>
        </svg>
    );
}

export default IconCheckBoxUnchecked;



