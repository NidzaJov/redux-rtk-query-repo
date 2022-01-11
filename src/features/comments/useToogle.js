import { useState } from 'react';

export const useToogle =(defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const toggleValue = (value) => {
        setValue(currentValue => 
            typeof(value) === "boolean" ? value : !currentValue
        )
    }

    return [value, toggleValue]
}