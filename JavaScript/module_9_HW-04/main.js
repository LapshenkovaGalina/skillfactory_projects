const imagesGalleryDiv = document.querySelector('.gallery');
const loader = document.querySelector('.gallery__loader');
const imgsLoadErrorSpan = document.createElement('span')

const loaderVisibility = (strStyleDisplayValue) => loader.style.display = strStyleDisplayValue;

loaderVisibility('none');

const imagesLoader = async function () {
    try{
        const URL = 'https://api.thecatapi.com/v1/images/search?limit=10';
        const response = await fetch(URL);
        const data = await response.json();

        let arrImagesURLs = data.map(elem => elem.url);

        arrImagesURLs.map((url) => {
            return imagesGalleryDiv.appendChild(document.createElement('img')).src = url;
        });

    } catch (e) {
        console.log('Developer: "imagesLoader error"');
        console.error(e.message);
        loaderVisibility('none');
        galleryImgsLoadErrorText();
      }
}

const galleryImgsLoadErrorText = () => {
    imagesGalleryDiv.appendChild(imgsLoadErrorSpan)
    imgsLoadErrorSpan.textContent = 'Извините, не удалось загрузить котиков!';
    imgsLoadErrorSpan.style.textAlign = 'center';
}

window.onload = function(){
    document.querySelector('.loadButton').addEventListener('click', () => {
    loaderVisibility('block');
    setTimeout(() => loaderVisibility('none'), 0);

    while (imagesGalleryDiv.firstChild) {
        imagesGalleryDiv.removeChild(imagesGalleryDiv.firstChild);
    }

    imagesLoader();
})};
