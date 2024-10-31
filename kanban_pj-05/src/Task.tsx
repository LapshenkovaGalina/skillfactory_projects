import React from 'react';
import './Task.css';

function Task({title}:{title: string}) {
    return (
        <div className='Task'>
            <div>{title}</div>
        </div>
    );
}

export default Task;