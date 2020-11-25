const api = {
  fetchCityData: cityName => fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7a02375ad01cde29ee6c479e2e014776`, { mode: "cors" })
    .then(response => response.json()),

  fetchFlickrImage: searchTerm => {
    return fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=423e997c88502153689ce5ae957e4cf9&text=${searchTerm + '%20weather%20sky'}&format=json&nojsoncallback=1`
    )
      .then(response => response.json())
      .then(data => data.photos.photo[0])
      .then(photoObj => {
        const { server, id, secret, size } = photoObj;
        return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
      });
  }
};

export default api;
