import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { StoreState, Task, storeRedusers } from './backlogSlice';

const initialState: StoreState = {
    tasks: []
  };

export const inProgressSlice = createSlice({
    name: 'inProgressTasks',
    initialState,
    reducers: storeRedusers,
  })

export const { addTask, deleteTask } = inProgressSlice.actions
export default inProgressSlice.reducer
