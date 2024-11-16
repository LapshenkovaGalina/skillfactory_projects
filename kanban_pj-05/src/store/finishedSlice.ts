import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { StoreState, Task, storeRedusers } from './backlogSlice';

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