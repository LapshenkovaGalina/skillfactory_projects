const sliderImagesDiv = document.querySelector('.slider__images');
const sliderNavDotsDiv = document.querySelector('.slider__nav-dots');
const sliderBlocks = Array.from(document.querySelectorAll('.slider > div'));
const sliderBlock = document.querySelector('.slider');

let currActiveSliderDot;
let sliderDotsArr;

export function sliderImgChange() {
    setInterval(() => {
        
        if(currActiveSliderDot != sliderDotsArr[sliderDotsArr.length - 1]){
           currActiveSliderDot = sliderDotsArr[(sliderDotsArr.indexOf(currActiveSliderDot)) + 1]; 
        } else {
            currActiveSliderDot = sliderDotsArr[0];
        }

        currActiveSliderDot.click();
    }, 5000);
}

function addObjectsToSlider(imagesArr){
    imagesArr.forEach((img, index) => {
        sliderImagesDiv.innerHTML +=`<img data-num=${index} src="${img.url}" class="slider__img num${index}${index === 0? ' active' : ''}"/>`;
    });
}

export function sliderInit(imagesArr) {
    if(!imagesArr) return;

    addObjectsToSlider(imagesArr);
}

export function sliderNavDotsInit(imagesArr) {
    imagesArr.forEach((img, index) => {
        sliderNavDotsDiv.innerHTML += `<div data-num=${index} class="slider__nav-dot num${index} ${index === 0? 'active' : ''}"></div>`;
    })

    sliderDotsArr = Array.from(document.querySelectorAll('.slider__nav-dot'));
    currActiveSliderDot = sliderDotsArr[0];
}

function setActiveClass(activeElementNum, sliderParentElem){
    const sliderActiveElements = Array.from(sliderParentElem.querySelectorAll('.active'));
    sliderActiveElements.map(e => e.classList.remove('active'));

    sliderBlocks.map(e => {
        if(e.querySelector(`.num${activeElementNum}`)) 
            e.querySelector(`.num${activeElementNum}`).classList.add('active')});

    currActiveSliderDot = sliderNavDotsDiv.querySelector('.active');
}

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('slider__nav-dot')) {
        const currentSliderElemIndex = e.target.dataset.num;
        setActiveClass(currentSliderElemIndex, sliderBlock);
    } 
});