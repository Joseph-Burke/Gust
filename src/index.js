let body = document.querySelector('body');
let test = document.createElement('p');
test.textContent = 'Hey!';
body.appendChild(test);

function fetchCityData(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7a02375ad01cde29ee6c479e2e014776`, {mode: 'cors' })
  .then(response => response.json())
  .then(data => console.log(data))
}
