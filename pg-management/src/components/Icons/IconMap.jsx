import React from "react";
import IconClose from "./IconClose";
import IconEdit from "./IconEdit";
import IconMore from "./IconMore";
import IconList from "./IconList";
import IconGrid from "./IconGrid";

function IconMap(props) {
    switch (props.icon)
    {
        case 'close':
            return <IconClose size={props.size} color={props.color} onClick={() => props.onClick()} />;
        case 'edit':
            return <IconEdit size={props.size} color={props.color} onClick={() => props.onClick()} />;
        case 'more':
            return <IconMore size={props.size} color={props.color} onClick={() => props.onClick()} />;
        case 'list':
            return <IconList size={props.size} color={props.color} onClick={() => props.onClick()} />;
        case 'grid':
            return <IconGrid size={props.size} color={props.color} onClick={() => props.onClick()} />;          
    }
}

export default IconMap;
