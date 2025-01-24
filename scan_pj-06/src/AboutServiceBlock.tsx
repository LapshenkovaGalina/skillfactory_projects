import './AboutServiceBlock.css';
import './headerBlock.css';
import './button.css';
import { useContext } from 'react';
import { AuthContext } from './App';
import { useNavigate } from 'react-router-dom';

const AboutServiceBlockImage = require('./assets/aboutServiceBlock-img.png');

function AboutServiceBlock() {
    const authInfo = useContext(AuthContext);
    const loggedIn = !!authInfo?.accessToken;

    const navigate = useNavigate();

    return (
        <div className="AboutServiceBlock">
            <div className="AboutServiceBlock__headerBlock">
                <h1 className='headerBlock__h1'>сервис по поиску <br></br>
                публикаций <br></br>
                компании <br></br>
                по его ИНН</h1>
                <p className='headerBlock__p'>Комплексный анализ публикаций, получение данных <br></br>
                в формате PDF на электронную почту.</p>
                {loggedIn && <button className="commonTypeBtn dataRequestBtn"
                onClick={() => navigate('/articlesSearch')}>Запросить данные</button>}
            </div>
            <div className="AboutServiceBlock__imgWrapper">
                <img className="AboutServiceBlock__img" src={AboutServiceBlockImage} alt=''></img>
            </div>
        </div>
    )
}

export default AboutServiceBlock;