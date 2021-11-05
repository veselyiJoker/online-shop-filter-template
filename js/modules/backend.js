'use strict';

const SERVER_URL =  "https://morfey216.github.io/online-store-bd/bd.json";

export const getResponse = (onLoad, onError) => {
  fetch(SERVER_URL)
    .then(respons => respons.json())
    .then(data => { onLoad(data) })
    .catch(err => onError(err))
};