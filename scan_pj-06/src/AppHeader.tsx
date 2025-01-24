import './AppHeader.css';
import { useState } from 'react';
import { HeaderAuthCheckDesktop, HeaderAuthCheckMobile } from './HeaderAuthCheck';
import HeaderNav from './HeaderNav';
import HeaderUserInfo from './HeaderUserInfo';

const SCANlogo = require('./assets/SCAN-logo.png');
const MobileMenuSCANlogo = require('./assets/SCAN-logo_footer.png');
const burgerMenuImg = require('./assets/burger-menu-button_img.png');
const burgerMenuExitImg = require('./assets/burger-menu_exit-button_img.png');

function AppHeaderDesktop() {
    console.log("AppHeaderDesktop");
    return (
        <header className='AppHeader'>
            <a href=''><img className='AppHeader__logo' src={SCANlogo} height={'50%'} width={'auto'} alt='Avatar'></img></a>
            <div className='AppHeader__rightBlock'>
                <HeaderNav isMobile={false}/>
                <HeaderAuthCheckDesktop />
            </div>
        </header>
    )
}

function AppHeader() {
    console.log("AppHeader");
    const isMobile = window.screen.width <= 425 ? true : false;

    if (isMobile) {
        return <AppHeaderMobile />
    }  else {
        return <AppHeaderDesktop />
    }
}

function AppHeaderMobile() {
    const [opened, setOpened] = useState(false);
    console.log("AppHeaderMobile");

    const toggleOpened = () => {
        console.log("on burger menu click");
        setOpened(!opened);
    }

    return !opened ? (
            <header className='AppHeader'>
                <a className='AppHeader__mainPageRef' href=''><img className='AppHeader__logo' src={SCANlogo} height={'50%'} width={'auto'} alt='SCANlogo'></img></a>
                <div className='AppHeader__rightBlock'>
                    <HeaderAuthCheckMobile isMenuOpened={false}/>
                </div>
                <img className='AppHeader__burgerBtn' onClick={toggleOpened} src={burgerMenuImg} alt='MENU'></img>
            </header>
        )
        : (
            <header className='AppHeader burgerMenuOpened'>
                <div className='AppHeader__burgerMenu'>
                    <div className='burgerMenu__top'>
                        <a className='burgerMenu__mainPageRef' href=''><img className='AppHeader__logo' src={MobileMenuSCANlogo} height={'50%'} width={'auto'} alt='SCANlogo'></img></a>
                        <img className='burgerMenu__burgerMenuExit' onClick={toggleOpened} src={burgerMenuExitImg} alt='EXIT'></img>
                    </div>
                    <HeaderNav isMobile={true} />
                    <HeaderAuthCheckMobile isMenuOpened={true} /> 
                </div>
            </header>
        )
}

export default AppHeader;