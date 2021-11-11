'use strict';

import { getResponse } from './modules/backend.js';
import { renderCatalog } from './modules/renderCatalog.js';
import { initSortBtns } from './modules/sorting.js';
import { initShowFavoritesBtn } from './modules/favorites.js';
import { adapter, getCatalogItemsCount } from './modules/common.js';
import { initFilter } from './modules/filtres.js';

const catalogData = [];
const catalogDataFiltred = [];

const initProject = (catalogData) => {
    const catalogDataItemsCount = getCatalogItemsCount(catalogData);
    
    initFilter(catalogData, catalogDataFiltred);
    initSortBtns(catalogDataFiltred, catalogDataItemsCount);
    initShowFavoritesBtn();
    renderCatalog(catalogData, catalogDataItemsCount); 
};


const onLoad = (data) => {
    catalogData.splice(0, catalogData.length, ...adapter(data.products));
    catalogDataFiltred.splice(0, catalogDataFiltred.length, ...catalogData);

    initProject(catalogData);
}


const onError = (errorMessage) => {
    console.log(errorMessage);
};


getResponse(onLoad, onError);