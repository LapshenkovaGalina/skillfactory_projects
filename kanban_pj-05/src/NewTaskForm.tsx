import React, { useState } from 'react';
import './NewTaskForm.css';
import './button.css';
import { useDispatch } from 'react-redux';
import { addTask as addTaskToBacklog } from './store/backlogSlice';

function NewTaskForm() {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const dispatch = useDispatch();

  function addNewTask() {
    dispatch(addTaskToBacklog(
      {
        ID: Date.now(),
        title: inputValue,
        description: ""
      })
    )
  };

  function addCardBtnHandler() {
    if (showInput === true) {
      if (inputValue !== '') {
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

  const submitButton = (
    <button className='commonTypeBtn submitBtn' onClick={addCardBtnHandler}>
      Submit
    </button>
  )

  const addButton = (
    <button className='commonTypeBtn addCardBtn' onClick={addCardBtnHandler}>
      + Add card
    </button>
  )

  return (
    <div className="NewTaskForm">
      {showInput === true && <input className='NewTaskForm__input'
        onChange={inputHandler} autoFocus />}
      {showInput === true ? submitButton : addButton}
    </div>
  );
}

export default NewTaskForm;