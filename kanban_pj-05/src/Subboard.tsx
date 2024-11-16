import React, { useState } from 'react';
import './Subboard.css';
import DropDownMenu from './DropDownMenu';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import { Task } from './store/backlogSlice';
import TaskBlock from './Task';

function Subboard({title}: {title: string}) {
const [ btnClicked, setBtnClicked] = useState<number>(0);
const allBacklogTasks = useSelector((state: RootState) => state.backlogTasks);
const allReadyTasks = useSelector((state: RootState) => state.readyTasks);
const allInProgressTasks = useSelector((state: RootState) => state.inProgressTasks);
const allFinishedTasks = useSelector((state: RootState) => state.finishedTasks);

function tasksStoreSelectFunc (currentSubboardTitle: string){
  if(currentSubboardTitle === 'Ready'){
    return allBacklogTasks.tasks.map((task: Task) => task.title);
  } else if (currentSubboardTitle === 'In Progress'){
    return allReadyTasks.tasks.map((task: Task) => task.title);
  } else if (currentSubboardTitle === 'Finished'){
    return allInProgressTasks.tasks.map((task: Task) => task.title);
  } else {
    return [];
  }
}

  return (
    <div className="Subboard">
        <div>{title}</div>
        <div className='tasksBlock'>
          {tasksStoreSelectFunc(title).map((task: string) => <TaskBlock title={task}></TaskBlock>)}
        </div>
        <DropDownMenu tasksArr={tasksStoreSelectFunc(title)} 
                      subboardTitle={title}/>
    </div>
  );
}

export default Subboard;
