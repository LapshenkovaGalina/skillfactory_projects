import './scss/book.scss'
import './scss/books-block.scss'
import './scss/books-selections.scss'
import './scss/button_primary-type.scss'
import './scss/categories.scss'
import './scss/global.scss'
import './scss/header.scss'
import './scss/media_book.scss'
import './scss/media_books-block.scss'
import './scss/media_books-selections.scss'
import './scss/media_button_books-load.scss'
import './scss/media_categories.scss'
import './scss/media_header.scss'
import './scss/media_slider.scss'
import './scss/slider.scss'

import * as slider from './js/slider'
import * as booksLoad from './js/books-load'

const sliderBanners = [{url:'./assets/banner-0.png'},
    {url:'./assets/banner-1.png'},
    {url:'./assets/banner-2.png'},];

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

document.addEventListener("DOMContentLoaded", () => {
    slider.sliderInit(sliderBanners);
    slider.sliderNavDotsInit(sliderBanners);
    
    booksLoad.booksCategoriesListInit(booksCategoriesArr);
    slider.sliderImgChange();

    booksLoad.booksInit();
    booksLoad.cartInit();
});