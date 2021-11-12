'use strict';

import { addFavoriteItem, removeFavoriteItem } from "./favorites.js";
import {
    clearDOMItem,
    generateDOMItem,
    transformToDate,
    transformToPrice 
} from "./common.js";
import { initMap } from "./map.js";

const popup = document.querySelector('.popup');
const popupTeamplate = popup.innerHTML;

let popupCloseBtn;
let favoriteBtn;
let popupGalery;
let popupGalleryMainImg;
let popupGalleryItems;

let onPopupGaleryClick;
let onPopupFavoriteBtnClick;


const generateGalleryItem = (photo, title, ordinalNumber) => {
    const template = `
        <li class="gallery__item ${ordinalNumber == 0 ? 'gallery__item--active' : ''}" data-ordinal-number="${ordinalNumber}">
            <img src="${photo}" width="124" height="80" alt="${title}">
        </li>
    `;
    return generateDOMItem(template);
}


const generateGalleryList = (photos, title) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++){
        fragment.appendChild(generateGalleryItem(photos[i], title, i)); 
    };
    return(fragment);
}


const generateCharsItem = (charsName, charsValue) => {
    const template = `
        <li class="chars__item">
            <div class="chars__name">${charsName}</div>
            <div class="chars__value">${charsValue}</div>
        </li>
    `;
    return generateDOMItem(template);
}


const transformToType = (type) => {
    switch (type) {
        case 'house': 
            return 'Дом';
        case 'apartment':
            return 'Апартаменты';
        case 'flat':
            return 'Квартира';
        default: 
            return '';
    }
}


const generatePopupChars = (charsData) => {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(generateCharsItem('Площадь', charsData.area) );
    fragment.appendChild(generateCharsItem('Количество комнат', charsData.roomsCount) );
    fragment.appendChild(generateCharsItem('Тип недвижимости', transformToType(charsData.type)) );

    return fragment;
}


const generatePopup = (catalogItemData) => {
    const newPopupFragment = document.createDocumentFragment();

    newPopupFragment.appendChild(generateDOMItem(popupTeamplate));

    const newPopupFavoriteBtn = newPopupFragment.querySelector('.gallery__favourite.fav-add');
    const newPopupGalleryList = newPopupFragment.querySelector('.gallery__list');
    const newPopupChars = newPopupFragment.querySelector('.popup__chars');

    newPopupFragment.querySelector('.popup__date').textContent = transformToDate(catalogItemData.publishDate);
    newPopupFragment.querySelector('.popup__title').textContent = catalogItemData.title;
    newPopupFragment.querySelector('.popup__price').textContent = transformToPrice(catalogItemData.price) + ' ₽';
    newPopupFragment.querySelector('.seller__name').textContent = catalogItemData.seller.fullname;
    newPopupFragment.querySelector('.seller__rating span').textContent = catalogItemData.seller.rating;
    newPopupFragment.querySelector('.popup__description p').textContent = catalogItemData.description;
    newPopupFragment.querySelector('.gallery__main-pic img').src = catalogItemData.photos[0];  

    newPopupFragment.querySelector('.popup__address').textContent = `
        ${catalogItemData.address.city ? catalogItemData.address.city : ''},
        ${catalogItemData.address.street ? catalogItemData.address.street : ''},
        ${catalogItemData.address.building ? 'Дом ' + catalogItemData.address.building : ''}
    `;

    if (catalogItemData.favorite) {
        newPopupFavoriteBtn.classList.add('fav-add--checked');
    } else {
        newPopupFavoriteBtn.classList.remove('fav-add--checked');
    }

    clearDOMItem(newPopupGalleryList);
    newPopupGalleryList.appendChild(generateGalleryList(catalogItemData.photos, catalogItemData.title));

    clearDOMItem(newPopupChars);
    newPopupChars.appendChild(generatePopupChars(catalogItemData.filters));

    return newPopupFragment;
}


export const renderPopup = (elem, catalogItemData) => {
    clearDOMItem(popup);
    popup.appendChild(generatePopup(catalogItemData));
    addPopupEvents(elem, catalogItemData);
    initMap(catalogItemData.coordinates[0], catalogItemData.coordinates[1]);
    popup.classList.add('popup--active');
}


const addPopupEvents = (elem, catalogItemData) => {
    popupCloseBtn = popup.querySelector('.popup__close');
    favoriteBtn = popup.querySelector('.gallery__favourite.fav-add');
    popupGalery = popup.querySelector('.popup__gallery');
    popupGalleryMainImg = popup.querySelector('.gallery__main-pic img');
    popupGalleryItems = popup.querySelectorAll('.gallery__item');

    onPopupGaleryClick = (e) => {
        if (e.target.closest('.gallery__item')) {
            popupGalleryMainImg.src = catalogItemData.photos[e.target.closest('.gallery__item').dataset.ordinalNumber];
        
            popupGalleryItems.forEach(elem => {
                elem.classList.remove('gallery__item--active');
            });
            e.target.closest('.gallery__item').classList.add('gallery__item--active');
        }
    }

    onPopupFavoriteBtnClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.closest('.gallery__favourite.fav-add').blur();
    
        if (!catalogItemData.favorite) {
            e.target.closest('.gallery__favourite.fav-add').classList.add('fav-add--checked');
            addFavoriteItem(catalogItemData);
            elem.querySelector('.product__favourite.fav-add').classList.add('fav-add--checked');
        } else {
            e.target.closest('.gallery__favourite.fav-add').classList.remove('fav-add--checked');
            removeFavoriteItem(catalogItemData);
            elem.querySelector('.product__favourite.fav-add').classList.remove('fav-add--checked');
        }
    }
   
    document.addEventListener('keydown', onEscBtnClick);
    popup.addEventListener('click', onPopupOverlayClick);
    popupCloseBtn.addEventListener('click', onPopupCloseBtnClick);
    popupGalery.addEventListener('click', onPopupGaleryClick);
    favoriteBtn.addEventListener('click', onPopupFavoriteBtnClick);
}


const removePopupEvents = () => {
    document.removeEventListener('keydown', onEscBtnClick);
    popup.removeEventListener('click', onPopupOverlayClick);
    popupCloseBtn.removeEventListener('click', onPopupCloseBtnClick);
    favoriteBtn.removeEventListener('click', onPopupFavoriteBtnClick);
    popupGalery.removeEventListener('click', onPopupGaleryClick);
}


const closePopup = () => {
    removePopupEvents();
    popup.classList.remove('popup--active');
}


const onPopupOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) {
        closePopup();
    }
}


const onPopupCloseBtnClick = () => {
    closePopup();
}


const onEscBtnClick = (e) => {
    if (e.key === 'Escape') {
        e.preventDefault()
        closePopup();
    }
}
