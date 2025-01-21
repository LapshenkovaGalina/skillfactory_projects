import './Slide.css';

export type SlideDataType = {
    img: string;
    text: string;
}
export type SlidePropsType = {
    slideData: SlideDataType
}

function Slide({ slideData }: SlidePropsType) {
    return (
        <div className='Slide'>
            <img className='Slide__img' src={slideData.img} alt=''></img>
            <div className='Slide__text'>{slideData.text}</div>
        </div>
    )
}

export default Slide;