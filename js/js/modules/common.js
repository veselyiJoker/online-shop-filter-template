import './rSlider.min.js';


const DATE_NOW = Date.now();
const MILLISECONDS_IN_DAY = 86400000;
const DEBOUNCE_INTERVAL = 300;

const RENDERED_CATALOG_ITEMS_COUNT = 7;

const monthsList = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
]


export const getCatalogItemsCount = (catalogData) => {
    return Math.min(catalogData.length, RENDERED_CATALOG_ITEMS_COUNT);
}


export const adapter = (catalogData) => {
    const catalog = [];
    
    for (let i = 0; i < catalogData.length; i++) {
        const catalogItem = catalogData[i];

        catalog.push({
            id: i,
            title: catalogItem.name,
            description: catalogItem.description,
            category: catalogItem.category,
            price: catalogItem.price,
            address: {
                city: catalogItem.address.city,
                street: catalogItem.address.street,
                building: catalogItem.address.building,
            },
            coordinates: catalogItem.coordinates,
            seller: {
                fullname: catalogItem.seller.fullname,
                rating: catalogItem.seller.rating,
            },
            publishDate: +catalogItem['publish-date'],
            photos: catalogItem.photos,
            filters: {
                type: catalogItem.filters.type,
                area: catalogItem.filters.area,    
                roomsCount: catalogItem.filters['rooms-count'],
            },
            favorite: false,
        })
    }   
    return catalog;
}


export const generateDOMItem = (template) => {
    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', template);
    return div.firstElementChild;
}


export const transformToPrice = (price) => {
    const arr = price.toString().split('');
    if (arr.length > 3) {
        for (let i = arr.length - 3; i > 0; i -= 3) {
            arr.splice(i,0,' ')
        }
    }
    return arr.join('');
}


export const clearDOMItem = (item) => {
    item.innerHTML = '';
}


export const transformToDate = (publishDate) => {
    const dateDifference = DATE_NOW - publishDate;

    if (dateDifference <= MILLISECONDS_IN_DAY) {
        return 'Сегодня';
    } else if (dateDifference <= MILLISECONDS_IN_DAY * 2) {
        return 'Вчера';
    } else {
        const resultDate = new Date(publishDate);
        return `${resultDate.getDate()} ${monthsList[resultDate.getUTCMonth()]} ${resultDate.getFullYear()}`;
    }
}


let timeout;

export const debounce = (callback) => {
    return function(){
      const funcSteps = () => { callback.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(funcSteps, DEBOUNCE_INTERVAL)
    };
}


