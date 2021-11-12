'use strict';

import { renderPopup } from "./popup.js";

import {
    checkFavorites,
    addFavoriteItem,
    removeFavoriteItem 
} from "./favorites.js";

import {
    generateDOMItem,
    transformToPrice,
    clearDOMItem,
    transformToDate,
    getCatalogItemsCount,
} from "./common.js";


export const catalog = document.querySelector('.results__list');
const renderedCatalogData = [];

const generateCatalogItem = (catalogItemData) => {   
    const catalogItem = `
        <li class="results__item product" data-id="${catalogItemData.id}">
            <button class="product__favourite fav-add ${catalogItemData.favorite ? 'fav-add--checked' : ''}" type="button" aria-label="Добавить в избранное">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
            </button>
            <div class="product__image">
            <div class="product__image-more-photo hidden">+2 фото</div>
            <img src="${catalogItemData.photos[0]}" width="318" height="220" alt="${catalogItemData.title}">
            </div>
            <div class="product__content">
            <h3 class="product__title">
                <a href="#">${catalogItemData.title}</a>
            </h3>
            <div class="product__price">${transformToPrice(catalogItemData.price)} ₽</div>
            <div class="product__address">
                ${catalogItemData.address.city ? catalogItemData.address.city : 'Город не найден'},
                ${catalogItemData.address.street ? catalogItemData.address.street : 'ул. ненайдена'}
            </div>
            <div class="product__date">${transformToDate(catalogItemData.publishDate)}</div>
            </div>
        </li>
    `;
    return generateDOMItem(catalogItem);
};


const onCatalogItemClick = (e) => {
    if (e.target.closest('.product__image') || e.target.closest('.product__title')) {
        e.preventDefault();
        const catalogItemId = Number(e.target.closest('.product').dataset.id);
        renderPopup(e.target.closest('.product'), renderedCatalogData.find(elem => elem.id === catalogItemId));
    }
}


const onCatalogItemFavoriteBtnClick = (e) => {
    e.preventDefault();
    e.target.closest('.product__favourite.fav-add').blur();

    const catalogItemId = Number(e.target.closest('.product').dataset.id);
    const catalogItemData = renderedCatalogData.find(elem => elem.id === catalogItemId);

    if (!catalogItemData.favorite) {
        e.target.closest('.product__favourite.fav-add').classList.add('fav-add--checked');
        addFavoriteItem(catalogItemData);
    } else {
        e.target.closest('.product__favourite.fav-add').classList.remove('fav-add--checked');
        removeFavoriteItem(catalogItemData);
    }
}

const addCatalogEvents = (catalogItems) => {
    catalogItems.forEach(elem => {
        elem.addEventListener('click', onCatalogItemClick);
        elem.querySelector('button.fav-add').addEventListener('click', onCatalogItemFavoriteBtnClick);
    });
}


const removeCatalogEvents = (catalogItems) => {
    catalogItems.forEach(elem => {
        elem.removeEventListener('click', onCatalogItemClick);
        elem.querySelector('button.fav-add').removeEventListener('click', onCatalogItemFavoriteBtnClick);
    });
}

export const renderCatalog = (catalogData, itemsCount = getCatalogItemsCount(catalogData)) => {
    removeCatalogEvents(catalog.querySelectorAll('.results__item'));
    clearDOMItem(catalog);

    const fragment = document.createDocumentFragment();
    renderedCatalogData.splice(0, renderedCatalogData.length, ...catalogData.slice(0, itemsCount));


    renderedCatalogData.forEach(elem => {
        elem.favorite = checkFavorites(elem);
        fragment.appendChild(generateCatalogItem(elem));
    });
    
    catalog.appendChild(fragment);

    addCatalogEvents(catalog.querySelectorAll('.results__item'), renderedCatalogData);
};
