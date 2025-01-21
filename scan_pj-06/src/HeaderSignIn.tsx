import './HeaderSignIn.css'
import './HeaderSignInMobile.css'

function HeaderSignIn({isMobile} : {isMobile: boolean}) {
    let className = '';
    if (isMobile) {
        className = 'mobile'
    }

    return (
        <div className={`HeaderSignIn ${className}`}>
            <a className='HeaderSignIn__registrationA' href="">Зарегистрироваться</a>
            <div className='HeaderSignIn__divider'></div>
            <a className="HeaderSignIn__signInA" href='/auth'>Войти</a>
        </div>
    )
}

export default HeaderSignIn;