import React from "react";
import IconClose from "./IconClose";
import IconEdit from "./IconEdit";
import IconMore from "./IconMore";

function IconMap(props) {
    switch (props.icon)
    {
        case 'close':
            return <IconClose size={props.size} color={props.color} onClick={() => props.onClick()} />;
        case 'edit':
            return <IconEdit size={props.size} color={props.color} onClick={() => props.onClick()} />;
        case 'more':
            return <IconMore size={props.size} color={props.color} onClick={() => props.onClick()} />;
            
    }
}

export default IconMap;
