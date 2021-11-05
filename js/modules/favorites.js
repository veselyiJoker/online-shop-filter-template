'use strict';

import { disablefilters, enablefilters } from "./filtres.js";
import { renderCatalog, getCatalog } from "./renderCatalog.js";
import { getCatalogDataSorted} from "./sorting.js";

const LOCAL_STORAGE_FAVORITE_ITEMS = 'favoriteItems';

const catalogDataFavorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_ITEMS)) ? [...JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_ITEMS))] : [];

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




const showFavoritesBtn = document.getElementById('favourites');

const renderFavorites = (catalogData) => {
    if (!catalogData.length) {
        getCatalog().textContent = `
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
            renderCatalog(getCatalogDataSorted());
            enablefilters();
        }
    
    }
    showFavoritesBtn.addEventListener('click', onShowFavoritesBtnClick);
}