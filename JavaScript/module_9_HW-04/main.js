const imagesGalleryDiv = document.querySelector('.gallery');
const loader = document.querySelector('.gallery__loader');
const loadButton = document.querySelector('.load-button')
const imgsLoadErrorSpan = document.createElement('span')

const loaderVisibility = (styleDisplayValueStr) => loader.style.display = styleDisplayValueStr;

loaderVisibility('none');

const imagesLoader = async function () {
    try{
        const URL = 'https://api.thecatapi.com/v1/images/search?limit=10';
        const response = await fetch(URL);

        if(!response.ok){
            throw new Error (`Response status: ${response.status}`)
        }
        const data = await response.json();

        let imagesURLsArr = data.map(elem => elem.url);
        await Promise.all(addAllImagesToGallery(imagesURLsArr));
        
    } catch (error) {
        console.error(error.message);
        galleryImagesLoadErrorText();
      }
    loaderVisibility('none');
    loadButton.disabled = false;
}

const galleryImagesLoadErrorText = () => {
    imagesGalleryDiv.appendChild(imgsLoadErrorSpan)
    imgsLoadErrorSpan.textContent = 'Извините, не удалось загрузить котиков!';
    imgsLoadErrorSpan.style.textAlign = 'center';
}

window.onload = function(){
    loadButton.addEventListener('click', () => {
        loadButton.disabled = true;
        loaderVisibility('block');

        const galleryImages = imagesGalleryDiv.querySelectorAll('.gallery > img')
        for(let img of galleryImages){
            img.remove();
        }
        
        imagesLoader();
})};

// addAllImagesToGallery returns array of promises
function addAllImagesToGallery(URLsArr) {
    return URLsArr.map((url) => asyncAddImageToGallery(url));
}

function asyncAddImageToGallery(url) {
    return new Promise((resolve, reject) => {
        const galleryImg = document.createElement('img');
        imagesGalleryDiv.appendChild(galleryImg);
        galleryImg.onload = () => {
            resolve();
        }
        galleryImg.onerror = () => {
            galleryImg.alt = 'Котик недоступен';
            galleryImg.style.textAlign = 'center';
            resolve();
        }
        galleryImg.src = url;
    });

}