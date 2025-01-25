import { AuthContext } from "./App";
import MainPage from "./MainPage/MainPage";
import AuthPage from "./AuthPage/AuthPage";
import SearchPage from "./SearchPage/SearchPage";
import ResultsPage from "./ResultsPage/ResultsPage";
import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function GoToAuth() {
    const navigate = useNavigate();
    useEffect(() => void navigate('/'))
    return (<></>)
}

export function Router() {
    const authInfo = useContext(AuthContext);
    const loggedIn = !!authInfo?.accessToken;

    if (!loggedIn) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/auth' element={<AuthPage />} />
                    <Route path='/articlesSearch' element={<GoToAuth />} />
                    <Route path='/searchResults' element={<GoToAuth />} />
                </Routes>
            </BrowserRouter>
        )
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/auth' element={<AuthPage />} />
                    <Route path='/articlesSearch' element={<SearchPage />} />
                    <Route path='/searchResults/:limit/:startDateJSON/:endDateJSON/:INN/:tonality/:maxFullness/:inBusinessNews/:onlyMainRole/:onlyWithRiskFactors/:excludeTechNews/:excludeAnnouncements/:excludeDigests' element={<ResultsPage />} />
                </Routes>
            </BrowserRouter>
        )
    }
}