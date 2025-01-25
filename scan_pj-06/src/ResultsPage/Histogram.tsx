import { useState } from 'react';
import './Histogram.css'
import { HandledHistogramReqData } from './ResultsPage';
import { Slider } from '../Slider/Slider';
import Loader from '../Loader';

const arrowLeft = require('../assets/slider-arrow_left.png');
const arrowRight = require('../assets/slider-arrow_right.png');
const { DateTime } = require('luxon');

export function JSONdateToFormatedString(date: string) {
    return (
        DateTime.fromJSDate(
            new Date(date)
        ).toFormat('yyyy.MM.dd'))
}

type HistogramViewProps = {
    sliderDataArr: HandledHistogramReqData[]
};

function Slide({ slideData }: { slideData: HandledHistogramReqData }) {
    return (
        <>
            <div className='slider__slide'>
                <div>{JSONdateToFormatedString(`${slideData.date}`)}</div>
                <div>{slideData.value}</div>
                <div>{slideData.risks}</div>
            </div>
            <div className='slider__divider'></div>
        </>
    )
}

const HistogramSlider = Slider<HandledHistogramReqData>

function Histogram({ sliderDataArr }: HistogramViewProps) {
    const [firstSlideIndex, setFirstSlideIndex] = useState<number>(0);
    const incFirstSlideIndex = () => setFirstSlideIndex(firstSlideIndex + 1);
    const decFirstSlideIndex = () => setFirstSlideIndex(firstSlideIndex - 1);

    const displayedSlidesNum = () => {
        if (window.screen.width <= 426) {
            return 1;
        } else if (window.screen.width <= 768) {
            return 3;
        } else if (window.screen.width <= 1024) {
            return 5;
        } else if (window.screen.width <= 1440) {
            return 8;
        } else {
            return 10;
        }
    }

    return (
        <div className='Histogram'>
            <img className='Histogram__arrow'
                src={arrowLeft}
                alt='<'
                onClick={decFirstSlideIndex}></img>
            <div className='Histogram__slider'>
                <div className='slider__leftBlock'>
                    <span>Период</span>
                    <span>Всего</span>
                    <span>Риски</span>
                </div>
                <div className='slider__slides'>
                    {sliderDataArr.length > 0 ?
                        <HistogramSlider
                            firstSlide={firstSlideIndex}
                            slidesData={sliderDataArr}
                            numOfSlidesToShow={displayedSlidesNum()}
                            SlideComponent={Slide} /> :
                        <Loader />}
                </div>
            </div>
            <img className='Histogram__arrow'
                src={arrowRight}
                alt='>'
                onClick={incFirstSlideIndex}
            ></img>
        </div>
    )
}

export default Histogram;