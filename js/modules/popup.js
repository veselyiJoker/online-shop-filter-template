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
const popupCloseBtn = popup.querySelector('.popup__close');
const popupDate = popup.querySelector('.popup__date');
const popupTitle = popup.querySelector('.popup__title');
const popupPrice = popup.querySelector('.popup__price');
const popupGalery = popup.querySelector('.popup__gallery');
const favoriteBtn = popup.querySelector('.gallery__favourite.fav-add');
const popupGalleryMainImg = popup.querySelector('.gallery__main-pic img');
const popupGalleryList = popup.querySelector('.gallery__list');
let popupGalleryItems = popup.querySelectorAll('.gallery__item');
const popupChars = popup.querySelector('.popup__chars');
const popupSellerName = popup.querySelector('.seller__name');
const popupSellerRating = popup.querySelector('.seller__rating span');
const popupDescription = popup.querySelector('.popup__description p');
const popupAddress = popup.querySelector('.popup__address');


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
        default: return 'Неизвестный тип';
    }
}

export const renderPopup = (elem, catalogItemData) => {
    popupDate.textContent = transformToDate(catalogItemData.publishDate);

    popupTitle.textContent = catalogItemData.title;

    popupPrice.textContent = transformToPrice(catalogItemData.price) + ' ₽';

    catalogItemData.favorite === true ? favoriteBtn.classList.add('fav-add--checked') : favoriteBtn.classList.remove('fav-add--checked');

    popupGalleryMainImg.src = catalogItemData.photos[0];

    clearDOMItem(popupGalleryList);
    popupGalleryList.appendChild(generateGalleryList(catalogItemData.photos, catalogItemData.title));
    popupGalleryItems = popup.querySelectorAll('.gallery__item');

    clearDOMItem(popupChars);
    popupChars.appendChild(generateCharsItem('Площадь', catalogItemData.filters.area));
    popupChars.appendChild(generateCharsItem('Количество комнат', catalogItemData.filters.roomsCount));
    popupChars.appendChild(generateCharsItem('Тип недвижимости', transformToType(catalogItemData.filters.type)));

    popupSellerName.textContent = catalogItemData.seller.fullname;
    popupSellerRating.textContent = catalogItemData.seller.rating;

    popupDescription.textContent = catalogItemData.description;

    popupAddress.textContent = `
        ${catalogItemData.address.city ? catalogItemData.address.city : 'Город не найден'},
        ${catalogItemData.address.street ? catalogItemData.address.street : 'Улица не найдена'},
        ${catalogItemData.address.building ? 'Дом ' + catalogItemData.address.building : 'Дом не найден'}
    `;

    addPopupEvents(elem, catalogItemData);

    // initMap(catalogItemData.coordinates[0], catalogItemData.coordinates[1]);

    popup.classList.add('popup--active');
}



let onPopupGaleryClick;
let onPopupFavoriteBtnClick;

const addPopupEvents = (elem, catalogItemData) => {

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
   
    popup.addEventListener('click', onPopupOverlayClick);
    popupCloseBtn.addEventListener('click', onPopupCloseBtnClick);
    document.addEventListener('keydown', onEscBtnClick);
    popupGalery.addEventListener('click', onPopupGaleryClick);
    favoriteBtn.addEventListener('click', onPopupFavoriteBtnClick);
}


const removePopupEvents = () => {
    popup.removeEventListener('click', onPopupOverlayClick);
    popupCloseBtn.removeEventListener('click', onPopupCloseBtnClick);
    document.removeEventListener('keydown', onEscBtnClick);
    favoriteBtn.removeEventListener('click', onPopupFavoriteBtnClick);
    popupGalery.removeEventListener('click', onPopupGaleryClick);

    favoriteBtn.removeEventListener('click', onPopupFavoriteBtnClick);
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
