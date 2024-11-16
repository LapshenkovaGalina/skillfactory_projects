import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { StoreState, Task, storeRedusers } from './backlogSlice';

const initialState: StoreState = {
  tasks: []
};

const readySlice = createSlice({
  name: 'readyTasks',
  initialState,
  reducers: storeRedusers, 
})

export const { addTask, deleteTask } = readySlice.actions
export default readySlice.reducer