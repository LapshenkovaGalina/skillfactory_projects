import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTaskByBoardTitle, removeTaskByBoardTitle } from "./util";

type ParsedTaskType = {
    ID: string,
    title: string,
    description: string
}

export function LocalStorageSync() {
    const dispatch = useDispatch();

    function syncBoard(boardName: string) {
        const json: string = localStorage.getItem(boardName) || "[]"
        const tasks: Array<ParsedTaskType> = JSON.parse(json)
        console.log(tasks);
        tasks.map(task => addTaskByBoardTitle(dispatch, boardName, {
            ID: +task.ID,
            title: task.title,
            description: task.description
        }))

        const clean = () => tasks.map(task => removeTaskByBoardTitle(dispatch, boardName, +task.ID))
        return clean as () => void
    }

    useEffect(() => syncBoard("Backlog"), []);
    useEffect(() => syncBoard("Ready"), []);
    useEffect(() => syncBoard("In Progress"), []);
    useEffect(() => syncBoard("Finished"), []);

    return (
        <div></div>
    )
}

export default LocalStorageSync;