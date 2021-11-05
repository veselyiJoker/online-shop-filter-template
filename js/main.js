'use strict';

import { getResponse } from './modules/backend.js';
import { renderCatalog } from './modules/renderCatalog.js';
import { initSortBtns } from './modules/sorting.js';
import { initShowFavoritesBtn } from './modules/favorites.js';
import { adapter, getCatalogItemsCount } from './modules/common.js';
import { initFilter } from './modules/filtres.js';
import { initMap } from './modules/map.js';




const catalogData = [];
const catalogDataFiltred = [];
const catalogDataSorted = [];


const onLoad = (data) => {
    catalogData.splice(0, catalogData.length, ...adapter(data.products));
    catalogDataFiltred.splice(0, catalogDataFiltred.length, ...catalogData);
    catalogDataSorted.splice(0, catalogDataSorted.length, ...catalogDataFiltred);

    initProject(catalogData);
};


const onError = (errorMessage) => {
    console.log(errorMessage);
};


const initProject = (catalogData) => {
    const catalogDataItemsCount = getCatalogItemsCount(catalogData);
    renderCatalog(catalogData, catalogDataItemsCount); 
    initFilter(catalogData, catalogDataFiltred);
    initSortBtns(catalogDataFiltred, catalogDataItemsCount);
    initShowFavoritesBtn();
};


getResponse(onLoad, onError);