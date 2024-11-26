import './AppMain.css';
import Subboard from './Subboard';
import BacklogSubboard from './BacklogSubboard';

function AppMain() {
  return (
    <main className='AppMain'>
      <BacklogSubboard />
      <Subboard title='Ready' />
      <Subboard title='In Progress' />
      <Subboard title='Finished' />
    </main>
  );
}

export default AppMain;