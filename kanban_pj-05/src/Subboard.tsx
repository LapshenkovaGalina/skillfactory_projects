import React, { useState } from 'react';
import './Subboard.css';
// import NewTaskForm from './NewTaskForm';
import DropDownMenu from './DropDownMenu';

function Subboard({title}: {title: string}) {
  const [ btnClicked, setBtnClicked] = useState<number>(0);

  const fakeTasks: string [] = [
    'task0',
    'task1',
    'task2'
  ]

  return (
    <div className="Subboard">
        <div>{title}</div>
        <div className='tasksBlock'>
          {btnClicked === 1 && <DropDownMenu tasks={fakeTasks}/>}
        </div>
        <button className='SubboardBtn' onClick={(event: React.MouseEvent) => setBtnClicked(1)}>+Add card</button>
    </div>
  );
}

export default Subboard;
