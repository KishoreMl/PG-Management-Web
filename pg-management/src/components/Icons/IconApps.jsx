import React from "react";

function IconApps(props)
{
    return (
        <svg
            onClick={props.onClick ? () => props.onClick():null}
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 20}
            height={props.size || 20}
            fill={props.color || "curentColor"}
            class="mi-solid mi-apps"
            viewBox="0 0 24 24">
            <path d="M5 8h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1m6 12h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1m-6 0h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1m0-6h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1m6 0h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1m5-9v2c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1m-5 3h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1m6 6h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1m0 6h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1"/>
        </svg>
    );
}

export default IconApps;

