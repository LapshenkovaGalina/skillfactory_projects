import React, { useState } from 'react';
import './Task.css';
import './DropDownMenu.css'
import { useDispatch } from 'react-redux';
import { addTask as addTaskToReady} from './store/readySlice';
import { addTask as addTaskToInProgress} from './store/inProgressSlice';
import { addTask as addTaskToFinished} from './store/finishedSlice';
import type { PayloadAction } from '@reduxjs/toolkit'
import { addTaskPayloadType } from './store/backlogSlice';


function DropDownMenu({ tasksArr, subboardTitle }: {tasksArr: string[], subboardTitle: string}) {
const [showSelect, setShowSelect] = useState<boolean>(false);
const [task, setTask] = useState<string>('');

const dispatch = useDispatch();

function addNewTaskToReady(currentSubboardTitle: string){
    let addNewTask: PayloadAction<addTaskPayloadType>;
    if(currentSubboardTitle === 'Ready'){
        addNewTask = addTaskToReady;
    } else if (currentSubboardTitle === 'In Progress'){
        addNewTask = addTaskToInProgress;
    } else if (currentSubboardTitle === 'Finished'){
        addNewTask = addTaskToFinished;
    } else {
        return;
    }
    dispatch(addNewTask)
}
// function addNewTaskToReady(){
//   dispatch(addTaskToReady(
//     {
//       taskID: Date.now(),
//       taskTitle: '',
//       taskDescription: ""
//     })
// )};

// function addNewTaskToInProgress(){
//     dispatch(addTaskToInProgress(
//       {
//         taskID: Date.now(),
//         taskTitle: '',
//         taskDescription: ""
//       })
//   )};

//   function addNewTaskToFinished(){
//     dispatch(addTaskToFinished(
//       {
//         taskID: Date.now(),
//         taskTitle: '',
//         taskDescription: ""
//       })
//   )};


function addCardBtnHandler (){
    if (showSelect === true) {
        if(task !== ''){
          addNewTask();
          setTask('');
        }
        setShowSelect(false)
      } else {
        setShowSelect(true);
      }
}

function selectHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    setTask(event.target.value);
  }

    return (
        <div>
            {showSelect === true && 
            <select className='DropDownMenu' onChange={selectHandler}>
                {tasksArr.map((task: string) => <option>{task}</option>)}
            </select>}
            <button className='addCardBtn' onClick={addCardBtnHandler}>
                {showSelect === true && 'Submit' ||
                showSelect === false && '+ Add card'}
            </button>
        </div>
    );
}

export default DropDownMenu;