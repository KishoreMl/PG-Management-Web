
import React from "react";

function IconAlert(props)
{
    return (
        <svg 
            onClick={props.onClick ? () => props.onClick():null}
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 20}
            height={props.size || 20}
            fill={props.color || "curentColor"} 
            class="mi-solid mi-alert" 
            viewBox="0 0 24 24">
            <path d="M22.87 19.04 13.72 3c-.76-1.33-2.68-1.33-3.44 0L1.13 19.04C.38 20.36 1.33 22 2.85 22h18.3c1.52 0 2.47-1.64 1.72-2.96m-11.92-9.9c0-.63.45-1.15 1.06-1.15s1.06.51 1.06 1.15c0 .04-.01.12-.01.14l-.39 5.04c-.04.44-.3.7-.66.7s-.62-.26-.66-.7l-.4-5.04zm1.06 9.89c-.67 0-1.21-.54-1.21-1.21s.54-1.19 1.21-1.19 1.21.54 1.21 1.19-.54 1.21-1.21 1.21"/>
        </svg>
    );
}

export default IconAlert;


