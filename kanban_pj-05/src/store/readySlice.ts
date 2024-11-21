import { createSlice } from '@reduxjs/toolkit'
import { StoreState, storeRedusers } from './backlogSlice';
import { getTasksFromLocalStorage } from '../LocalStorageSync';

const initialState: StoreState = {
  tasks: getTasksFromLocalStorage('Ready')
};

export const readySlice = createSlice({
  name: 'readyTasks',
  initialState,
  reducers: storeRedusers, 
})

export const { addTask, deleteTask } = readySlice.actions
export default readySlice.reducer