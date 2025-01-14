import { useState } from 'react';
import './Histogram.css'
import { HandledHistogramReqData } from './ResultsPage';
import { Slider } from './Slider/Slider';

const arrowLeft = require('./assets/slider-arrow_left.png');
const arrowRight = require('./assets/slider-arrow_right.png');
const {DateTime} = require('luxon');

function JSONdateToFormatedString(date: string) {
    return (
    DateTime.fromJSDate(
        new Date(date)
    ).toFormat('yyyy.mm.dd'))
}

type HistogramViewProps = {
    sliderDataArr: HandledHistogramReqData[]
};

function Slide ({slideData}: {slideData: HandledHistogramReqData}) {
    return (
        <div className='slider__slide'>
            <span>{JSONdateToFormatedString(`${slideData.date}`)}</span>
            <span>{slideData.value}</span>
            <span>{slideData.risks}</span>
        </div>
    )
}

const HistogramSlider = Slider<HandledHistogramReqData>

function Histogram({ sliderDataArr }
    : {sliderDataArr: Array<HandledHistogramReqData>}
) {
    return (sliderDataArr.length > 0)
        ? (<HistogramView sliderDataArr={sliderDataArr}/>)
        : (<HistogramLoader />)
}

function HistogramLoader() {
    return (<>
        "Histogram loading"
    </>)
}

function HistogramView({sliderDataArr}: HistogramViewProps) {
    const [firstSlideIndex, setFirstSlideIndex] = useState<number>(0);
    const incFirstSlideIndex = () => setFirstSlideIndex(firstSlideIndex + 1);
    const decFirstSlideIndex = () => setFirstSlideIndex(firstSlideIndex - 1)

    console.log('sliderDataArr = ', sliderDataArr);

    return (
        <div className='Histogram'>
            <img className='Histogram__arrowLeft'
                src={arrowLeft}
                alt='<'
                onClick={decFirstSlideIndex}
            ></img>
            <div className='Histogram__slider'>
                <div className='slider__leftBlock'>
                    <span>Период</span>
                    <span>Всего</span>
                    <span>Риски</span>
                </div>
                <div className='slider__slides'>
                    <HistogramSlider
                        firstSlide={firstSlideIndex}
                        slidesData={sliderDataArr}
                        numOfSlidesToShow={5}
                        SlideComponent={Slide}/>
                    </div>
            </div>
            <img className='Histogram__arrowRight'
                src={arrowRight}
                alt='>'
                onClick={incFirstSlideIndex}
            ></img>
        </div>
    )
}

function Histogram2({ sliderDataArr }: { sliderDataArr: Array<HandledHistogramReqData>}) {

    const JSONdateToFormatedString = (date: string) => {
        return (
        DateTime.fromJSDate(
            new Date(date)
        ).toFormat('yyyy.mm.dd'))
    }

    const slideJSX = (slideData: HandledHistogramReqData, ind: number) => {
        return (
            <div key={ind} className='slider__slide'>
                <span>{JSONdateToFormatedString(`${slideData.date}`)}</span>
                {/* <span>{slideData.date}</span> */}
                <span>{slideData.value}</span>
                <span>{slideData.risks}</span>
            </div>
        )
    }
    
    return (
        <div className='Histogram'>
            <img className='Histogram__arrowLeft' src={arrowLeft} alt='<'></img>
            <div className='Histogram__slider'>
                <div className='slider__leftBlock'>
                    <span>Период</span>
                    <span>Всего</span>
                    <span>Риски</span>
                </div>
                <div className='slider__slides'>
                    {sliderDataArr.map( (slideData, ind) => slideJSX(slideData, ind))}
                </div>
            </div>
            <img className='Histogram__arrowRight' src={arrowRight} alt='>'></img>
        </div>
    )
}

export default Histogram;