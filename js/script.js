'use strict';

const MIN_PRICE = 100000;
const MAX_PRICE = 1000000;

const PRICE_STEP = 1000;

const ITEMS_COUNT = 25;
const CATALOG_PAGE_ITEMS_COUNT = 7;

const MIN_SELLER_RATE = 1;
const MAX_SELLER_RATE = 5;

const MIN_BUILD_NUMBER = 1;
const MAX_BUILD_NUMBER = 100;

const MIN_REALTY_AREA = 30;
const MAX_REALTY_AREA = 250;

const MIN_COUNT_ROOMS = 1;
const MAX_COUNT_ROOMS = 10;

const MIN_COUNT_PHOTOS = 1;
const MAX_COUNT_PHOTOS= 4;

const DATE_NOW = Date.now();
const MILLISECONDS_IN_DAY = 86400000;
const MAX_DAYS_AGO_MILLISECONDS = MILLISECONDS_IN_DAY * 5;

const LOCAL_STORAGE_FAVORITE_ITEMS = 'favoriteItems';

const catalogData = [];

const titlesData = [
    'Загородный дом с видом на озеро',
    '1-комнатная квартира в центре Питера',
    '3-комнатная квартира рядом с Кремлём',
    'Студия для аскетов',
    'Апартаменты для фрилансера'
];

const descriptionsData = [
    'Студия с лаконичным дизайном возле Ангары.',
    'Трёхкомнатная квартира для большой семьи рядом с Кремлём.',
    '2 минуты до набережной и прекрасного вида на Волгу',
    'В квартире есть сауна, джакузи и домашний кинотеатр.Перепланировка согласована.',
    'Уютная однушка в тихом спальном районе. Рядом лес и озёра.',
    'Деревянный дом на берегу озера. На первом этаже кухня-гостиная, на втором этаже спальня. Идеально для пары без детей. В доме много окон, поэтому много света. Дизайнерская мебель входит в стоимость дома.'
];

const sellersNamesData = [
    'Бюро Семёна',
    'Игнат-Агент',
    'Виталий Петрович',
    'Марья Андреевна'
];

const citiesData = [
    'Иркутск',
    'Москва',
    'Красноярск',
    'Минск'
];

const streetsData = [
    'ул. Шахтеров',
    'ул. Полярная',
    'ул. Лиственная',
    'ул. Мира',
    'ул. Советская'
];

const photosData = [
    {
        link: 'img/apt_1.png',
        description: 'best image ever'
    },
    {
        link: 'img/apt_2.png',
        description: 'best image ever'
    },
    {
        link: 'img/apt_3.png',
        description: 'best image ever'
    },    
    {
        link: 'img/apt_4.png',
        description: 'best image ever'
    },
    {
        link: 'img/apt_5.png',
        description: 'best image ever'
    },
    {
        link: 'img/apt_6.png',
        description: 'best image ever'
    },
    {
        link: 'img/house_1.png',
        description: 'best image ever'
    },
    {
        link: 'img/house_2.png',
        description: 'best image ever'
    },
    {
        link: 'img/house_3.png',
        description: 'best image ever'
    },
    {
        link: 'img/house_4.png',
        description: 'best image ever'
    },
    {
        link: 'img/item4.jpg',
        description: 'best image ever'
    },
];

const typesData = [
    "house",
    "apartment",
    "flat"
];

const monthsList = [
    'Января',
    'Февраля',
    'Марта',
    'Апереля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];

const catalogFavoritesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_ITEMS)) ? [...JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_ITEMS))] : [];

let showFavorites;





const getRandomInteger = (min, max) => {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};


