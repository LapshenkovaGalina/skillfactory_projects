import './AuthBlock.css'
import { useContext } from "react";
import { AuthContext } from "./App";
import UserInfoBlock from "./UserInfoBlock";
import SignInBlock from "./SignInBlock";
import UserAccInfo from "./UserAccInfo";

function AuthBlock() {
    const authInfo = useContext(AuthContext);
    const loggedIn = !!authInfo?.accessToken;

    if(loggedIn) {
        return (
            <div className="AuthBlock">
                <UserAccInfo/>
                <UserInfoBlock/>
            </div>
        )
    } else {
        return (
            <div className="AuthBlock">
                <SignInBlock/>
            </div>
        )
    }
}

export default AuthBlock;