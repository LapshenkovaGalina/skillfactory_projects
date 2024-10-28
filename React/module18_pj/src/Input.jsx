import React, { useState } from "react";

function Input() {
const [isHover, setHover] = useState(false);
const [inputValue, saveInput] = useState('');

const handleHover = (e) => {
    setHover(true)
}
 const handleBlur = (e) => {
    setHover(false)
}
 const handleChange = (e) => {
    saveInput(e.target.value)
}
return (
    <div>
        <input
            defaultValue={inputValue}
            onFocus={handleHover}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        {
            isHover ?
            <div>Можно вводить данные</div> :
            <div>вы ввели {inputValue}</div>
        }
    </div>);    
}

export default Input;

