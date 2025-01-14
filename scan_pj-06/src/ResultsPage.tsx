import './ResultsPage.css'
import Histogram from "./Histogram";
import { AuthContext } from "./App";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { histogramRequest, HistogramRespDataType } from "./requests";

const resultsPageHeaderBlock = require('./assets/ResultsPage_img.png');

type UseParams = { limit: string, startDateJSON: string, endDateJSON: string, INN: string, tonality: string, maxFullness: string, inBusinessNews: string, onlyMainRole: string, onlyWithRiskFactors: string, excludeTechNews: string, excludeAnnouncements: string, excludeDigests: string }

export type HandledHistogramReqData = {
    date: string,
    value: number,
    risks: number
};

function ResultsPage() {
    const [ reqHandledData, setReqHandledData ] = useState<Array<HandledHistogramReqData>>([]);

    const navigate = useNavigate();

    const authInfo = useContext(AuthContext);
    let accessToken: string;
    if (authInfo?.accessToken != undefined) {
        accessToken = authInfo.accessToken;
    } else {
        accessToken = '';
    }

    const params = useParams<UseParams>() as UseParams;
    
    const reqValues = {
        accessToken: accessToken,
        limit: +params.limit,
        startDate: params.startDateJSON,
        endDate: params.endDateJSON,
        INN: +params.INN,
        tonality: params.tonality,
        maxFullness: params.maxFullness == 'true'? true : false,
        inBusinessNews: params.inBusinessNews == 'true'? true : false,
        onlyMainRole: params.onlyMainRole == 'true'? true : false,
        onlyWithRiskFactors: params.onlyWithRiskFactors == 'true'? true : false,
        excludeTechNews: params.excludeTechNews == 'true'? true : false,
        excludeAnnouncements: params.excludeAnnouncements == 'true'? true : false,
        excludeDigests: params.excludeDigests == 'true'? true : false
    }
    
    function histogramReqDataHandler(reqData: Array<HistogramRespDataType>){
        let handledData: Array<HandledHistogramReqData> = [];

        reqData.forEach(reqDataInnerObj => {
            if(reqDataInnerObj.histogramType === 'totalDocuments') {
                reqDataInnerObj.data.forEach(dataInnerObj => {
                    handledData.push({
                        date: dataInnerObj.date,
                        value: dataInnerObj.value,
                        risks: 0
                    });
                });
            } 
        });

        reqData.forEach(reqDataInnerObj => {
            if(reqDataInnerObj.histogramType === 'riskFactors'){
                reqDataInnerObj.data.forEach((dataInnerObj, ind) => {
                    handledData[ind].risks = dataInnerObj.value;
                });
            }
        });
        
        return handledData;
    }

    useEffect(() => {
        (async () => {
            const histogramRequestResult = await histogramRequest(reqValues);
            if(histogramRequestResult === null){
                navigate('/articlesSearch');
                alert('UseEffect: ошибка');
            } else {
                console.log('useEffect: всё ок')
                setReqHandledData(histogramReqDataHandler(histogramRequestResult));
            }
        })()
    }, []);

    return (
        <div className="ResultsPage">
            <main className="ResultsPage_main AppMain">
                <div className="ResultsPage__headerBlock">
                    <div className="headerBlock__textPart">
                        <h1>Ищем. Скоро<br></br>
                        будут результаты</h1>
                        <p>Поиск может занять некоторое время,<br></br>
                            просим сохранять терпение.</p>
                    </div>
                    <div className="headerBlock__imgWrapper">
                        <img className="headerBlock__img" src={resultsPageHeaderBlock}></img>
                    </div>
                </div>
                <div className="ResultsPage__histogrammBlock">
                    <h4>Общая сводка</h4>
                    <div>
                        <span>Найдено</span>
                        <span></span>
                        <span>вариантов</span>
                    </div>
                    <Histogram sliderDataArr={reqHandledData}/>
                </div>
                <div className="ResultsPage__articlesBlock">
                    <h4>Список документов</h4>
                    <button className="commonTypeBtn">Показать больше</button>
                </div>
            </main>
        </div>
    )
}

export default ResultsPage;