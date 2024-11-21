import { createSlice } from '@reduxjs/toolkit'
import { StoreState, storeRedusers } from './backlogSlice';
import { getTasksFromLocalStorage } from '../LocalStorageSync';

const initialState: StoreState = {
    tasks: getTasksFromLocalStorage('Finished')
  };

export const finishedSlice = createSlice({
    name: 'finishedTasks',
    initialState,
    reducers: storeRedusers,
  })

export const { addTask, deleteTask } = finishedSlice.actions
export default finishedSlice.reducer