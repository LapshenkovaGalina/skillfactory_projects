import './HeaderAuthCheck.css'
import { useContext } from "react";
import { AuthContext } from "./App";
import HeaderUserAccInfo from "./HeaderUserAccInfo";
import HeaderSignIn from "./HeaderSignIn";
import UserAccInfo from "./UserPlanInfo";

function HeaderAuthCheck() {
    const authInfo = useContext(AuthContext);
    const loggedIn = !!authInfo?.accessToken;

    if(loggedIn) {
        return (
            <div className="HeaderAuthCheck">
                <UserAccInfo/>
                <HeaderUserAccInfo isMobile={window.screen.width <= 425? true : false}/>
            </div>
        )
    } else {
        return (
            <div className="HeaderAuthCheck">
                <HeaderSignIn isMobile={window.screen.width <= 425? true : false}/>
            </div>
        )
    }
}

export default HeaderAuthCheck;