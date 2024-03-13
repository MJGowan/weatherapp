function saveToLocalStorage(city){
    let favorites = getLocalStorage();
    favorites.push(city);
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

function getLocalStorage(){
    let localStorageData = localStorage.getItem('Favorites');
    return localStorageData == null ? [] :  JSON.parse(localStorageData);
}

function removeFromLocalStorage(city){
    let favorites = getLocalStorage();
    let index = favorites.indexOf(city);
    favorites.splice(index, 1);
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage }