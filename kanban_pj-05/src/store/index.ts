import { configureStore } from '@reduxjs/toolkit'
import backlogTasksReducer from './backlogSlice'
import readyTasksReducer from './readySlice'
import inProgressTasksReducer from './inProgressSlice'
import finishedTasksReducer from './finishedSlice'

export const store = configureStore({
  reducer: {
    backlogTasks: backlogTasksReducer,
    readyTasks: readyTasksReducer,
    inProgressTasks: inProgressTasksReducer,
    finishedTasks: finishedTasksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;