import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Task = {
    ID: number,
    title: string,
    description: string
};
export type StoreState = {
  tasks: Array<Task>
};

export type addTaskPayloadType = {
  taskID: number,
  taskTitle: string,
  taskDescription: string
};

export const storeRedusers = {
  addTask: (state: StoreState, action: PayloadAction<addTaskPayloadType>) => {
      const { taskID, taskTitle, taskDescription } = action.payload;
      const task : Task = {ID: taskID, title: taskTitle, description: taskDescription};
      state.tasks.push(task)
  },
  deleteTask: (state: StoreState, action: PayloadAction<{taskID: number}>) => {
      const { taskID } = action.payload;
      state.tasks = state.tasks.filter((task: Task) => task.ID === taskID);
  },
}

const initialState: StoreState = {
  tasks: []
};

export const backlogSlice = createSlice({
  name: 'backlogTasks',
  initialState,
  reducers: storeRedusers,
})

export const { addTask, deleteTask } = backlogSlice.actions

export default backlogSlice.reducer