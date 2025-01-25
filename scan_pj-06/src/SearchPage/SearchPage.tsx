import './SearchPage.css';
import ArticlesSearch from "./ArticlesSearch";

const bigImg = require('../assets/search-page_big-img.png');
const smallImg0 = require('../assets/search-page_small-img0.png');
const smallImg1 = require('../assets/search-page_small-img1.png');

function SearchPage() {
    return (
        <div className="SearchPage">
            <main className="SearchPage__main AppMain">
                <div className="SearchPage__leftBlock">
                    <div className="leftBlock__headerBlock">
                        <div>
                            <h1 className="headerBlock__h1">Найдите необходимые<br></br>
                            данные в пару кликов.</h1>
                        <p className="headerBlock__p">Задайте параметры поиска.<br></br>
                            Чем больше заполните, тем точнее поиск</p>
                        </div>
                        <div>
                        <img className="headerBlock__img smalImg0" src={smallImg0} alt=""></img>
                        </div>
                    </div>
                    <ArticlesSearch />
                </div>
                <div className="SearchPage__rightBlock">
                    <div className='rightBlock__smallImgs'>
                        <img className='smallImg0' src={smallImg0} alt=""></img>
                        <img className='smallImg1' src={smallImg1} alt=""></img>
                    </div>
                    <img className='rightBlock__bigImg' src={bigImg} alt=""></img>
                </div>
            </main>
        </div>
    )
}

export default SearchPage;