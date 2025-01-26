import './HeaderAuthCheck.css';

import { useContext } from 'react';
import { AuthContext } from '../App';
import HeaderSignIn from './HeaderSignIn';
import UserPlanInfo from './UserPlanInfo';
import HeaderUserInfo from './HeaderUserInfo';

export function HeaderAuthCheckDesktop() {
    const authInfo = useContext(AuthContext);
    const loggedIn = !!authInfo?.accessToken;

    return (
        <div className='HeaderAuthCheck'>
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

export function HeaderAuthCheckMobile({ menuIsOpened }: { menuIsOpened: boolean }) {
    const authInfo = useContext(AuthContext);
    const loggedIn = !!authInfo?.accessToken;

    return (
        <div className='HeaderAuthCheck'>
            {loggedIn ?
                <>
                    {!menuIsOpened && <UserPlanInfo />}
                    {menuIsOpened && <HeaderUserInfo isMobile={true} />}
                </>
                : <>
                    {menuIsOpened && <HeaderSignIn isMobile={true} />}
                </>
            }
        </div>
    )
}