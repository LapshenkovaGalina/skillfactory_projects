import './book.scss'
import './books-block.scss'
import './books-selections.scss'
import './button_primary-type.scss'
import './categories.scss'
import './global.scss'
import './header.scss'
import './media_book.scss'
import './media_books-block.scss'
import './media_books-selections.scss'
import './media_button_books-load.scss'
import './media_categories.scss'
import './media_header.scss'     
import './media_slider.scss'
import './slider.scss'    

import {parseBooksJSONItems} from './json-parse'

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

const headerNav = document.querySelector('.header-nav');
const booksCategoriesUl = document.querySelector('.categories-ul');
const booksBlock = document.querySelector('.books');
const loadButton = document.querySelector('.button_books-load');
const cartBooksCountDiv = document.querySelector('.acc-block__books-counter');

let activeCategoryName;
let cartBooksCounter = 0;
let booksInfoObjectsArray = [];
let localStorage = [];

async function booksLoad(booksLoadUrl) {
    try {
        const response = await fetch(booksLoadUrl);

        if(!response.ok){
            throw new Error (`Response status: ${response.status}`);
        }

        let responseJson = await response.json();
        let booksInfoObjectsArr = responseJson.items;

        loadInfoToBookTags(booksInfoObjectsArr);
        const loadedBooksInfo = parseBooksJSONItems(responseJson);
        booksInfoObjectsArray = booksInfoObjectsArray.concat(loadedBooksInfo);

    } catch (error) {
        console.error(error);
    }
}

function ratingStarsFill(parentContainer, averageRatingNum) {
    const fillRatingStarsPersent = +averageRatingNum / (5 / 100);
    
    parentContainer.querySelector('.book__average-rating')
    .innerHTML = `<svg width="60" height="14" viewBox="0 0 160 32">
  <defs>
    <mask id="perc${averageRatingNum}">
      <rect x="0" y="0" width="100%" height="100%" fill="white" />
      <rect x="${fillRatingStarsPersent}%" y="0" width="100%" height="100%" fill="grey" />
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
  <use xlink:href="#stars" fill="orange" mask="url(#perc${averageRatingNum})"></use>
</svg>`
}

function addInfoToTags(infoObject, bookNum) {
    const bookInfoDiv = booksBlock.querySelector(`.book-num${bookNum} .book__info`);
    const bookImg = booksBlock.querySelector(`.book-num${bookNum} img`);

    if(infoObject.volumeInfo.imageLinks.hasOwnProperty('thumbnail')){
        bookImg.src = `${infoObject.volumeInfo.imageLinks.thumbnail}`;
    } else {
        booksBlock.querySelector('.book__thumbnail').src = './assets/img_placeholder.png';
    }

    if(infoObject.volumeInfo.hasOwnProperty('authors')){
        bookInfoDiv.querySelector('.book__authors').innerHTML = `${infoObject.volumeInfo.authors}`;
    }

     if(infoObject.volumeInfo.hasOwnProperty('title')) {
        bookInfoDiv.querySelector('.book__title').innerHTML = `${infoObject.volumeInfo.title}`;
        
    }

     if(infoObject.volumeInfo.hasOwnProperty('averageRating')) {
        ratingStarsFill(bookInfoDiv, infoObject.volumeInfo.averageRating);
    } else {
        ratingStarsFill(bookInfoDiv, 0);
    }

     if(infoObject.volumeInfo.hasOwnProperty('ratingsCount')) {
        bookInfoDiv.querySelector('.book__ratings-count').innerHTML = `${infoObject.volumeInfo.ratingsCount} review`;
    }

    if(infoObject.volumeInfo.hasOwnProperty('description')) {
        bookInfoDiv.querySelector('.book__description').innerHTML = `${infoObject.volumeInfo.description}`;
    }

     if(infoObject.saleInfo.hasOwnProperty('retailPrice')) {
        bookInfoDiv.querySelector('.book__retail-price').innerHTML = `${infoObject.saleInfo.retailPrice.amount} RUB`;
    } else {
        bookInfoDiv.querySelector('.book__retail-price').innerHTML = 'Free';
    }
}

function loadInfoToBookTags(InfoObjectsArr) {
    InfoObjectsArr.forEach((infoObject, index) => {
        booksBlock.innerHTML +=`<div class="book book-num${index} last-loaded-book">
            <img class="book__thumbnail"/>
            <div class="book__info">
                <div class="book__text-block">
                    <p class="book__authors"></p>
                    <h3 class="book__title"></h3>
                    <div class="book__rating-info">
                        <div class="book__average-rating">
                        </div>
                        <span class="book__ratings-count"></span>
                    </div>
                    <div class="book__description"></div>
                    <span class="book__retail-price"></span>
                </div>
                <button class="button_primary-type buy-button">buy now</button>
            </div>
        </div>`;
        
        addInfoToTags(infoObject, index);
    });
}

