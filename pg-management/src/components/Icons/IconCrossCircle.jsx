
import React from "react";

function IconCrossCircle(props)
{
    return (
        <svg
            style={{transform:'rotateZ(45deg)'}}
            onClick={props.onClick ? () => props.onClick():null}
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 20}
            height={props.size || 20}
            fill={props.color || "curentColor"}
            className="mi-outline mi-add-circle rotate"
            viewBox="0 0 24 24">
            <path d="M16 11h-3V8c0-.55-.45-1-1-1s-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1m-4-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"/>
        </svg>
    );
}

export default IconCrossCircle;

