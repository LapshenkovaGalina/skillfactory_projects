import { createSlice } from '@reduxjs/toolkit'
import { StoreState, storeRedusers } from './backlogSlice';

const initialState: StoreState = {
    tasks: []
  };

export const finishedSlice = createSlice({
    name: 'finishedTasks',
    initialState,
    reducers: storeRedusers,
  })

export const { addTask, deleteTask } = finishedSlice.actions
export default finishedSlice.reducer