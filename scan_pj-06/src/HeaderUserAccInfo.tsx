import './HeaderUserAccInfo.css'

const userAvatar = require('./assets/user-avatar.png');

function HeaderUserAccInfo({isMobile} : {isMobile: boolean}) {
    let className = '';
    if (isMobile) {
        className = 'mobile'
    }

    const signOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expire');
    }

    return (
        <div className={`HeaderUserAccInfo ${className}`}>
            <div className="HeaderUserAccInfo__userInfo">
                <div className='userInfo__text'>
                    <span>Алексей А.</span>
                    <a href='/' onClick={signOut}>Выйти</a>
                </div>
                <img className='userInfo__userAvatar' src={userAvatar} alt='user avatar'></img>
            </div>
        </div>
    )
}

export default HeaderUserAccInfo;