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
    switch (subboardTitle) {
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
        return (
            <option className='DropDownMenu__option' key={task.title}>{task.title}</option>
        )
    })

    const submitButton = (
        <button className='commonTypeBtn submitBtn' onClick={addCardBtnHandler}>
            Submit
        </button>
    )

    const addButton = (
        <button className='commonTypeBtn addCardBtn' onClick={addCardBtnHandler}
            disabled={tasksState?.tasks.length ? false : true}>
            + Add card
        </button>
    )

    return (
        <div className='DropDownMenu'>
            {showSelect === true &&
                <select ref={ref} className='DropDownMenu__select'>
                    {tasksJSX}
                </select>}
            {showSelect === true ? submitButton : addButton}
        </div>
    );
}

export default DropDownMenu;