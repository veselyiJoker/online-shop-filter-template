'use strict';

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
    
    catalogData.forEach(elem => {
        catalog.push({
            id: catalogData.indexOf(elem),
            title: elem.name,
            description: elem.description,
            category: elem.category,
            price: elem.price,
            address: {
                city: elem.address.city,
                street: elem.address.street,
                building: elem.address.building,
            },
            coordinates: elem.coordinates,
            seller: {
                fullname: elem.seller.fullname,
                rating: elem.seller.rating,
            },
            publishDate: +elem['publish-date'],
            photos: elem.photos,
            filters: {
                type: elem.filters.type,
                area: elem.filters.area,    
                roomsCount: elem.filters['rooms-count'],
            },
            favorite: false,
        })
    })
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

// correct later
let timeout;

export const debounce = (callback) => {
    return function(){
      const funcSteps = () => { callback.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(funcSteps, DEBOUNCE_INTERVAL)
    };
}


