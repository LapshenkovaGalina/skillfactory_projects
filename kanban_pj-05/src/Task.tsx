import React from 'react';
import './Task.css';
import { useNavigate } from 'react-router-dom';

function Task({ title, route }: { title: string, route: string }) {
    const navigate = useNavigate();
    const goToTaskPage = () => navigate(route);

    return (
        <div className='Task'>
            <div onClick={goToTaskPage}><a className='Task__title'>{title}</a></div>
        </div>
    );
}

export default Task;