import { useContext, useEffect } from "react"
import { AuthContext } from "./App";

function AuthInit() {
    const authInfo = useContext(AuthContext);

    useEffect(() => {
        const storageValue = localStorage.getItem('expire') || 0;
        const expireDate = new Date(storageValue);
        const currTime = new Date();

        if(expireDate.getTime() > currTime.getTime()){
          authInfo?.setAccessToken(localStorage.getItem('accessToken') || null);
          console.log('Auth is ok!'); 
        } else {
            console.log('Auth is not ok!');
        }
    },[]);
            
    return (
        <div></div>
    )
}

export default AuthInit;