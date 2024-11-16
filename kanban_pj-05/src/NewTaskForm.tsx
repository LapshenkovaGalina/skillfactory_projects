import React, { useState } from 'react';
import './NewTaskForm.css';
import { useDispatch } from 'react-redux';
import { addTask as addTaskToBacklog } from './store/backlogSlice';

function NewTaskForm() {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const dispatch = useDispatch();

  function addNewTask(){
    dispatch(addTaskToBacklog(
      {
        taskID: Date.now(),
        taskTitle: inputValue,
        taskDescription: ""
      })
  )};

  function addCardBtnHandler() {
    if (showInput === true) {
      if(inputValue !== ''){
        addNewTask();
        setInputValue('');
      }
      setShowInput(false)
    } else {
      setShowInput(true);
    }
  }

  function inputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <div className="NewTaskForm">
      {showInput === true && <input
        onChange={inputHandler} />}
      <button className='addCardBtn' onClick={addCardBtnHandler}>
        {showInput === true && 'Submit' ||
          showInput === false && '+ Add card'}
      </button>
    </div>
  );
}

export default NewTaskForm;