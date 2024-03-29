import React from "react";

function IconTicket(props)
{
    return (
        <svg
            onClick={props.onClick ? () => props.onClick():null}
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 20}
            height={props.size || 20}
            fill={props.color || "curentColor"}
            class="mi-solid mi-ticket"
            viewBox="0 0 24 24">
            <path d="M22 17v-3c-1.1 0-1.99-.9-1.99-2s.89-2 1.99-2V7c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v3c1.1 0 2 .9 2 2s-.9 2-2 2v3c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2m-7-8.5v-2h2v2zm0 3v-2h2v2zm0 3v-2h2v2zm0 3v-2h2v2z"/>
        </svg>
    );
}

export default IconTicket;



