import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { TaskType } from "./store/backlogSlice";

type ParsedTaskType = {
    ID: string,
    title: string,
    description: string
}

export function getTasksFromLocalStorage(subboardName: string) {
    const json: string = localStorage.getItem(subboardName) || "[]"
    const jsonTasks: Array<ParsedTaskType> = JSON.parse(json)
    const tasks: Array<TaskType> = jsonTasks.map(task => ({
        ID: +task.ID,
        title: task.title,
        description: task.description
    }))

    return tasks;
}

export function LocalStorageSync() {
    const allBacklogTasks = useSelector((state: RootState) => state.backlogTasks.tasks);
    const allReadyTasks = useSelector((state: RootState) => state.readyTasks.tasks);
    const allInProgressTasks = useSelector((state: RootState) => state.inProgressTasks.tasks);
    const allFinishedTasks = useSelector((state: RootState) => state.finishedTasks.tasks);

    function setTasksToLocalStorage(subboardName: string, tasksArr: Array<TaskType>) {
        const json = JSON.stringify(tasksArr);
        localStorage.setItem(subboardName, json);
    }

    useEffect(() => setTasksToLocalStorage('Backlog', allBacklogTasks), [allBacklogTasks]);
    useEffect(() => setTasksToLocalStorage('Ready', allReadyTasks), [allReadyTasks]);
    useEffect(() => setTasksToLocalStorage('In Progress', allInProgressTasks), [allInProgressTasks]);
    useEffect(() => setTasksToLocalStorage('Finished', allFinishedTasks), [allFinishedTasks]);

    return (
        <div></div>
    )
}

export default LocalStorageSync;