import './HeaderSignIn.css'
import './HeaderSignInMobile.css'

function HeaderSignIn({isMobile} : {isMobile: boolean}) {
    let className = '';
    if (isMobile) {
        className = 'Mobile'
    }

    return (
        <div className={`HeaderSignIn${className}`}>
            <a className={`HeaderSignIn${className}__registrationA`} href="">Зарегистрироваться</a>
            {!isMobile && <div className='HeaderSignIn__divider'></div>}
            <a className={`HeaderSignIn${className}__signInA`} href='/auth'>Войти</a>
        </div>
    )
}

export default HeaderSignIn;