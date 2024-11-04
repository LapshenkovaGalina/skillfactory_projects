import React from 'react';
import './Task.css';
import './DropDownMenu.css'

interface DropDownMenuProps {
    tasks: string[]
}

function DropDownMenu(tasksArr: DropDownMenuProps) {
    return (
        <select className='DropDownMenu'>
            {tasksArr.tasks.map((task: string) => <option>{task}</option>)}
        </select>
    );
}

export default DropDownMenu;