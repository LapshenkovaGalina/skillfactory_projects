import './SignInBlock.css'

function SignInBlock() {
    return (
        <div className="SignInBlock">
            <a className='SignInBlock__registrationA' href="">Зарегистрироваться</a>
            <div className='SignInBlock__divider'></div>
            <a className="SignInBlock__signInA" href='/auth'>Войти</a>
        </div>
    )
}

export default SignInBlock;