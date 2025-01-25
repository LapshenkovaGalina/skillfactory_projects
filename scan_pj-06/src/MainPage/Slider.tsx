import './Slider.css';

import { useState } from 'react';
import Slide, { SlideDataType } from './Slide';
import { Slider as SliderComp } from '../Slider/Slider';

const arrowLeft = require('../assets/slider-arrow_left.png');
const arrowRight = require('../assets/slider-arrow_right.png');

const displayedSlidesNum = window.screen.width < 426 ? 1 : 3;

const MainPageSlider = SliderComp<SlideDataType>;

function Slider({ slidesArr }: { slidesArr: Array<SlideDataType> }) {
    const [firstSlide, setFirstSlide] = useState<number>(0);

    const rightArrowOnClick = () => setFirstSlide(firstSlide + displayedSlidesNum);
    const leftArrowOnClick = () => setFirstSlide(firstSlide - displayedSlidesNum);

    return (
        <div className='Slider'>
            <img className='Slider__sliderArrow' src={arrowLeft} alt='<'
                onClick={leftArrowOnClick}></img>
            <div className='Slider__slidesBlock'>
                <MainPageSlider
                    firstSlide={firstSlide}
                    numOfSlidesToShow={displayedSlidesNum}
                    slidesData={slidesArr}
                    SlideComponent={Slide} />
            </div>
            <img className='Slider__sliderArrow' src={arrowRight} alt='>'
                onClick={rightArrowOnClick}></img>
        </div>
    )
}

export default Slider;