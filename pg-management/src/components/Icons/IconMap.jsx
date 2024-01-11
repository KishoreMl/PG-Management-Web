import React from "react";
import IconClose from "./IconClose";
import IconEdit from "./IconEdit";
import IconMore from "./IconMore";
import IconList from "./IconList";
import IconGrid from "./IconGrid";
import IconCaretDown from "./IconCaretDown";

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
        case 'caret-down':
            return <IconCaretDown size={props.size} color={props.color} onClick={() => props.onClick()} />;  
        default:
            return "<div> </div>";
    }
}

export default IconMap;
