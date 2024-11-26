import './TaskPage.css';
import './AppHeader.css';
import './AppFooter.css';
import './button.css';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskByBoardTitle, getStoreStateByBoardTitle, removeTaskByBoardTitle } from './util';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { useEffect, useRef, useState } from 'react';
import { TaskType } from './store/backlogSlice';

type Params = { subboardTitle: string, taskID: string }

function TaskPage() {
    const params = useParams<Params>() as Params;
    const { subboardTitle, taskID } = params;
    const [contentEditEnabled, setContentEditEnabled] = useState<boolean>(false);
    const [description, setDescription] = useState<string | null>(null);

    const ref = useRef<HTMLTextAreaElement>(null);

    const dispatch = useDispatch();

    const currentSubboardTasks = useSelector(getStoreStateByBoardTitle(subboardTitle));

    const currentTask = currentSubboardTasks?.tasks.find(task => task.ID === +taskID);

    useEffect(() => {
        if((description === null) && (!!currentTask)) {
            setDescription(currentTask.description)
        }
    }, [currentTask, description])

    if (!currentTask)
        return (<div>ERROR</div>)

    if (!currentSubboardTasks)
        return (<div>ERROR</div>)
    
    function editTaskDescriptionOnState(currentSubboard: string, task: TaskType, newDescription: string) {
        const editedTask: TaskType = {
            ID: task.ID,
            title: task.title,
            description: newDescription
        }

        removeTaskByBoardTitle(dispatch, currentSubboard, task.ID);
        addTaskByBoardTitle(dispatch, currentSubboard, editedTask);
    }

    const editBtnHandler = (task: TaskType) => () => {
        if (ref.current === null) return;

        if (contentEditEnabled === true && !!description) {
            setContentEditEnabled(false);
            editTaskDescriptionOnState(subboardTitle, task, description);
        } else {
            setContentEditEnabled(true);
        }
    }

    const submitButton = (
        <button className='commonTypeBtn submitBtn' onClick={editBtnHandler(currentTask)}>
            Submit
        </button>
    )

    const editButton = (
        <button className='commonTypeBtn editBtn' onClick={editBtnHandler(currentTask)}>
            Edit
        </button>
    )

    return (
        <div className='TaskPage'>
            <AppHeader />
            <main className='TaskPageMain'>
                <div className='TaskPageMain__taskInfo'>
                    <div className='TaskPageMain__titleBlock'>
                        <div className='TaskPageMain__title'>{currentTask?.title}</div>
                        <a href='/'>
                            <div className='TaskPageMain__exitIconSVGcontainer'>
                                <svg width="24px" height="24px" transform='scale(1.5)'><path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
                                </svg>
                            </div>
                        </a>
                    </div>
                    <form className='TaskPageMain__descriptionWrapper'>
                        <textarea className='TaskPageMain__description'
                            ref={ref}
                            disabled={!contentEditEnabled}
                            value={description || ""}
                            placeholder='This task has no description'
                            onChange={e => setDescription(e.target.value)}>
                        </textarea>
                    </form>
                    {contentEditEnabled === true ? submitButton : editButton}
                </div>
            </main>
            <AppFooter />
        </div>
    );
}

export default TaskPage;