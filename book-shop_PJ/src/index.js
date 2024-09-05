const booksCategoriesArr = [
    'Architecture',
    'Art & Fashion',
    'Biography',
    'Business',
    'Crafts & Hobbies',
    'Drama',
    'Fiction',
    'Food & Drink',
    'Health & Wellbeing',
    'History & Politics',
    'Humor',
    'Poetry',
    'Psychology',
    'Science',
    'Technology',
    'Travel & Maps'
];

const headerNav = document.querySelector('.header-container__header-nav');
const booksCategoriesUl = document.querySelector('.categories-ul');
const booksBlock= document.querySelector('.books-preview__books');
const buyButton = document.querySelector('.button_books-load');

let activeCategoryName;

async function booksLoad(booksLoadUrl) {
    try {
        const response = await fetch(booksLoadUrl);

        if(!response.ok){
            throw new Error (`Response status: ${response.status}`);
        }

        let booksInfoObjectsArr = await response.json();
        console.log('Загрузили  джейсон');
        booksInfoObjectsArr = booksInfoObjectsArr.items;
        console.log('Сформировали массив объектов', booksInfoObjectsArr);
        loadInfoToBookTags(booksInfoObjectsArr);

    } catch (error) {
        
    }
}

function addInfoToTags(infoObject, bookNum) {
    console.log('Будем заполнять тэги инфой');
    const bookInfoDiv = booksBlock.querySelector(`.book-num${bookNum} .books-preview__book-info`);
    const bookImg = booksBlock.querySelector(`.book-num${bookNum} img`);

    if(infoObject.volumeInfo.imageLinks.hasOwnProperty('thumbnail')){
        bookImg.src = `${infoObject.volumeInfo.imageLinks.thumbnail}`;
    } else {
        booksBlock.querySelector('.thumbnail').src = './assets/img_placeholder';
    }

    if(infoObject.volumeInfo.hasOwnProperty('authors')){
        bookInfoDiv.querySelector('.authors').innerHTML = `${infoObject.volumeInfo.authors}`;
    }

     if(infoObject.volumeInfo.hasOwnProperty('title')) {
        bookInfoDiv.querySelector('.title').innerHTML = `${infoObject.volumeInfo.title}`;
    }

     if(infoObject.volumeInfo.hasOwnProperty('averageRating')) {
        bookInfoDiv.querySelector('.average-rating').innerHTML = `${infoObject.volumeInfo.averageRating}`;
    }

     if(infoObject.volumeInfo.hasOwnProperty('ratingsCount')) {
        bookInfoDiv.querySelector('.ratings-count').innerHTML = `${infoObject.volumeInfo.ratingsCount}`;
    }

    if(infoObject.volumeInfo.hasOwnProperty('description')) {
        bookInfoDiv.querySelector('.description').innerHTML = `${infoObject.volumeInfo.description}`;
    }

     if(infoObject.saleInfo.hasOwnProperty('retailPrice')) {
        bookInfoDiv.querySelector('.retail-price').innerHTML = `${infoObject.saleInfo.retailPrice.amount}`;
    } else {
        bookInfoDiv.querySelector('.retail-price').innerHTML = 'Not on sale';
    }
    console.log('Заполнили тэги инфой');
}

function loadInfoToBookTags(InfoObjectsArr) {
    console.log('Будем печатать тэги');
    InfoObjectsArr.forEach((infoObject, index) => {
        booksBlock.innerHTML +=`<div class="books-preview__book book-num${index} last_loaded">
            <img class="thumbnail"/>
            <div class="books-preview__book-info">
                <div class="book-info_text-block">
                    <p class="authors"></p>
                    <h3 class="title"></h3>
                    <div class="rating-info">
                        <div class="average-rating">
                            <svg width="60" height="14" viewBox="0 0 160 32">
                                <defs>
                                    <mask id="perc">
                                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                        <rect x="48%" y="0" width="100%" height="100%" fill="grey" />
                                    </mask>
                                    <symbol viewBox="0 0 32 32" id="star">
                                        <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
                                    </symbol>
                                    <symbol viewBox="0 0 160 32" id="stars">
                                        <use xlink:href="#star" x="-64" y="0"></use>
                                        <use xlink:href="#star" x="-32" y="0"></use>
                                        <use xlink:href="#star" x="0" y="0"></use>
                                        <use xlink:href="#star" x="32" y="0"></use>
                                        <use xlink:href="#star" x="64" y="0"></use>
                                    </symbol>
                                </defs>
                                <use xlink:href="#stars" fill="yellow" stroke="black" mask="url(#perc)"></use>
                            </svg>
                        </div>
                        <span class="ratings-count"></span>
                    </div>
                    <div class="description"></div>
                    <span class="retail-price"></span>
                </div>
                <button class="button_primary-type buy-button">buy now</button>
            </div>
        </div>`;
        console.log('Напечатали тэги');
        addInfoToTags(infoObject, index);
    });
}

