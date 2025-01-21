import { useState } from 'react';
import './AppHeader.css';
import HeaderAuthCheck from './HeaderAuthCheck';
import HeaderNav from './HeaderNav';
import HeaderUserAccInfo from './HeaderUserAccInfo';

const SCANlogo = require('./assets/SCAN-logo.png');
const burgerMenu = require('./assets/burger-button_img.png');

function AppHeaderDesktop() {
    console.log("AppHeaderDesktop");
    return (
        <header className='AppHeader'>
            <a href=''><img className='AppHeader__logo' src={SCANlogo} height={'50%'} width={'auto'} alt='Avatar'></img></a>
            <div className='AppHeader__rightBlock'>
                <HeaderNav isMobile={false}/>
                <HeaderAuthCheck/>
            </div>
            <img className='AppHeader__burgerMenu' src={burgerMenu} alt='MENU'></img>
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
                <a href=''><img className='AppHeader__logo' src={SCANlogo} height={'50%'} width={'auto'} alt='Avatar'></img></a>
                <div className='AppHeader__rightBlock'>
                    <HeaderNav isMobile={true}/>
                    <HeaderAuthCheck />
                </div>
                <img className='AppHeader__burgerMenu' onClick={toggleOpened} src={burgerMenu} alt='MENU'></img>
            </header>
        )
        : (
            <header className='AppHeader' style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                <div className={"mobile_header"} style={{
                        height: "50%",
                        backgroundColor: "red",
                        width: "100%",
                        }}>
                    <a href=''><img className='AppHeader__logo' src={SCANlogo} height={'50%'} width={'auto'} alt='Avatar'></img></a>
                    <HeaderNav isMobile={true}/>
                    <HeaderUserAccInfo isMobile={true}/>
                </div>
            </header>
        )
}

export default AppHeader;