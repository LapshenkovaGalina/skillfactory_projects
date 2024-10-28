import React, { useState, useEffect } from 'react';
import './App.css';
import { createSkillux, actionType, reducerType, reducer } from './skillux';

function App() {
  const [storeInterface, setstoreInterface] = useState(createSkillux(reducer));
  const [reload, setReload] = useState(0);

  function unsubscribe() {
    storeInterface.unsubscribe('app');
  }

  useEffect(() =>{
    storeInterface.subscribe('app', ()=> setReload((reload) => reload + 1))
    return () => storeInterface.unsubscribe('app');
  }, [])

  function btn0ClickHandler() {
    const action: actionType = {
      type: "INC"
    };
    storeInterface.dispatch(action);
  }

  function btn1ClickHandler() {
    const action: actionType = {
      type: "SET",
      payload: 10
    };
    storeInterface.dispatch(action);
  } 

  return (
    <div className="App">
      <div>{storeInterface.getState()}</div>
      <button onClick={btn0ClickHandler}>+1</button>
      <button onClick={btn1ClickHandler}>set "10"</button>
      <button onClick={unsubscribe}>unsubscribe</button>
    </div>
  );
}

export default App;
