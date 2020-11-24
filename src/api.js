const api = {
  fetchCityData: cityName => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7a02375ad01cde29ee6c479e2e014776`,
      { mode: "cors" }
    ).then(response => response.json());
  }
};

export default api;
