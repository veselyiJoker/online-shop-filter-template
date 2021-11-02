'use strict';

const MIN_PRICE = 100000;
const MAX_PRICE = 1000000;
const ITEMS_COUNT = 25;
const CATALOG_PAGE_ITEMS_COUNT = 7;

const MIN_SELLER_RATE = 1;
const MAX_SELLER_RATE = 5;

const MIN_BUILD_NUMBER = 1;
const MAX_BUILD_NUMBER = 100;

const MIN_REALTY_AREA = 30;
const MAX_REALTY_AREA = 300;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 10;

const MIN_PHOTOS_COUNT = 1;
const MAX_PHOTOS_COUNT = 4;

const DATE_NOW = Date.now();
const MILLISECONDS_IN_DAY = 86400000;
const MAX_DAYS_AGO_MILLISECONDS = MILLISECONDS_IN_DAY * 5;

const LOCAL_STORAGE_FAVORITE_ITEMS = 'favoriteItems';

const catalogData = [];
const catalogFavoriteItems = [];
if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_ITEMS))) catalogFavoriteItems.push(...localStorage.getItem(LOCAL_STORAGE_FAVORITE_ITEMS));

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

const categoriesData = {
    realty: {
        house: {
            type: 'Дом',
            roomsCount: MIN_ROOMS_COUNT,
            area: MIN_REALTY_AREA,
        },
        apartments: {
            type: 'Апартаменты',
            roomsCount: MIN_ROOMS_COUNT,
            area: MIN_REALTY_AREA,
        },
        flat: {
            type: 'Квартира',
            roomsCount: MIN_ROOMS_COUNT,
            area: MIN_REALTY_AREA,
        },
    }
};

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


const getRandomInteger = (min, max) => {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};


const transformToDate = (publicationDate) => {
    const dateDifference = DATE_NOW - publicationDate;

    if (dateDifference <= MILLISECONDS_IN_DAY) {
        return 'Сегодня';
    } else if (dateDifference <= MILLISECONDS_IN_DAY * 2) {
        return 'Вчера';
    } else {
        const resultDate = new Date(publicationDate);
        return `${resultDate.getDate()} ${monthsList[resultDate.getUTCMonth()]} ${resultDate.getFullYear()}`;
    }
}


const generatePhotosArray = (photosData, photosCount) => {
    let photosArray = [...photosData];
    let newPhotosArray = [];
    for (let i = 0; i < photosCount; i++) {
        newPhotosArray.push( ...photosArray.splice(getRandomInteger(0, photosArray.length - 1),1) );
    }
    return newPhotosArray;
};