function booksCategoriesListInit(categoriesArr) {
    if(!categoriesArr) return;

    categoriesArr.map(category => {
        booksCategoriesUl.innerHTML += `<li class="categories-ul__li">${category}</li>`;
    });
    booksCategoriesUl.querySelector('.categories-ul__li')
    .classList.add('active');
}

async function selectedCategoryBooksLoad (categoryNameStr, booksAPIkeyStr, booksNum) {
    if(categoryNameStr === '' || categoryNameStr === +categoryNameStr) return;

    const booksLoadUrl = `https://www.googleapis.com/books/v1/volumes?q=%22subject:${categoryNameStr}%22&key=${booksAPIkeyStr}&printType=books&startIndex=0&maxResults=${booksNum}&langRestrict=en`;
    await booksLoad(booksLoadUrl);
}

function cartBooksCountFunc (){
    if(cartBooksCounter > 0){
        console.log('cartBooksCounter = ', cartBooksCounter);
        cartBooksCountDiv.textContent = `${cartBooksCounter}`;
    }
}

function addBookToCart() {
    const addToCartButton = booksBlock.querySelector('.add-to-cart');
    console.log("booksInfoObjectsArray: ", booksInfoObjectsArray)
    localStorage.push(booksInfoObjectsArray[addToCartButton.dataset.num]);

    cartBooksCounter += 1;
    cartBooksCountFunc();
}

function addToCartButtonDataSet() {
    let buttonsElemsArr = Array.from(booksBlock.querySelectorAll('.buy-button'));
    
    buttonsElemsArr.forEach((elem, index) => {
        elem.dataset.num = `${index}`;
    });
}

booksCategoriesUl.addEventListener('click', async (e) => {
    if (e.target.classList.contains('categories-ul__li')) {
        booksCategoriesUl.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        booksBlock.innerHTML = '';

        booksInfoObjectsArray = [];
        
        activeCategoryName = e.target.textContent;
        await selectedCategoryBooksLoad(activeCategoryName, 'AIzaSyC1btnaqckrhX4nOaY2sJ76QQfNmXDlUb0', 6);
        addToCartButtonDataSet();
    }
});

loadButton.addEventListener('click', async (e) => {
    const lastLoadedBooks = Array.from(booksBlock.querySelectorAll('.last-loaded-book'));
     
    lastLoadedBooks.forEach((book) => {
        book.classList = 'book';
    });
    
    await selectedCategoryBooksLoad(activeCategoryName, 'AIzaSyC1btnaqckrhX4nOaY2sJ76QQfNmXDlUb0', 6);
    addToCartButtonDataSet();
});

booksBlock.addEventListener('click', (e) => {
    if(e.target.classList.contains('buy-button')) {
        e.target.classList.add('add-to-cart', 'clicked');

        addBookToCart();        
    }
});

headerNav.addEventListener('click', (e) => {
    headerNav.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
});

//////////////////////////////////////////////////////////////////////////////////////

const sliderBanners = [{url:'./assets/banner-0.png'},
    {url:'./assets/banner-1.png'},
    {url:'./assets/banner-2.png'},];

const sliderImagesDiv = document.querySelector('.slider__images');
const sliderNavDotsDiv = document.querySelector('.slider__nav-dots');
const sliderBlocks = Array.from(document.querySelectorAll('.slider > div'));
const sliderBlock = document.querySelector('.slider');

let currActiveSliderDot;
let sliderDotsArr;

function sliderImgChange() {
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

function sliderInit(imagesArr) {
    if(!imagesArr) return;

    addObjectsToSlider(imagesArr);
}

function sliderNavDotsInit(imagesArr) {
    imagesArr.forEach((img, index) => {
        sliderNavDotsDiv.innerHTML += `<div data-num=${index} class="slider__nav-dot num${index} ${index === 0? 'active' : ''}"></div>`;
    })
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

document.addEventListener("DOMContentLoaded", () => {
    sliderInit(sliderBanners);
    sliderNavDotsInit(sliderBanners);
    sliderDotsArr = Array.from(document.querySelectorAll('.slider__nav-dot'));
    currActiveSliderDot = sliderDotsArr[0];
    
    booksCategoriesListInit(booksCategoriesArr);

    booksCategoriesUl.querySelector('.categories-ul__li').click();
    sliderImgChange();
});