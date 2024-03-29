import React from "react";

function IconBookings(props)
{
    return (
        <svg
            onClick={props.onClick ? () => props.onClick():null}
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 20}
            height={props.size || 20}
            fill={props.color || "curentColor"}
            class="mi-solid mi-clipboard-planning"
            viewBox="0 0 24 24">
            <path d="M8 11h1v1H8zm0 4h1v-1H8zm0 3h1v-1H8zm3-6h5v-1h-5zm0 3h5v-1h-5zm0 3h5v-1h-5zm9-11v13c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h3c0-1.66 1.34-3 3-3s3 1.34 3 3h3c1.1 0 2 .9 2 2m-2 0h-2v1H8V7H6v13h12z"/>
        </svg>
    );
}

export default IconBookings;


