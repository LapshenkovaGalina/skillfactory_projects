import { createSlice } from '@reduxjs/toolkit'
import { StoreState, storeRedusers } from './backlogSlice';
import { getTasksFromLocalStorage } from '../LocalStorageSync';

const initialState: StoreState = {
    tasks: getTasksFromLocalStorage('In Progress')
  };

export const inProgressSlice = createSlice({
    name: 'inProgressTasks',
    initialState,
    reducers: storeRedusers,
  })

export const { addTask, deleteTask } = inProgressSlice.actions
export default inProgressSlice.reducer
