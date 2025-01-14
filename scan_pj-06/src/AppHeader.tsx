import './AppHeader.css';
import AuthBlock from './AuthBlock';

const SCANlogo = require('./assets/SCAN-logo.png');
const burgerMenu = require('./assets/burger-button_img.png');

function AppHeader() {
    return (
        <header className='AppHeader'>
            <img className='AppHeader__logo' src={SCANlogo} height={'50%'} width={'auto'} alt='Avatar'></img>
            <div className='AppHeader__rightBlock'>
                <nav className='AppHeader__nav'>
                    <a href='/'>Главная</a>
                    <a href='/'>Тарифы</a>
                    <a href='/'>FAQ</a>
                </nav>
                <AuthBlock/>
            </div>
            <img className='AppHeader__burgerMenu' src={burgerMenu} alt='MENU'></img>
        </header>
    )
}

export default AppHeader;