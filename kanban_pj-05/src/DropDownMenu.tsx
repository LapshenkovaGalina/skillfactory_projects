import { useRef, useState } from 'react';
import './Task.css';
import './DropDownMenu.css'
import { useDispatch, useSelector } from 'react-redux';
import { addTaskByBoardTitle, getStoreStateByBoardTitle, removeTaskByBoardTitle } from './util';
import { TaskType } from './store/backlogSlice';

type Props = {
    subboardTitle: string
}

function DropDownMenu({ subboardTitle }: Props) {
    const [showSelect, setShowSelect] = useState<boolean>(false);

    let sourceBoardTitle = "Ready";
    switch(subboardTitle) {
        case "Ready":
            sourceBoardTitle = "Backlog";
            break;
        case "In Progress":
            sourceBoardTitle = "Ready";
            break;
        case "Finished":
            sourceBoardTitle = "In Progress";
            break;
    }

    const tasksState = useSelector(getStoreStateByBoardTitle(sourceBoardTitle))
    const dispatch = useDispatch();

    const ref = useRef<HTMLSelectElement>(null)

    function addCardBtnHandler() {
        setShowSelect(!showSelect);

        if (ref.current && tasksState) {
            const task = tasksState.tasks[ref.current.selectedIndex]
            addTaskByBoardTitle(dispatch, subboardTitle, task);
            removeTaskByBoardTitle(dispatch, sourceBoardTitle, task.ID);
        }
    }
    const tasksJSX = tasksState?.tasks.map((task: TaskType) => {
        // addTaskByBoardTitle

        return (
            <option className='dropDownMenu__option' key={task.title}>{task.title}</option>
        )
    })

    return (
        <div className='DropDownMenu'>
            {showSelect === true && 
            <select ref={ref} className='dropDownMenu__select'>
                { tasksJSX }
            </select>}
            <button className='addCardBtn commonTypeBtn' onClick={addCardBtnHandler}>
                {showSelect === true && 'Submit' ||
                showSelect === false && '+ Add card'}
            </button>
        </div>
    );
}

export default DropDownMenu;