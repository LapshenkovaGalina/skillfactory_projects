import { createSlice } from '@reduxjs/toolkit'
import { StoreState, storeRedusers } from './backlogSlice';

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
