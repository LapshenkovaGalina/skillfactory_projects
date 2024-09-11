const booksCategory = 'Architecture';
const booksAPIkey = 'AIzaSyC1btnaqckrhX4nOaY2sJ76QQfNmXDlUb0';
const booksNum = 6;

const makeBooksFetchUrl = (category, key, booksNum) => {
        return `https://www.googleapis.com/books/v1/volumes?q=%22subject:${category}%22&key=${key}&printType=books&startIndex=0&maxResults=${booksNum}&langRestrict=en`;
}

const fetchBooksPromise = () => {
    const fetchUrl = makeBooksFetchUrl(booksCategory, booksAPIkey, booksNum);
    console.log("fetchUrl: ", fetchUrl);
    return fetch(fetchUrl);
}

/**
 * 
 * @param {Responce} response fetch() response object
 * @returns {Boolean} whether fetch responce successfull or not
 */
const checkFetchResponse = (response) => {
    return response.ok === true;
}

/**
 * 
 * @param {JSON} item JSON object from books API fetch response
 * @returns {Object} {authors: [String], thumbnail: SVG}
 */
const parseItem = (item) => {
    console.log("parse item: ", item);
    // items/volumeInfo/authors
    return {
        //authors: parseAuthors(item.volumeInfo.authors),
        authors: item.volumeInfo.authors,
        thumbnail: item.volumeInfo.imageLinks.thumbnail
    }
}

/**
 * 
 * @param {JSON} json books API response
 * @returns {[Object<{authors: [String], thumbnail: SVG}>]}
 */
const parseBooksJSONItems = (json) => json.items.map(i => parseItem(i));



// Загрузить список книг из books API
// и переложить в удобный для обработки объект.
// Получившийся объект имеет следующий вид
// массив объектов с полями:
//   authors: массив строк
//   thumbnails: svg картинка
// т.е.:
[ 
    {
        authors: [String],
        thumbnail: String // svg
    },
    {
        authors: [String],
        thumbnail: String // svg
    }, 
]

try {
    const fetchResponse = await fetchBooksPromise();
    if (!checkFetchResponse(fetchResponse))
        throw("fetch failed");

    json = await fetchResponse.json();
    console.log('json: ', json);
    const data = await parseBooksJSONItems(json);

    console.log('data: ', data);
    
} catch(e) {
    console.error('ERROR', e);
}

