import './TaskPage.css';
import './button.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getStoreStateByBoardTitle } from './util';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { useState } from 'react';

type Params = { subboardTitle: string, taskID: string }

function TaskPage() {
   const params = useParams<Params>() as Params;
    const { subboardTitle, taskID } = params;
    const [ contentEditable, setContentEditable ] = useState<boolean>(false);
    const currentSubboardTasks = useSelector(getStoreStateByBoardTitle(subboardTitle));
    const currentTask = currentSubboardTasks?.tasks.find(task => task.ID === +taskID);
    console.log(params);
    function editBtnHandler() {
        if(contentEditable === true){
            setContentEditable(false)
        } else {
            setContentEditable(true)
        }
    }

    const submitButton = (
        <button className='commonTypeBtn submitBtn' onClick={editBtnHandler}>
            Submit
        </button>
    )

    const editButton = (
        <button className='commonTypeBtn editBtn' onClick={editBtnHandler}>
            Edit
        </button>
    )

    return (
        <div className='TaskPage'>
            <AppHeader />
            <main className='TaskPageMain'>
                <div className='taskInfo'>
                    <span className='taskInfo__title'>{currentTask?.title}</span>
                    <div contentEditable={contentEditable} className='taskInfo__description'>
                        {currentTask?.description || ""}
                    </div>
                    {contentEditable === true ? submitButton : editButton}
                </div>
            </main>
            <AppFooter />
        </div>
    );
}

export default TaskPage;