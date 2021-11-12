'use strict';

import { renderCatalog } from './renderCatalog.js';
import { sortBtns, sort } from './sorting.js';
import { transformToPrice } from './common.js';

const MIN_PRICE = 100000;
const MAX_PRICE = 50000000;

const PRICE_STEP = 100000;

const filterForm = document.querySelector('.filter__form');
const filterSubmitBtn = filterForm.querySelector('.filter__button');


const checkPriceInterval = (catalogItemPrice, minFiltePrice, maxFilterPrice) => {
    return minFiltePrice <= catalogItemPrice && catalogItemPrice <= maxFilterPrice;
}


const checkType = (catalogItemType, house, flat, apartment) => {
    if (house || flat || apartment) {
        switch (catalogItemType) {
            case "house":
                return house

            case "flat":
                return flat

            case "apartment":
                return apartment
        }
    }
    else return true;
}

// correct later
const checkRoomsCount = (catalogItemRoomsCount, filterRoomsCount) => {
    switch (filterRoomsCount) {
        case 'one':
            return catalogItemRoomsCount === 1;
        case 'two':
            return catalogItemRoomsCount === 2;
        case 'three':
            return catalogItemRoomsCount === 3;
        case 'four':
            return catalogItemRoomsCount === 4;
        case 'fivemore':
            return catalogItemRoomsCount >= 5;
        default: return true;
    }
}


const getSliderValues = (value) => {
    let values = value.split(',').map(item => +item);
    return {
        min: values[0],
        max: values[1]
    }
}


const getFilterData = () => {
    const { sampleSlider, house, flat, apartments, square, rooms } = filterForm;
    
    const filterData = {
        minPrice: getSliderValues(sampleSlider.value).min,
        maxPrice: getSliderValues(sampleSlider.value).max,
        house: house.checked,
        flat: flat.checked,
        apartment: apartments.checked,
        square: +square.value,
        rooms: rooms.value
    }

    return filterData;
}


const mySliderMinValue = document.querySelector('.js-rSlider-min .value');
const mySliderMaxValue = document.querySelector('.js-rSlider-max .value');


const generateSliderValues = () => {
    const sliderValues = [];
    for (let i = MIN_PRICE; i < MAX_PRICE + 1; i += PRICE_STEP) {
        sliderValues.push(i);
    }
    return sliderValues;
}

const mySlider = new rSlider({
    target: '#sampleSlider',
    values: generateSliderValues(),
    range: true,
    tooltip: false,
    scale: true,
    labels: false,
    step: PRICE_STEP,
    width: 315,
    onChange: function (values) {
        mySliderMinValue.textContent = transformToPrice(getSliderValues(values).min);
        mySliderMaxValue.textContent = transformToPrice(getSliderValues(values).max);
    }
});

export const initFilter = (catalogData, catalogDataFiltred) => {

    const filterCatalogData = (e) => {
        e.preventDefault();
    
        const filterData = getFilterData();
    
        catalogDataFiltred.splice(0, catalogDataFiltred.length,
            ...catalogData.filter(
                elem => (
                    checkPriceInterval(elem.price, filterData.minPrice, filterData.maxPrice) &
                    checkType(elem.filters.type, filterData.house, filterData.flat, filterData.apartment) &
                    checkRoomsCount(elem.filters.roomsCount, filterData.rooms) &
                    elem.filters.area >= filterData.square
                )
            )
        );
    
        sort('popular', catalogDataFiltred);
        renderCatalog(catalogDataFiltred);
        sortBtns[0].checked = true;
    }

    filterSubmitBtn.addEventListener('click', filterCatalogData);
    
}


export const enablefilters = () => {
    sortBtns.forEach(elem => {
        elem.removeAttribute('disabled');
    });
    filterForm.querySelectorAll('input').forEach(elem => {
        elem.removeAttribute('disabled', 'disebled');
    });
    filterSubmitBtn.removeAttribute('disabled', 'disebled');
    mySlider.disabled(false);
}


export const disablefilters = () => {
    sortBtns.forEach(elem => {
        elem.setAttribute('disabled', 'disebled');
    })
    filterForm.querySelectorAll('input').forEach(elem => {
         elem.setAttribute('disabled', 'disebled');
    });
    filterSubmitBtn.setAttribute('disabled', 'disebled');
    mySlider.disabled(true);
}

