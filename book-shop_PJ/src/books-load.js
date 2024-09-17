import {parseBooksJSONItems} from './json-parse'
import {ratingStarsFill} from './rating-show'

const headerNav = document.querySelector('.header-nav');
const booksCategoriesUl = document.querySelector('.categories-ul');
const booksBlock = document.querySelector('.books');
const loadButton = document.querySelector('.button_books-load');
const inCartBooksCounter = document.querySelector('.acc-block__books-counter');

let activeCategoryName;
let booksInfoObjectsArr = [];

async function booksLoad(booksLoadUrl) {
    try {
        const response = await fetch(booksLoadUrl);

        if(!response.ok){
            throw new Error (`Response status: ${response.status}`);
        }

        let responseJson = await response.json();
        let infoItems = responseJson.items;

        loadInfoToBookTags(infoItems);
        const loadedBooksInfo = parseBooksJSONItems(responseJson);
        booksInfoObjectsArr = booksInfoObjectsArr.concat(loadedBooksInfo);

    } catch (error) {
        console.error(error);
    }
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

export function booksCategoriesListInit(categoriesArr) {
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

export function booksInit() {
    const categoryForBooksLoad = booksCategoriesUl.querySelector('.categories-ul__li');
    categoryForBooksLoad.click();
}

function addBookToCart(addToCartButton) {
    const localStorageJson = window.localStorage.getItem('cart');
    let storage = []

    if (localStorageJson !== null) {
        storage = JSON.parse(localStorageJson);
    }
    
    const bookInfo = booksInfoObjectsArr[addToCartButton.dataset.num];

    if (storage.findIndex(el => String(el.id) === String(bookInfo.id)) !== -1) {
        storage = storage.filter(el => String(el.id) !== String(bookInfo.id));

        addToCartButton.classList.remove('clicked');
        addToCartButton.textContent = 'buy now';
    } else {
        storage.push(bookInfo);

        addToCartButton.textContent = 'in the cart';
        addToCartButton.classList.add('clicked')
    }

    inCartBooksCount(storage.length);

    window.localStorage.setItem("cart", JSON.stringify(storage));
}

function addToCartButtonDataSet() {
    let buttonsElemsArr = Array.from(booksBlock.querySelectorAll('.buy-button'));
    
    buttonsElemsArr.forEach((elem, index) => {
        elem.dataset.num = `${index}`;
    });
}

export function cartInit() {
    const localStorageJson = window.localStorage.getItem('cart');
    let storage = JSON.parse(localStorageJson);

    if (storage.length != 0) {
        inCartBooksCounter.textContent = `${storage.length}`;
    } else {
        inCartBooksCounter.style.display = 'none';
    }
}

function inCartBooksCount(booksNum) {
    if (booksNum == 0){
        inCartBooksCounter.style.display = 'none';
    } else {
        inCartBooksCounter.style.display = 'flex';
        inCartBooksCounter.textContent = `${booksNum}`;
    }
    
}

booksCategoriesUl.addEventListener('click', async (e) => {
    if (e.target.classList.contains('categories-ul__li')) {
        booksCategoriesUl.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        booksBlock.innerHTML = '';

        booksInfoObjectsArr = [];
        
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
        addBookToCart(e.target);        
    }
});

headerNav.addEventListener('click', (e) => {
    headerNav.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
});