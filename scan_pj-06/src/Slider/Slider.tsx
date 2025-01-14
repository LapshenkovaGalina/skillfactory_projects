export function Slider<SlideData>({
    slidesData, numOfSlidesToShow, SlideComponent, firstSlide
}: {
    slidesData: SlideData[],
    numOfSlidesToShow: number,
    firstSlide: number,
    SlideComponent: React.FunctionComponent<{
        slideData: SlideData
    }>
}) {
    console.log('slidesData.length:', slidesData.length);
    let slides = [];
    console.log('first index', firstSlide);
    for (let i = firstSlide; i < (numOfSlidesToShow + firstSlide); i++) {
        //const maxDataIndex = slidesData.length - 1;
        //Math.min(numOfSlidesToShow, slidesData.length);
        const index = i >= 0 
            ? (Math.abs(i)) % slidesData.length
            : (((Math.floor(Math.abs(i) / slidesData.length)
                 + 1) * slidesData.length) + i) % slidesData.length;

        console.log("index = ", index);
        const data = slidesData[index];
        const slide = (<SlideComponent slideData={data} key={i}/>);
        slides.push(slide);
    }

    return (<>
        {slides}
    </>)
}
