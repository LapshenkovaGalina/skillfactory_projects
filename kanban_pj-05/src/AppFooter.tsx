import './AppFooter.css';
import { useSelector } from 'react-redux';
import { getStoreStateByBoardTitle } from './util';

function AppFooter() {
  const backlogTasks = useSelector(getStoreStateByBoardTitle('Backlog'));
  const finishedTasks = useSelector(getStoreStateByBoardTitle('Finished'));

  return (
    <footer className='AppFooter'>
      <div className='AppFooter__leftPart'>
        <span>Active tasks: {backlogTasks?.tasks.length}</span>
        <span>Finished tasks: {finishedTasks?.tasks.length}</span>
      </div>
      <div className='AppFooter__rightPart'>
        <span>Kanban board by G.I. Lapshenkova, 2024</span>
      </div>
    </footer>
  );
}

export default AppFooter;