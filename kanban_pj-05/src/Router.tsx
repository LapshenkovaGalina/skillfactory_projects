import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskPage from "./TaskPage";
import { TaskType } from "./store/backlogSlice";
import App from "./App";

export function Router() {
    const authInfo = useContext(AuthContext);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path="/task/:subboardTitle/:taskID" element={<TaskPage />} />
            </Routes>
        </BrowserRouter>
    )
}