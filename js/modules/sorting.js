'use strict';

import { debounce } from "./common.js";
import { renderCatalog } from "./renderCatalog.js";

export const catalogDataSorted = [];
export const sortBtns = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');

export const sort = (type, catalogData) => {
    catalogDataSorted.splice(0, catalogDataSorted.length, ...catalogData);

    switch (type) {
      case 'popular':
        return catalogDataSorted;

      case 'cheap':
        return catalogDataSorted.sort((activeItem, nextItem) => activeItem.price - nextItem.price);

      case 'new':
        return catalogDataSorted.sort((activeItem, nextItem) => nextItem.publishDate - activeItem.publishDate);
    }
}

export const initSortBtns = (catalogDataFiltred) => {
    catalogDataSorted.splice(0, catalogDataSorted.length, ...catalogDataFiltred);
    sortBtns.forEach(elem => {
        elem.addEventListener('click', debounce( (e) => {
                renderCatalog(sort(e.target.value, catalogDataFiltred));
            })
        );
    });
}