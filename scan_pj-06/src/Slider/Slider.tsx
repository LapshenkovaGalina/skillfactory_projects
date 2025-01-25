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

    let slides = [];

    for (let i = firstSlide; i < (numOfSlidesToShow + firstSlide); i++) {
        const index = i >= 0
            ? (Math.abs(i)) % slidesData.length
            : (((Math.floor(Math.abs(i) / slidesData.length)
                + 1) * slidesData.length) + i) % slidesData.length;

        const data = slidesData[index];
        const slide = (<SlideComponent slideData={data} key={i} />);

        slides.push(slide);
    }

    return (
        <>
            {slides}
        </>
    )
}
