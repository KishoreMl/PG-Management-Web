import TextInput from "./TextInput";
import RadioButtons from "./RadioButton";
import CheckBox from "./CheckBox";
import Dropdown from "./Dropdown";
import NumberInput from "./NumberInput";

export function getInputType(field) {
    switch (field.type) {
            case 'text':
                return <TextInput field={field} />;
            case 'radio':
                return <RadioButtons field={field} />;
            case 'checkbox':
                return <CheckBox field={field} />;
            case 'dropdown':
                return <Dropdown field={field} />;
            case 'number':
                return <NumberInput field={field} />;
            default:
                return <div></div>
        }
}