const transformToDate = (publishDate) => {
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


const generatePhotosArray = (photosData, photosCount) => {
    const newPhotosArray = [];
    for (let i = 0; i < photosCount; i++) {
        newPhotosArray.push( photosData[getRandomInteger(0, photosData.length - 1)] );
    }
    return newPhotosArray;
};


const generateCatalogData = (itemsCount = ITEMS_COUNT) => {
    const newCatalogData = [];
    for (let i = 0; i < itemsCount; i++) {        
        newCatalogData.push({
            id: i,
            title: titlesData[getRandomInteger(0, titlesData.length - 1)],
            description: descriptionsData[getRandomInteger(0, descriptionsData.length - 1)],
            price: getRandomInteger(MIN_PRICE, MAX_PRICE),
            publishDate: DATE_NOW - getRandomInteger(0, MAX_DAYS_AGO_MILLISECONDS),
            category: 'Недвижимость',
            seller: {
                name: sellersNamesData[getRandomInteger(0, sellersNamesData.length - 1)],
                rating: getRandomInteger(MIN_SELLER_RATE * 10, MAX_SELLER_RATE * 10) / 10,
            },
            location: {
                city: citiesData[getRandomInteger(0, citiesData.length - 1)],
                street: streetsData[getRandomInteger(0, streetsData.length - 1)], 
                building: getRandomInteger(MIN_BUILD_NUMBER, MAX_BUILD_NUMBER),
            },
            photos: generatePhotosArray(photosData, getRandomInteger(MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS)),
            filtres: {
                type: typesData[getRandomInteger(0, typesData.length - 1)],
                area: getRandomInteger(MIN_REALTY_AREA, MAX_REALTY_AREA),
                roomsCount: getRandomInteger(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS),
            },
            favorite: catalogFavoritesData.find(elem => elem.id === i) ? true : false,
        });
    }
    return newCatalogData;
};

catalogData.push(...generateCatalogData());





const catalog = document.querySelector('.results__list');

const clearDOMItem = (item) => {
    item.innerHTML = '';
}


const generateDOMItem = (template) => {
    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', template);
    return div.firstElementChild;
}


const transformToPrice = (price) => {
    const arr = price.toString().split('');
    if (arr.length > 3) {
        for (let i = arr.length - 3; i > 0; i -= 3) {
            arr.splice(i,0,' ')
        }
    }
    return arr.join('');
}


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
            <img src="${catalogItemData.photos[0].link}" width="318" height="220" alt="${catalogItemData.photos[0].description}">
            </div>
            <div class="product__content">
            <h3 class="product__title">
                <a href="#">${catalogItemData.title}</a>
            </h3>
            <div class="product__price">${transformToPrice(catalogItemData.price)} ₽</div>
            <div class="product__address">
                ${catalogItemData.location.city ? catalogItemData.location.city : 'Город не найден'},
                ${catalogItemData.location.street ? catalogItemData.location.street : 'ул. ненайдена'}
            </div>
            <div class="product__date">${transformToDate(catalogItemData.publishDate)}</div>
            </div>
        </li>
    `;
    return generateDOMItem(catalogItem);
};


const renderCatalog = (catalogData, itemsCount = CATALOG_PAGE_ITEMS_COUNT) => {
    clearDOMItem(catalog);

    const fragment = document.createDocumentFragment();
    const catalogPagesData = [...catalogData].slice(0, itemsCount);

    catalogPagesData.forEach(elem => {
        fragment.appendChild(generateCatalogItem(elem));
    });
    
    catalog.appendChild(fragment);
};


const addFavoriteItem = (catalogItemData) => {
    catalogItemData.favorite = true;
    catalogFavoritesData.push(catalogItemData);
    localStorage.setItem(LOCAL_STORAGE_FAVORITE_ITEMS, JSON.stringify(catalogFavoritesData));
}


const removeFavoriteItem = (catalogItemData) => {
    catalogItemData.favorite = false;
    catalogFavoritesData.splice(catalogFavoritesData.findIndex(elem => elem.id === catalogItemData.id),1);
    localStorage.setItem(LOCAL_STORAGE_FAVORITE_ITEMS, JSON.stringify(catalogFavoritesData));
}


const onCatalogItemFavoriteBtnClick = (e) => {
    if (e.target.closest('.product__favourite.fav-add')) {
        e.preventDefault();
        e.target.closest('.product__favourite.fav-add').blur();

        const catalogItemId = Number(e.target.closest('.product').dataset.id);
        const catalogItemData = catalogData.find(elem => elem.id === catalogItemId);

        if (!catalogItemData.favorite) {
            e.target.closest('.product__favourite.fav-add').classList.add('fav-add--checked');
            addFavoriteItem(catalogItemData);
        } else {
            e.target.closest('.product__favourite.fav-add').classList.remove('fav-add--checked');
            removeFavoriteItem(catalogItemData);
        }
    }
}


const onCatalogItemClick = (e) => {
    if (e.target.closest('.product__image') || e.target.closest('.product__title')) {
        e.preventDefault();
        const catalogItemId = Number(e.target.closest('.product').dataset.id);

        // renderPopup && showPopup is below ↓ ↓ ↓
        if (showFavorites) {
            renderPopup(catalogFavoritesData.find(elem => elem.id === catalogItemId));
        } else {
            renderPopup(catalogData.find(elem => elem.id === catalogItemId));
        }
        showPopup();
    }
}


const onCatalogClick = (e) => {
    if (e.target.closest('.product')) {
        onCatalogItemFavoriteBtnClick(e);
        onCatalogItemClick(e);
    }
};


renderCatalog(catalogData);
catalog.addEventListener('click', onCatalogClick);





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


const generateGalleryItem = (photo, id) => {
    const template = `
        <li class="gallery__item ${id == 0 ? 'gallery__item--active': ''}">
            <img src="${photo.link}" width="124" height="80" alt="${photo.description}" data-id="${id}">
        </li>
    `;
    return generateDOMItem(template);
}


const generateGalleryList = (photos) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++){
        fragment.appendChild(generateGalleryItem(photos[i], i)); 
    };
    return(fragment);
}


const onPopupGaleryClick = (e) => {
    if (e.target.closest('.gallery__item')) {

        if (showFavorites) {
            popupGalleryMainImg.src = catalogFavoritesData[e.target.closest('.popup').dataset.productId].photos[e.target.closest('.gallery__item img').dataset.id].link;
        } else {
            popupGalleryMainImg.src = catalogData[e.target.closest('.popup').dataset.productId].photos[e.target.closest('.gallery__item img').dataset.id].link;
        }
    
        popupGalleryItems.forEach(elem => {
            elem.classList.remove('gallery__item--active');
        });
        e.target.closest('.gallery__item').classList.add('gallery__item--active');
    }
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


const renderPopup = (catalogItemData) => {
    popup.setAttribute('data-product-id', catalogItemData.id);

    popupDate.textContent = transformToDate(catalogItemData.publishDate);

    popupTitle.textContent = catalogItemData.title;

    popupPrice.textContent = transformToPrice(catalogItemData.price) + ' ₽';

    catalogItemData.favorite === true ? favoriteBtn.classList.add('fav-add--checked') : favoriteBtn.classList.remove('fav-add--checked');

    popupGalleryMainImg.src = catalogItemData.photos[0].link;

    clearDOMItem(popupGalleryList);
    popupGalleryList.appendChild(generateGalleryList(catalogItemData.photos));
    popupGalleryItems = popup.querySelectorAll('.gallery__item');

    clearDOMItem(popupChars);
    popupChars.appendChild(generateCharsItem('Площадь', catalogItemData.filtres.area));
    popupChars.appendChild(generateCharsItem('Количество комнат', catalogItemData.filtres.roomsCount));
    popupChars.appendChild(generateCharsItem('Тип недвижимости', catalogItemData.filtres.type));

    popupSellerName.textContent = catalogItemData.seller.name;
    popupSellerRating.textContent = catalogItemData.seller.rating;

    popupDescription.textContent = catalogItemData.description;

    popupAddress.textContent = `
        ${catalogItemData.location.city ? catalogItemData.location.city : 'Город не найден'},
        ${catalogItemData.location.street ? catalogItemData.location.street : 'Улица не найдена'},
        ${catalogItemData.location.building ? 'Дом ' + catalogItemData.location.building : 'Дом не найден'}
    `;
}


const addPopupEvents = () => {
    popup.addEventListener('click', onPopupOverlayClick);
    popupCloseBtn.addEventListener('click', onPopupCloseBtnClick);
    document.addEventListener('keydown', onEscBtnClick);

    favoriteBtn.addEventListener('click', onPopupFavoriteBtnClick);

    popupGalery.addEventListener('click', onPopupGaleryClick);
}


const removePopupEvents = () => {
    popup.removeEventListener('click', onPopupOverlayClick);
    popupCloseBtn.removeEventListener('click', onPopupCloseBtnClick);
    document.removeEventListener('keydown', onEscBtnClick);

    favoriteBtn.removeEventListener('click', onPopupFavoriteBtnClick);

    popupGalery.removeEventListener('click', onPopupGaleryClick);
}


const showPopup = () => {
    addPopupEvents();
    popup.classList.add('popup--active');
}


const hidePopup = () => {
    removePopupEvents();
    popup.classList.remove('popup--active');
}


const onPopupOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) {
        hidePopup();
    }
}


const onPopupCloseBtnClick = () => {
    hidePopup();
}


const onEscBtnClick = (e) => {
    if (e.key === 'Escape') {
        e.preventDefault()
        hidePopup();
    }
}


const onPopupFavoriteBtnClick = (e) => {
    e.preventDefault();
    e.target.closest('.gallery__favourite.fav-add').blur();

    const catalogItemId = Number(e.target.closest('.popup').dataset.productId);
    const catalogItemData = catalogData.find(elem => elem.id === catalogItemId);

    if (!catalogItemData.favorite) {
        e.target.closest('.gallery__favourite.fav-add').classList.add('fav-add--checked');
        addFavoriteItem(catalogItemData);
        catalog.querySelector(`.product[data-id="${catalogItemId}"]`).querySelector('.product__favourite.fav-add').classList.add('fav-add--checked');
    } else {
        e.target.closest('.gallery__favourite.fav-add').classList.remove('fav-add--checked');
        removeFavoriteItem(catalogItemData);
        catalog.querySelector(`.product[data-id="${catalogItemId}"]`).querySelector('.product__favourite.fav-add').classList.remove('fav-add--checked');
    }

}




const catalogDataFiltred = [...catalogData];
const catalogDataSorted = [...catalogDataFiltred];
const sortBtns = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');


const sort = (type) => {
    catalogDataSorted.splice(0, catalogDataSorted.length, ...catalogDataFiltred);

    switch (type) {
      case 'popular':
        return catalogDataSorted ;

      case 'cheap':
        return catalogDataSorted.sort((activeItem, nextItem) => activeItem.price - nextItem.price);

      case 'new':
        return catalogDataSorted.sort((activeItem, nextItem) => nextItem.publishDate - activeItem.publishDate);
    }
}


sortBtns.forEach(elem => {
    elem.addEventListener('click', (e) => {
        renderCatalog(sort(e.target.value));
    });
});





const filterForm = document.querySelector('.filter__form');
const filterSubmitBtn = filterForm.querySelector('.filter__button');
const showFavoritesBtn = document.getElementById('favourites');


const renderFavorites = (catalogFavoritesData) => {
    if (!catalogFavoritesData.length) {
        catalog.textContent = `
            У вас пока нет избранных товаров. Чтобы отметить товар, кликните на сердечко 
            в карточке объявления. Вы можете вернуться к списку всех товаров, кликнув
            ещё раз на «Показать избранные».
        `;
    } else {
        renderCatalog(catalogFavoritesData, catalogFavoritesData.length);
    }
}


const enablefilters = () => {
    sortBtns.forEach(elem => {
        elem.removeAttribute('disabled');
    });
    filterForm.querySelectorAll('input').forEach(elem => {
        elem.removeAttribute('disabled', 'disebled');
    });
    filterSubmitBtn.removeAttribute('disabled', 'disebled');
    mySlider.disabled(false);
}


const disablefilters = () => {
    sortBtns.forEach(elem => {
        elem.setAttribute('disabled', 'disebled');
    })
    filterForm.querySelectorAll('input').forEach(elem => {
        elem.setAttribute('disabled', 'disebled');
    });
    filterSubmitBtn.setAttribute('disabled', 'disebled');
    mySlider.disabled(true);
}


const onShowFavoritesBtnClick = () => {
    if (showFavoritesBtn.checked) {
        renderFavorites(catalogFavoritesData);
        disablefilters();
        showFavorites = true;
    } else {
        renderCatalog(catalogDataSorted);
        enablefilters();
        showFavorites = false;
    }
}

showFavoritesBtn.addEventListener('click', onShowFavoritesBtnClick);




const getSliderValues = (value) => {
    return value.split(',').map(item => +item);
}

const checkCardPrice = (catalogItemPrice, minFiltePrice, maxFilterPrice) => {
    return minFiltePrice <= catalogItemPrice && catalogItemPrice <= maxFilterPrice;
}

const getFilterData = () => {
    const { sampleSlider, house, flat, apartments, square, rooms } = filterForm;
    
    const filterData = {
        minPrice: getSliderValues(sampleSlider.value)[0],
        maxPrice: getSliderValues(sampleSlider.value)[1],
        house: house.checked,
        flat: flat.checked,
        apartments: apartments.checked,
        square: +square.value,
        rooms: rooms.value
    }

    return filterData;
}


const filterCatalogData = (e) => {
    e.preventDefault();

    const filterData = getFilterData();
    catalogDataFiltred.splice(0, catalogDataFiltred.length,
        ...catalogData.filter(
            elem => (
                checkCardPrice(elem.price, filterData.minPrice, filterData.maxPrice)
            )
        )
    );

    sort('popular');
    renderCatalog(catalogDataFiltred);
}

filterSubmitBtn.addEventListener('click', filterCatalogData);












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
    scale: true,
    labels: false,
    step: PRICE_STEP,
    width: 315,
});




