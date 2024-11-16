import { useSelector } from "react-redux";

function ModalTaskList() {
    const tasksObjects = useSelector(store);

    const renderTask = (task) => {
        return (
            <div onClick={}>
                {task.title}
            </div>
        )
    } 

    return (
        <div>
            {tasksObjects.map(renderTask)}
        </div>
    )

}