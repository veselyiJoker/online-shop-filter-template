'use strict';

import { disablefilters, enablefilters } from "./filtres.js";
import { catalog, renderCatalog} from "./renderCatalog.js";
import { catalogDataSorted} from "./sorting.js";

const LOCAL_STORAGE_FAVORITE_ITEMS = 'favoriteItems';

const catalogDataFavorites = [];

// хотел тетнарным оператором сказали делать функцию
const generateCatalogDataFavorites = () => {
    const newCatalogDataFavorites = [];
    if (Array.isArray(JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_ITEMS)))) {
        newCatalogDataFavorites.push(...JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_ITEMS)));
    }
    return newCatalogDataFavorites;
}

catalogDataFavorites.push(...generateCatalogDataFavorites());

const showFavoritesBtn = document.getElementById('favourites');

export const checkFavorites = (catalogItemData) => {
    return catalogDataFavorites.find(elem => elem.id === catalogItemData.id) ? true : false;
}


export const addFavoriteItem = (catalogItemData) => {
    catalogItemData.favorite = true;
    catalogDataFavorites.push(catalogItemData);
    localStorage.setItem(LOCAL_STORAGE_FAVORITE_ITEMS, JSON.stringify(catalogDataFavorites));
}


export const removeFavoriteItem = (catalogItemData) => {
    catalogItemData.favorite = false;
    catalogDataFavorites.splice(catalogDataFavorites.findIndex(elem => elem.id === catalogItemData.id),1);
    localStorage.setItem(LOCAL_STORAGE_FAVORITE_ITEMS, JSON.stringify(catalogDataFavorites));
}


const renderFavorites = (catalogData) => {
    if (!catalogData.length) {
        catalog.textContent = `
            У вас пока нет избранных товаров. Чтобы отметить товар, кликните на сердечко 
            в карточке объявления. Вы можете вернуться к списку всех товаров, кликнув
            ещё раз на «Показать избранные».
        `;
    } else {
        renderCatalog(catalogData, catalogData.length);
    }
}


export const initShowFavoritesBtn = () => {

    const onShowFavoritesBtnClick = () => {
        if (showFavoritesBtn.checked) {
            renderFavorites(catalogDataFavorites);
            disablefilters();
        } else {
            renderCatalog(catalogDataSorted);
            enablefilters();
        }
    
    }
    showFavoritesBtn.addEventListener('click', onShowFavoritesBtnClick);
}