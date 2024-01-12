import React from "react";

function IconDelete(props)
{
    return (
        <svg
            onClick={props.onClick ? () => props.onClick():null}
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 20}
            height={props.size || 20}
            fill={props.color || "curentColor"}
            className="mi-outline mi-delete"
            viewBox="0 0 24 24">
            <path d="M13.5 10c-.28 0-.5.22-.5.5v7c0 .28.22.5.5.5s.5-.22.5-.5v-7c0-.28-.22-.5-.5-.5m-3 0c-.28 0-.5.22-.5.5v7c0 .28.22.5.5.5s.5-.22.5-.5v-7c0-.28-.22-.5-.5-.5m-4.49 8.99c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-12h-12zm2-10h8v10h-8zm9.99-5h-2.08c-.27 0-.52-.11-.71-.29l-.41-.41a.99.99 0 0 0-.71-.29H9.92c-.27 0-.52.11-.71.29l-.41.41a.99.99 0 0 1-.71.29H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"/>
        </svg>
    );
}

export default IconDelete;


