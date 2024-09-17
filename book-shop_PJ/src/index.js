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

import * as slider from './slider'
import * as booksLoad from './books-load'

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