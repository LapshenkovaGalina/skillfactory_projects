import React from 'react';
import './AppMain.css';
import Subboard from './Subboard';

function AppMain() {
  return (
      <main className='AppMain'>
        <Subboard title='Backlog'/>
        <Subboard title='Ready'/>
        <Subboard title='In Progress'/>
        <Subboard title='Finished'/>
      </main>
  );
}

export default AppMain;