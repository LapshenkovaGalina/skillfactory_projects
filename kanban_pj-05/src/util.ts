import { RootState } from './store';

import { addTask as addTaskToBacklog} from './store/backlogSlice';
import { addTask as addTaskToReady} from './store/readySlice';
import { addTask as addTaskToInProgress} from './store/inProgressSlice';
import { addTask as addTaskToFinished} from './store/finishedSlice';

import { deleteTask as deleteTaskFromBacklog, TaskType} from './store/backlogSlice';
import { deleteTask as deleteTaskFromReady} from './store/readySlice';
import { deleteTask as deleteTaskFromInProgress} from './store/inProgressSlice';
import { deleteTask as deleteTaskFromFinished} from './store/finishedSlice';

import type { Dispatch } from '@reduxjs/toolkit'

export const getStoreStateByBoardTitle = (title: string) => (state: RootState) => {
    switch(title) {
      case "Backlog":
        return state.backlogTasks;
      case "Ready":
        return state.readyTasks;
      case "In Progress":
        return state.inProgressTasks;
      case "Finished":
        return state.finishedTasks;
    }
}

export const addTaskByBoardTitle = (dispatch: Dispatch, title: string, task: TaskType) => {
    switch(title) {
        case "Backlog":
            return dispatch(addTaskToBacklog(task))
        case "Ready": 
            return dispatch(addTaskToReady(task))
        case "In Progress":
            return dispatch(addTaskToInProgress(task))
        case "Finished":
            return dispatch(addTaskToFinished(task))
    }
}

export const removeTaskByBoardTitle = (dispatch: Dispatch, title: string, taskID: number) => {
    switch(title) {
        case "Backlog":
            return dispatch(deleteTaskFromBacklog(taskID))
        case "Ready": 
            return dispatch(deleteTaskFromReady(taskID))
        case "In Progress":
            return dispatch(deleteTaskFromInProgress(taskID))
        case "Finished":
            return dispatch(deleteTaskFromFinished(taskID))
    }
}
