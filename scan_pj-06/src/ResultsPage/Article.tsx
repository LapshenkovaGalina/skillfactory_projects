import './Article.css'

function Article() {
    return (
        <div className="Article">
            <div className="Article__sourceInfo">
                <span></span>
                <a className="sourceInfo__source"></a>
            </div>
            <div className="Article__headerBlock">
                <h4></h4>
                <span className="headerBlock__articleTheme"></span>
            </div>
            <div className='Article__imgWrapper'>
                <img className="imgWrapper__img" alt="article picture"></img>
            </div>
            <div className="Article__text"></div>
            <div className="Article__bottomBlock">
                <a className="bottomBlock__goToSourseText"></a>
                <span className="bottomBlock__wordsNum"></span>
            </div>
        </div>
    )
}

export default Article;