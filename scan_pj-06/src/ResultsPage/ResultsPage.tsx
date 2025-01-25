import './ResultsPage.css';
import '../headerBlock.css';

import Histogram from './Histogram';
import { Articles } from './Articles';
import { AuthContext } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react';
import { histogramRequest, HistogramRespDataType } from './requests';

import resultsPageHeaderBlockImg from '../assets/resultsPage_img.png';

type UseParams = { limit: string, startDateJSON: string, endDateJSON: string, INN: string, tonality: string, maxFullness: string, inBusinessNews: string, onlyMainRole: string, onlyWithRiskFactors: string, excludeTechNews: string, excludeAnnouncements: string, excludeDigests: string };

export type HandledHistogramReqData = {
    date: string,
    value: number,
    risks: number
};

function ResultsPage() {
    const [reqHandledData, setReqHandledData] = useState<Array<HandledHistogramReqData>>([]);

    const navigate = useNavigate();

    const authInfo = useContext(AuthContext);
    let accessToken: string;
    if (authInfo?.accessToken) {
        accessToken = authInfo.accessToken;
    } else {
        accessToken = '';
    }

    const params = useParams<UseParams>() as UseParams;

    const reqValues = useMemo(() => {
        return {
            accessToken: accessToken,
            limit: +params.limit,
            startDate: params.startDateJSON,
            endDate: params.endDateJSON,
            INN: +params.INN,
            tonality: params.tonality,
            maxFullness: params.maxFullness === 'true' ? true : false,
            inBusinessNews: params.inBusinessNews === 'true' ? true : false,
            onlyMainRole: params.onlyMainRole === 'true' ? true : false,
            onlyWithRiskFactors: params.onlyWithRiskFactors === 'true' ? true : false,
            excludeTechNews: params.excludeTechNews === 'true' ? true : false,
            excludeAnnouncements: params.excludeAnnouncements === 'true' ? true : false,
            excludeDigests: params.excludeDigests === 'true' ? true : false
        };
    }, [params, accessToken]);

    // const reqValues = {
    //     accessToken: accessToken,
    //     limit: +params.limit,
    //     startDate: params.startDateJSON,
    //     endDate: params.endDateJSON,
    //     INN: +params.INN,
    //     tonality: params.tonality,
    //     maxFullness: params.maxFullness === 'true' ? true : false,
    //     inBusinessNews: params.inBusinessNews === 'true' ? true : false,
    //     onlyMainRole: params.onlyMainRole === 'true' ? true : false,
    //     onlyWithRiskFactors: params.onlyWithRiskFactors === 'true' ? true : false,
    //     excludeTechNews: params.excludeTechNews === 'true' ? true : false,
    //     excludeAnnouncements: params.excludeAnnouncements === 'true' ? true : false,
    //     excludeDigests: params.excludeDigests === 'true' ? true : false
    // };

    function histogramReqDataHandler(reqData: Array<HistogramRespDataType>) {
        let handledData: Array<HandledHistogramReqData> = [];

        reqData.forEach(reqDataInnerObj => {
            if (reqDataInnerObj.histogramType === 'totalDocuments') {
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
            if (reqDataInnerObj.histogramType === 'riskFactors') {
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
            if (histogramRequestResult === null) {
                navigate('/articlesSearch');
            } else {
                setReqHandledData(histogramReqDataHandler(histogramRequestResult));
            }
        })()
    }, [navigate, reqValues]);

    const articlesNum = () => {
        let articlesNum = 0;
        if (reqHandledData.length > 0) {
            for (let dataObj of reqHandledData) {
                articlesNum += dataObj.value;
            }
        }
        return articlesNum;
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    return (
        <div className='ResultsPage'>
            <main className='ResultsPage___main AppMain'>
                <div className={`ResultsPage__headerBlock ${reqHandledData.length > 0 ? 'invisible' : ''}`}>
                    <div className='headerBlock__textPart'>
                        <h1 className='headerBlock__h1'>Ищем. Скоро<br></br>
                            будут результаты</h1>
                        <p className='headerBlock__p'>Поиск может занять некоторое время,<br></br>
                            просим сохранять терпение.</p>
                    </div>
                    <div className='headerBlock__imgWrapper'>
                        <img className='headerBlock__image' src={resultsPageHeaderBlockImg} alt=''></img>
                    </div>
                </div>
                <div className='ResultsPage__histogrammBlock'>
                    <h2 className='ResultsPage__h2'>Общая сводка</h2>
                    <div className='histogrammBlock__spanBlock'>
                        <span>Найдено </span>
                        <span className='histogrammBlock__resultsNum'>
                            {articlesNum()}</span>
                        <span> вариантов</span>
                    </div>
                    <Histogram sliderDataArr={reqHandledData} />
                </div>
                <div className='ResultsPage__articlesBlock'>
                    <h2 className='ResultsPage__h2'>Список документов</h2>
                    <Articles reqValues={reqValues} />
                </div>
            </main>
        </div>
    )
}

export default ResultsPage;