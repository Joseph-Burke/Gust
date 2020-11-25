const api = {
  fetchCityData: cityName => fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7a02375ad01cde29ee6c479e2e014776&units=metric`, { mode: "cors" })
    .then(response => response.json()),

  fetchColors: searchTerm => {
    searchTerm = searchTerm.split(' ').join(',');
    return fetch(`http://www.colr.org/json/tags/${searchTerm}`);
  }
};

export default api;
