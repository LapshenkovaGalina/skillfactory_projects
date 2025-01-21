import './AuthPage.css'
import Auth from "./Auth";

const authPageImg = require('./assets/auth-page-img.png');
const authDecorImg = require('./assets/auth-component-decor.png');

function AuthPage() {
    return (
        <div className="AuthPage">
            <main className="AuthPage__main AppMain">
                <div className="AuthPage__leftBlock">
                    <h1 className='leftBlock__h1'>Для оформления подписки<br></br> 
                    на тариф, необходимо<br></br>
                    авторизоваться.
                    </h1>
                    <img className="leftBlock__img" src={authPageImg} alt=''></img>
                </div>
                <div className="AuthPage__rightBlock">
                    <img className='AuthPage__decorImg' src={authDecorImg} alt=''></img>
                    <Auth/>
                    <img className="rightBlock__img" src={authPageImg} alt=''></img>
                </div>
            </main>
        </div>
    )
}

export default AuthPage;