function booksCategoriesListInit(categoriesArr) {
    if(!categoriesArr) return;

    categoriesArr.map(category => {
        booksCategoriesUl.innerHTML += `<li class="categories-ul_li">${category}</li>`;
    });
    booksCategoriesUl.querySelector('.categories-ul_li')
    .classList.add('active');
}

function selectedCategoryBooksLoad (categoryNameStr, booksAPIkeyStr, booksNum) {
    if(categoryNameStr === '' || categoryNameStr === +categoryNameStr) return;

    const booksLoadUrl = `https://www.googleapis.com/books/v1/volumes?q=%22subject:${categoryNameStr}%22&key=${booksAPIkeyStr}&printType=books&startIndex=0&maxResults=${booksNum}&langRestrict=en`;
    console.log('Сформировали ссылку', booksLoadUrl);
    booksLoad(booksLoadUrl);
    // Некорректно отрабатывают ссылки, в которых категория содержит пробелы - разобраться.
}

booksCategoriesUl.addEventListener('click', (e) => {
    console.log('Слушатель категорий. Таргет - ', e.target); 
    if (e.target.classList.contains('categories-ul_li')) {
        booksCategoriesUl.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');

        booksBlock.innerHTML = '';
        
        activeCategoryName = e.target.textContent;
        selectedCategoryBooksLoad(activeCategoryName, 'AIzaSyC1btnaqckrhX4nOaY2sJ76QQfNmXDlUb0', 6);
    }
});

buyButton.addEventListener('click', (e) => {
    console.log('Слушатель кнопки. Таргет - ', e.target);
    const lastLoadedBooks = Array.from(booksBlock.querySelectorAll('.last_loaded'));
    console.log('lastLoadedBooks', lastLoadedBooks); 
    lastLoadedBooks.forEach((book) => {
        console.log('book', book);
        book.classList = 'books-preview__book';
    });
    
    console.log(activeCategoryName);
    selectedCategoryBooksLoad(activeCategoryName, 'AIzaSyC1btnaqckrhX4nOaY2sJ76QQfNmXDlUb0', 6);
});

//////////////////////////////////////////////////////////////////////////////////////

const sliderBanners = [{url:'./assets/banner-0.png'},
    {url:'./assets/banner-1.png'},
    {url:'./assets/banner-2.png'},];

const sliderImagesDiv = document.querySelector('.slider__images');
const sliderNavDotsDiv = document.querySelector('.slider__nav-dots');
const sliderBlocks = Array.from(document.querySelectorAll('.slider > div'));

function addObjectsToSlider(imagesArr){
    imagesArr.forEach((img, index) => {
        sliderImagesDiv.innerHTML +=`<img data-num=${index} src="${img.url}" class="slider__img num${index}${index === 0? ' active' : ''}"/>`;
    });
}

function sliderInit(imagesArr) {
    if(!imagesArr) return;

    addObjectsToSlider(imagesArr);
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
    if(e.target.classList.contains('slider__nav-dot')) {
        const currentSliderElemIndex = e.target.dataset.num;
        setActiveClass(currentSliderElemIndex);
    } 
});

headerNav.addEventListener('click', (e) => {
    if(e.target.classList.contains('.header-nav_a')) {
        headerNav.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
    } 
});

document.addEventListener("DOMContentLoaded", () => {
    sliderInit(sliderBanners);
    sliderNavDotsInit(sliderBanners);
    booksCategoriesListInit(booksCategoriesArr);
})