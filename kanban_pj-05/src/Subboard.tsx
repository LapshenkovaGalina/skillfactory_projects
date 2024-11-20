import './Subboard.css';
import './button.css';
import DropDownMenu from './DropDownMenu';
import { useSelector } from 'react-redux';
import { getStoreStateByBoardTitle } from "./util"
import Task from './Task';

type SubboardProps = {
  title: string
}
function Subboard({ title }: SubboardProps) {
  const currentSubboardState = useSelector(getStoreStateByBoardTitle(title));

  const tasksJSX = currentSubboardState?.tasks.map((task) => {
    return (
      <Task key={task.ID} route={`/task/${title}/${task.ID}`} title={task.title}/>
    )
  })

  return (
    <div className="Subboard">
        <div>{title}</div>
        <div className='tasksBlock'>
          { tasksJSX }
        </div>
        <DropDownMenu subboardTitle={title}/>
    </div>
  );
}

export default Subboard;
