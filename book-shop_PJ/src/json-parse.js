const parseItem = (item) => {
    console.log("parse item: ", item);

    return {
        authors: item.volumeInfo.authors,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
        title: item.volumeInfo?.title,
        averageRating: item.volumeInfo?.averageRating,
        ratingsCount: item.volumeInfo?.ratingsCount,
        description: item.volumeInfo?.description,
        retailPrice: item.saleInfo?.retailPrice?.amount,
        id: item.id
    }
}

export const parseBooksJSONItems = (json) => json.items.map(i => parseItem(i));
