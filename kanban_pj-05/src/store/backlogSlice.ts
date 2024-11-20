import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TaskType = {
    ID: number,
    title: string,
    description: string
};
export type StoreState = {
  tasks: Array<TaskType>
};

export const storeRedusers = {
  addTask: (state: StoreState, action: PayloadAction<TaskType>) => {
      state.tasks.push(action.payload)
  },
  deleteTask: (state: StoreState, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task: TaskType) => task.ID !== action.payload);
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