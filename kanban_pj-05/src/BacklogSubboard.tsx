import './Subboard.css';
import type { RootState } from './store/index'
import NewTaskForm from './NewTaskForm';
import { useSelector } from 'react-redux';
import { TaskType } from './store/backlogSlice';
import Task from './Task';

function BacklogSubboard() {
  const backlogTasks = useSelector((state: RootState) => state.backlogTasks);

  return (
    <div className="BacklogSubboard Subboard">
        <div>Backlog</div>
        <div className='tasksBlock'>
          {backlogTasks.tasks.map((task: TaskType) => <Task key={task.ID} route={`/task/${'Backlog'}/${task.ID}`} title={task.title}></Task>)}
        </div>
        <NewTaskForm/>
    </div>
  );
}

export default BacklogSubboard;