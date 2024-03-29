
import React from "react";

function IconPerson(props)
{
    return (
        <svg
            onClick={props.onClick ? () => props.onClick():null}
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 20}
            height={props.size || 20}
            fill={props.color || "curentColor"}
            class="mi-solid mi-person-account"
            viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 4c2.07 0 3.75 1.68 3.75 3.75S14.07 13.5 12 13.5s-3.75-1.68-3.75-3.75S9.93 6 12 6m0 14c-2.84 0-5.34-1.5-6.76-3.74.13-.07.27-.14.43-.21 1.22-.56 3.47-1.37 6.33-1.37 2.87 0 5.12.81 6.33 1.37.16.07.3.15.43.22A7.99 7.99 0 0 1 12 20"/>
        </svg>
    );
}

export default IconPerson;
