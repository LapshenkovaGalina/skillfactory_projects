import './Articles.css';
import './Article.css';

import Loader from "../Loader";
import { useEffect, useRef, useState } from "react";
import { JSONdateToFormatedString } from "./Histogram";
import { HistogramReqValues, ArticleData, documentRequest, objectSearchRequest } from './requests';

type ArticlesProps = {
    reqValues: HistogramReqValues
}

const nextStep = 4;

export function Articles({ reqValues }: ArticlesProps) {
    const [numOfArticlesToShow, setNumOfArticlesToShow] = useState<number>(nextStep);
    const [ids, setIds] = useState<string[] | null>(null);

    useEffect(() => {
        (async () => {

            try {
                const articlesData = await objectSearchRequest(reqValues)
                setIds(articlesData.items.map(item => item.encodedId));

            } catch (e) {
                console.error('fetch error: ', e)
            }
        })()
    }, [reqValues]);

    if (ids === null) {
        return (<Loader />)
    }

    return (
        <>
            <ArticlesView
                numOfArticlesToShow={numOfArticlesToShow}
                ids={ids}
                reqValues={reqValues} />
            {numOfArticlesToShow < (100 - nextStep) ?
                <button className='commonTypeBtn moreDetailedBtn' onClick={() => setNumOfArticlesToShow(numOfArticlesToShow + nextStep)}>
                    Показать больше
                </button>
                : null}
        </>
    )
}

type ArticlesViewProps = {
    numOfArticlesToShow: number,
    ids: string[],
    reqValues: HistogramReqValues
}

function ArticlesView({ numOfArticlesToShow, ids, reqValues }: ArticlesViewProps) {

    const articles = ids.slice(0, numOfArticlesToShow)
        .map((id, i) => (<Article accessToken={reqValues.accessToken} id={id} key={i} />))

    return (
        <>
            <div className="Articles">
                {articles}
            </div>
        </>
    )
}

type ArticleProps = {
    id: string,// ArticleData
    accessToken: string
}

function Article({ accessToken, id }: ArticleProps) {
    const [pubData, setPubData] = useState<ArticleData | null>(null);

    useEffect(() => {
        (async () => {
            const articles = await documentRequest({
                accessToken: accessToken,
                IDs: [id]
            });

            console.log('isTechNews: ', articles[0].ok.attributes.isTechNews);
            setPubData(articles[0]);
        })()
    }, [id, accessToken]);

    return pubData
        ? (<ArticleView data={pubData} />)
        : (<>
            <div className="Article">
                {<Loader />}
            </div>
        </>)
}

type ArticleViewProps = {
    data: ArticleData
}

function ArticleView({ data }: ArticleViewProps) {
    const ref = useRef<HTMLDivElement>(null);

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.ok.content.markup, "application/xhtml+xml");

    let text = '';
    doc.querySelectorAll('sentence').forEach(e => text += e.textContent);


    const result = /img src="(\S+?)"/.exec(text);

    const img = result && result[1]
        ? (<img src={result[1]} className="articleImg"></img>)
        : null;

    text = text
        .replace(/<.*?>/g, '')
        .replace(/<[^>]*>/g, '')
        .replace(/\&lt;/g, '')
        .replace(/\p&gt;/g, '')
        .replace(/\&gt;/g, '');

    return (
        <div className="Article" ref={ref}>
            <div className="Article__sourceBlock">
                <span className="date">{JSONdateToFormatedString(data.ok.issueDate)}</span>
                <span className="source">{data.ok.source.name}</span>
            </div>
            <div className="title">{data.ok.title.text}</div>
            <div className="techNewsMarker">{data.ok.attributes.isTechNews ? "технические новости" : null}</div>
            {img}
            <div className="articleText">{text}</div>
            <div className="footer">
                <button className='readInTheSourseBtn' onClick={() => window.open(data.ok.url, '_blank')} >Читать в источнике</button>
                <div className="articleWordsNum">{`${data.ok.attributes.wordCount} слова`}</div>
            </div>
        </div>
    )
}
