import './Loader.css';
import loaderImg from './assets/loader_img.png';

function Loader() {
    return (
        <div className='Loader'>
            <img className='Loader__img' src={loaderImg} alt='loading'></img>
        </div>
    )
}

export default Loader;