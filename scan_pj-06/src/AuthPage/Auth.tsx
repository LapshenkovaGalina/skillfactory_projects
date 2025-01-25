import './Auth.css';
import '../button.css';

import { AuthContext } from '../App';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const googleAuthImg = require('../assets/google-auth-img.png');
const facebookAuthImg = require('../assets/facebook-auth-img.png');
const yandexAuthImg = require('../assets/yandex-auth-img.png');

function Auth() {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [authErrorMsg, setAuthErrorMsg] = useState('');

    const authInfo = useContext(AuthContext);

    const navigate = useNavigate();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (/\s/.exec(value) === null) {
            setLogin(value)
        }
    }

    async function authAttempt(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            let response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    password: pass
                })
            });

            let result = await response.json();

            if (!result.accessToken) {
                if (result.message) setAuthErrorMsg(result.message);
                else throw new Error('mes');
            } else {
                setAuthErrorMsg('');
                authInfo?.setAccessToken(result.accessToken);

                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('expire', result.expire);

                navigate('/');
            }

        } catch (e) {
            console.log(e);
            setAuthErrorMsg('');
        }
    }

    return (
        <div className='Auth'>
            <div className='Auth__head'>
                <div className='head__block active'><a href='/auth'>Войти</a></div>
                <div className='head__block'><a href='/auth'>Зарегистрироваться</a></div>
            </div>
            {authErrorMsg !== '' && <span className='authErrorMsg'>{authErrorMsg}</span>}
            <form className='Auth__form' onSubmit={authAttempt}>
                <legend className='form__legend'>Логин или номер телефона:</legend>
                <input className='form__input' value={login} onChange={onChange}></input>
                <legend className='form__legend'>Пароль:</legend>
                <input className='form__input' type='password' onChange={event => setPass(event.target.value)}></input>
                <button type='submit'
                    disabled={!login || !pass}
                    className='commonTypeBtn signInBtn'>
                    Войти</button>
            </form>
            <a className='Auth__resetPass' href='/auth'>Восстановить пароль</a>
            <div className='Auth__altAuth'>
                <span>Войти через:</span>
                <div className='altAuth__variants'>
                    <a href='/auth'><img src={googleAuthImg} alt=''></img></a>
                    <a href='/auth'><img src={facebookAuthImg} alt=''></img></a>
                    <a href='/auth'><img src={yandexAuthImg} alt=''></img></a>
                </div>
            </div>
        </div>
    )
}

export default Auth;