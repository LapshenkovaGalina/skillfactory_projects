import './AppFooter.css';

const footerSCANlogo = require('./assets/SCAN-logo_footer.png');

function AppFooter() {
    return (
        <footer className='AppFooter'>
            <img className='AppFooter__logo' src={footerSCANlogo} alt='SCAN logo'></img>
            <div className='AppFooter__rightBlock'>
                <span>г. Москва, Цветной б-р, 40</span>
                <span>+7 495 771 21 11</span>
                <span>info@skan.ru</span>
                <span className='AppFooter__copyright'>Copyright. 2022</span>
            </div>
        </footer>
    )
}

export default AppFooter;