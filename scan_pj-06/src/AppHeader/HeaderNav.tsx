import './HeaderNav.css';
import './HeaderNavMobile.css';

function HeaderNav({isMobile} : {isMobile: boolean}) {
    let className = '';
    if (isMobile) {
        className = 'Mobile'
    }

    return (
        <nav className = {`HeaderNav${className}`}>
            <a href='/'>Главная</a>
            <a href='/'>Тарифы</a>
            <a href='/'>FAQ</a>
        </nav>
    );
}

export default HeaderNav;