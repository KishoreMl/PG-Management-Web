import React from "react";

function IconSettings(props)
{
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClick ? () => props.onClick():null}
            width={props.size}
            height={props.size}
            fill={props.color || "curentColor"}
            className="mi-solid mi-settings"
            viewBox="0 0 24 24">
            <path d="M19.31 11.98c0-.32-.03-.63-.07-.94l1.67-1.34c.39-.31.49-.86.24-1.28l-.75-1.28-.74-1.29a1 1 0 0 0-1.23-.43l-1.97.77c-.5-.39-1.06-.72-1.65-.97l-.32-2.07a1 1 0 0 0-.99-.85h-2.98c-.5 0-.92.36-.99.85L9.22 5.2c-.61.25-1.18.58-1.69.98L5.6 5.42c-.46-.18-.99 0-1.23.43l-.74 1.29-.75 1.28a.99.99 0 0 0 .24 1.28L4.74 11c-.04.32-.07.65-.07.98s.03.68.08 1.01l-1.62 1.3c-.39.31-.49.86-.24 1.28l.75 1.28.74 1.29c.25.43.77.61 1.23.43l1.96-.77c.51.38 1.06.71 1.66.95l.32 2.09a1 1 0 0 0 .99.85h2.98c.5 0 .92-.36.99-.85l.32-2.11c.58-.24 1.12-.57 1.62-.94l2 .78c.46.18.99 0 1.23-.43l.74-1.29.75-1.28a.99.99 0 0 0-.24-1.28l-1.67-1.34c.04-.32.07-.64.07-.97Zm-6.62 3.46a3.5 3.5 0 0 1-4.12-4.12 3.51 3.51 0 0 1 2.75-2.75 3.5 3.5 0 0 1 4.12 4.12 3.51 3.51 0 0 1-2.75 2.75"/>
        </svg>
    );
}

export default IconSettings;





