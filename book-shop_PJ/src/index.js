

// const sliderImagesDiv = document.querySelector('.slider__images');
// const sliderNavDotsDiv = document.querySelector('.slider__nav-dots');

// function addObjectsToSlider(imagesArr){
//     imagesArr.forEach((img, index) => {
//         sliderImagesDiv.innerHTML +=`<img data-num=${index} src="${img.url}" class="slider__img num${index}${index === 0? ' active' : ''}"/>`;
//     });
// }

// function sliderInit(imagesArr) {
//     if(!imagesArr) return;

//     addObjectsToSlider(imagesArr);
// }

// function sliderNavDotsInit(imagesArr) {
//     imagesArr.forEach((img, index) => {
//         sliderNavDotsDiv.innerHTML += `<div data-num=${index} class="slider__nav-dot num${index} ${index === 0? 'active' : ''}"></div>`;
//     })
// }

// function setActiveClass(activeElementNum){
//     const sliderActiveElements = Array.from(document.querySelectorAll('.active'));
//     sliderActiveElements.map(e => e.classList.remove('active'));

//     sliderBlocks.map(e => {
//         if(e.querySelector(`.num${activeElementNum}`)) 
//             e.querySelector(`.num${activeElementNum}`).classList.add('active')});
// }

// document.addEventListener('click', (e) => {
//     if(e.target.classList.contains('slider__nav-dot')) {
//         const currentSliderElemIndex = e.target.dataset.num;
//         setActiveClass(currentSliderElemIndex);
//     } 
// });

// document.addEventListener("DOMContentLoaded", () => {
//     sliderInit(imgsArr);
//     sliderNavDotsInit(imgsArr);
// })
