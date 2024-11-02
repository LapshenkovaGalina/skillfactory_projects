import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Task = {
    ID: number,
    title: string,
    description: string
};
type StoreState = [Task];

const initialState: [] = [];

export const backlogSlice = createSlice({
  name: 'backlogTasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{taskId: number, taskTitle: string, taskDescription: string}>) => {
        const { taskId, taskTitle, taskDescription } = action.payload;
        [...state, {taskId: taskId, title: taskTitle, description: taskDescription}];  
    },
    editing: (state, action: PayloadAction<{taskId: number, taskDescription: string}>) => {
        const { taskId, taskDescription } = action.payload;
        [...state, {Id: taskId, description: taskDescription}];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTask, editing } = backlogSlice.actions

export default backlogSlice.reducer