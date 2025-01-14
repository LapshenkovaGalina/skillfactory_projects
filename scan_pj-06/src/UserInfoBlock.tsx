import UserAccInfo from './UserAccInfo';
import './UserInfoBlock.css'

const userAvatar = require('./assets/user-avatar.png');

function UserInfoBlock() {
    return (
        <div className="UserInfoBlock">
            <div className="UserInfoBlock__userInfo">
                <div className='userInfo__text'>
                    <span>Алексей А.</span>
                    <a href=''>Выйти</a>
                </div>
                <img className='userInfo__userAvatar' src={userAvatar} alt='user avatar'></img>
            </div>
        </div>
    )
}

export default UserInfoBlock;