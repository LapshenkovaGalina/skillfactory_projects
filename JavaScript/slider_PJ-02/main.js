let imgsArr = [{url:"image_1.png"},
    {url:"image_2.png"},
    {url:"image_3.png"}
];

let projectsDiscriptionsArr = [
    {
        url: './assets/main__photo1.jpg',
        city: 'Rostov-on-Don',
        name: 'LCD admiral',
        apartmentArea: '81 m2',
        repairTime: '3.5 months',
        repairCost: 'Upon request'
    },
    {
        url: './assets/main__photo2.jpg',
        city: 'Sochi',
        name: 'Thieves',
        apartmentArea: '105 m2',
        repairTime: '4 months',
        repairCost: 'Upon request'
    },
    {
        url: './assets/main__photo3.jpg',
        city: 'Rostov-on-Don',
        name: 'Patriotic',
        apartmentArea: '90 m2',
        repairTime: '3 months',
        repairCost: 'Upon request'
    }
]

let imgsCaptionsArr = ['ROSTOV-ON-DON, ADMIRAL', 'SOCHI, THIEVES', 'ROSTOV-ON-DON, PATRIOTIC']

const sliderDiscriptionsDiv = document.querySelector('.slider__discriptions');
const sliderImagesCaptionsDiv = document.querySelector('.slider__images-captions');
const sliderImagesDiv = document.querySelector('.slider__images');
const sliderNavElementsDiv = document.querySelector('.slider__nav-elements');
const sliderNavDotsDiv = document.querySelector('.slider__nav-dots');
const sliderBlocks = Array.from(document.querySelectorAll('.slider__block div'));
const sliderDiscriptionsBlocks = Array.from(document.querySelectorAll('.slider__discriptions > div'));

function addObjectsToSlider(imagesArr, imagesCaptionsArr, discriptionsArr){
    imagesArr.forEach((img, index) => {
        sliderImagesDiv.innerHTML +=`<img data-num=${index} src="${img.url}" class="slider__img num${index}${index === 0? ' active' : ''}"/>`;
        sliderImagesCaptionsDiv.innerHTML +=`<span data-num=${index} class="slider__img-caption num${index}${index === 0? ' active' : ''}">${imagesCaptionsArr[index]}</span>`;


        sliderDiscriptionsBlocks[0].innerHTML +=`<div>
        <p data-num=${index} class="slider__img-discription num${index}${index === 0? ' active' : ''}">
        ${projectsDiscriptionsArr[index].city}<br>
        ${projectsDiscriptionsArr[index].name}
        </div></p>`;
        sliderDiscriptionsBlocks[1].innerHTML +=`<div>
        <p data-num=${index} class="slider__img-discription num${index}${index === 0? ' active' : ''}">
        ${projectsDiscriptionsArr[index].apartmentArea}
        </div></p>`;
        sliderDiscriptionsBlocks[2].innerHTML +=`<div>
        <p data-num=${index} class="slider__img-discription num${index}${index === 0? ' active' : ''}">
        ${projectsDiscriptionsArr[index].repairTime}
        </div></p>`;
        sliderDiscriptionsBlocks[3].innerHTML +=`<div>
        <p data-num=${index} class="slider__img-discription num${index}${index === 0? ' active' : ''}">
        ${projectsDiscriptionsArr[index].repairCost}
        </div></p>`;
    });
}

function sliderInit(imagesArr) {
    if(!imagesArr) return;

    addObjectsToSlider(imagesArr, imgsCaptionsArr, projectsDiscriptionsArr);
}

function sliderNavArrowsInit(imagesArr){
    sliderNavElementsDiv.querySelectorAll('.slider__nav-arrow').forEach(arrow => {
        arrow.addEventListener('click', () => {
            const currentVisibleImgNum = +(sliderImagesDiv.querySelector('.active').dataset.num);
            const lastImgIndex = imagesArr.length - 1;
            let nextImgNum;
            
            if(arrow.classList.contains('arrow-right')){
                console.log('arrow-right');
                if(currentVisibleImgNum != lastImgIndex){
                    nextImgNum = currentVisibleImgNum + 1;
                } else {
                    nextImgNum = 0;
                }   
            } else if(arrow.classList.contains('arrow-left')){
                console.log('arrow-left');
                if(currentVisibleImgNum != 0){
                    nextImgNum = currentVisibleImgNum - 1;
                } else {
                    nextImgNum = lastImgIndex;
                }  
            }

            console.log(nextImgNum);
            setActiveClass(nextImgNum);
        })
    })
}

function sliderNavDotsInit(imagesArr) {
    imagesArr.forEach((img, index) => {
        sliderNavDotsDiv.innerHTML += `<div data-num=${index} class="slider__nav-dot num${index} ${index === 0? 'active' : ''}"></div>`;
    })
}

function setActiveClass(activeElementNum){
    const sliderActiveElements = Array.from(document.querySelectorAll('.active'));
    sliderActiveElements.map(e => e.classList.remove('active'));

    sliderBlocks.map(e => {
        if(e.querySelector(`.num${activeElementNum}`)) 
            e.querySelector(`.num${activeElementNum}`).classList.add('active')});
}

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('slider__nav-dot') ||
        e.target.classList.contains('slider__img-caption')){
        const currentSliderElemIndex = e.target.dataset.num;
        setActiveClass(currentSliderElemIndex);
    } 
});

document.addEventListener("DOMContentLoaded", () => {
    sliderInit(imgsArr);
})

sliderNavArrowsInit(imgsArr);
sliderNavDotsInit(imgsArr);