const generateCatalogData = (itemsCount = ITEMS_COUNT) => {
    const newCatalogData = [];
    for (let i = 0; i < itemsCount; i++) {
        const categoryName = Object.keys(categoriesData)[getRandomInteger(0, Object.keys(categoriesData).length - 1)];
        const info = {
            type: categoriesData[categoryName][Object.keys(categoriesData[categoryName])[getRandomInteger(0, Object.keys(categoriesData[categoryName]).length - 1)]].type,
            area: getRandomInteger(MIN_REALTY_AREA, MAX_REALTY_AREA),
            roomsCount: getRandomInteger(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT),
        }
        
        newCatalogData.push({
            id: i,
            title: titlesData[getRandomInteger(0, titlesData.length - 1)],
            description: descriptionsData[getRandomInteger(0, descriptionsData.length - 1)],
            price: getRandomInteger(MIN_PRICE, MAX_PRICE),
            publicationDate: DATE_NOW - getRandomInteger(0, MAX_DAYS_AGO_MILLISECONDS),
            category: {
                categoryName: categoryName,
                info: info,
            },
            seller: {
                name: sellersNamesData[getRandomInteger(0, sellersNamesData.length - 1)],
                rating: getRandomInteger(MIN_SELLER_RATE * 10, MAX_SELLER_RATE * 10) / 10,
            },
            location: {
                city: citiesData[getRandomInteger(0, citiesData.length - 1)],
                street: streetsData[getRandomInteger(0, streetsData.length - 1)], 
                building: getRandomInteger(MIN_BUILD_NUMBER, MAX_BUILD_NUMBER),
            },
            photos: generatePhotosArray(photosData, getRandomInteger(MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT)),
            favorite: catalogFavoriteItems.find(elem => elem.id === i) ? true : false,
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
            <div class="product__date">${transformToDate(catalogItemData.publicationDate)}</div>
            </div>
        </li>
    `;
    return generateDOMItem(catalogItem);
};


const renderCatalog = (renderCatalogData, itemsCount = CATALOG_PAGE_ITEMS_COUNT) => {
    clearDOMItem(catalog);

    const fragment = document.createDocumentFragment();
    const catalogPagesData = [...renderCatalogData].slice(0, itemsCount);

    catalogPagesData.forEach(elem => {
        fragment.appendChild(generateCatalogItem(elem));
    });
    
    catalog.appendChild(fragment);
};


const addFavoriteItem = (catalogItemData) => {
    catalogItemData.favorite = true;
    catalogFavoriteItems.push(catalogItemData);
    localStorage.setItem(LOCAL_STORAGE_FAVORITE_ITEMS, JSON.stringify(catalogFavoriteItems));
}


const removeFavoriteItem = (catalogItemData) => {
    catalogItemData.favorite = false;
    catalogFavoriteItems.splice(catalogFavoriteItems.findIndex(elem => elem.id === catalogItemData.id),1);
    localStorage.setItem(LOCAL_STORAGE_FAVORITE_ITEMS, JSON.stringify(catalogFavoriteItems));
}


const onCatalogItemFavoriteBtnClick = (e) => {
    if (e.target.closest('.product__favourite.fav-add')) {
        e.preventDefault();
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
        const catalogItemData = catalogData.find(elem => elem.id === catalogItemId)
        // popup && renderPopup && showPopup is below ↓ ↓ ↓
        if (catalogItemId !== Number(popup.dataset.productId)) {
            renderPopup(catalogItemData);
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
        popupGalleryMainImg.src = catalogData[e.target.closest('.popup').dataset.productId].photos[e.target.closest('.gallery__item img').dataset.id].link;
    
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

    popupDate.textContent = transformToDate(catalogItemData.publicationDate);

    popupTitle.textContent = catalogItemData.title;

    popupPrice.textContent = transformToPrice(catalogItemData.price) + ' ₽';

    catalogItemData.favorite === true ? favoriteBtn.classList.add('fav-add--checked') : favoriteBtn.classList.remove('fav-add--checked');

    popupGalleryMainImg.src = catalogItemData.photos[0].link;

    clearDOMItem(popupGalleryList);
    popupGalleryList.appendChild(generateGalleryList(catalogItemData.photos));
    popupGalleryItems = popup.querySelectorAll('.gallery__item');

    clearDOMItem(popupChars);
    popupChars.appendChild(generateCharsItem('Площадь', catalogItemData.category.info.area));
    popupChars.appendChild(generateCharsItem('Количество комнат', catalogItemData.category.info.roomsCount));
    popupChars.appendChild(generateCharsItem('Тип недвижимости', catalogItemData.category.info.type));

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




const catalogDataSorted = [...catalogData];
const sortBtns = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');

const sort = (type, catalogData) => {

    catalogDataSorted.splice(0, catalogDataSorted.length - 1, ...catalogData);

    switch (type) {
      case 'popular':
        return catalogDataSorted ;

      case 'cheap':
        return catalogDataSorted.sort((activeItem, nextItem) => activeItem.price - nextItem.price);

      case 'new':
        return catalogDataSorted.sort((activeItem, nextItem) => nextItem.publicationDate - activeItem.publicationDate);
    }

}


sortBtns.forEach(elem => {
    elem.addEventListener('click', (e) => {
        renderCatalog(sort(e.target.value, catalogData));
    });
});




const filterForm = document.querySelector('.filter__form');
const filterSubmitBtn = filterForm.querySelector('.filter__button');
const showFavoriteBtn = document.getElementById('favourites');


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


const renderFavorites = (catalogFavoriteItems) => {
    if (!catalogFavoriteItems.length) {
        catalog.textContent = `
            У вас пока нет избранных товаров. Чтобы отметить товар, кликните на сердечко 
            в карточке объявления. Вы можете вернуться к списку всех товаров, кликнув
            ещё раз на «Показать избранные».
        `;
    } else {
        renderCatalog(catalogFavoriteItems);
    }
}


const onShowFavoritesBtnClick = () => {
    if (showFavoriteBtn.checked) {
        renderFavorites(catalogFavoriteItems);
        disablefilters();
    } else {
        renderCatalog(catalogDataSorted);
        enablefilters();
    }
}

showFavoriteBtn.addEventListener('click', onShowFavoritesBtnClick);


















var mySlider = new rSlider({
    target: '#sampleSlider',
    values: [MIN_PRICE, MAX_PRICE],
    range: true,
    tooltip: true,
    scale: true,
    labels: false,
    step: 10,
});