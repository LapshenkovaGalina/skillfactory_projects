import './HeaderUserInfo.css'
import './HeaderUserInfoMobile.css'

const userAvatar = require('../assets/user-avatar.png');

function HeaderUserInfo({ isMobile }: { isMobile?: boolean }) {
    let className = '';
    if (isMobile) {
        className = 'Mobile'
    }

    const signOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expire');
    }

    return (
        <div className={`HeaderUserInfo${className}`}>
            <div className={`HeaderUserInfo${className}__info`}>
                <div className='info__text'>
                    <span>Алексей А.</span>
                    <a href='/' onClick={signOut}>Выйти</a>
                </div>
                <img className='info__avatar' src={userAvatar} alt='user avatar'></img>
            </div>
        </div>
    )
}

export default HeaderUserInfo;