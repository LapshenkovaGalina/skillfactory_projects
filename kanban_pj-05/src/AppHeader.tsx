import { useState } from 'react';
import './AppHeader.css';
import Modal from './Modal';

const userAvatar = require('./assets/user-avatar.png');
const arrowDown = require('./assets/arrow-down.png');

function AppHeader() {
  const [showModal, setShowModal] = useState<boolean>(false);

  function userAvatarBtnHandler() {
    if (showModal === false) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }

  const userAvatarArrow = showModal ? <img className='AppHeader__arrowDown' src={arrowDown} style={{ transform: 'rotate(180deg)' }}></img>
    : <img className='AppHeader__arrowDown' src={arrowDown}></img>;


  return (
    <header className='AppHeader'>
      <h1 className='AppHeader__h1'>Kanban Board</h1>
      <div className='AppHeader__rightPart'>
        <div className='AppHeader__userAvatarWrapper'>
          <button className='AppHeader__userAvatarBtn' onClick={userAvatarBtnHandler}>
            <img className='AppHeader__userAvatar' src={userAvatar}></img>
          </button>
        </div>
        {userAvatarArrow}
        {showModal === true && <Modal />}
      </div>

    </header>
  );
}

export default AppHeader;