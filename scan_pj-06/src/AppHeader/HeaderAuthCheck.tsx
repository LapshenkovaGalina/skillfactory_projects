import './HeaderAuthCheck.css'

import { useContext } from "react";
import { AuthContext } from "../App";
import HeaderSignIn from "./HeaderSignIn";
import UserPlanInfo from "./UserPlanInfo";
import HeaderUserInfo from './HeaderUserInfo';

export function HeaderAuthCheckDesktop() {
    const authInfo = useContext(AuthContext);
    const loggedIn = !!authInfo?.accessToken;

    return (
        <div className="HeaderAuthCheck">
            {loggedIn ?
                <>
                    <UserPlanInfo />
                    <HeaderUserInfo isMobile={false} />
                </>
                : <HeaderSignIn isMobile={false} />
            }
        </div>
    )
}

export function HeaderAuthCheckMobile({ isMenuOpened }: { isMenuOpened: boolean }) {
    const authInfo = useContext(AuthContext);
    const loggedIn = !!authInfo?.accessToken;

    return (
        <div className="HeaderAuthCheck">
            {loggedIn ?
                <>
                    {!isMenuOpened && <UserPlanInfo />}
                    {isMenuOpened && <HeaderUserInfo isMobile={true} />}
                </>
                : <>
                    {isMenuOpened && <HeaderSignIn isMobile={true} />}
                </>
            }
        </div>
    )
}