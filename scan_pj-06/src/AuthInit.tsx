import { AuthContext } from './App';
import { useContext, useEffect } from 'react';

function AuthInit() {
    const authInfo = useContext(AuthContext);

    useEffect(() => {
        const storageValue = localStorage.getItem('expire') || 0;
        const expireDate = new Date(storageValue);
        const currTime = new Date();

        if (expireDate.getTime() > currTime.getTime()) {
            authInfo?.setAccessToken(localStorage.getItem('accessToken') || null);
        } else {
            console.log('[AuthInit][useEffect] auth is not ok.');
        }
    }, [authInfo]);

    return (
        <></>
    )
}

export default AuthInit;