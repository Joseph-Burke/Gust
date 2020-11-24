import './styles/style.scss';

const fetchCityData = (cityName) => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7a02375ad01cde29ee6c479e2e014776`, { mode: 'cors' })
  .then(response => response.json());

const getFormInputValues = (form) => {
  let inputs = form.getElementsByTagName('input');
  inputs = Array.from(inputs);
  const inputValues = {};
  inputs.forEach(input => {
    inputValues[input.name] = input.value;
  });
  return inputValues;
};

const submitCityForm = (event) => {
  let formInfo = getFormInputValues(event.target.parentElement);
  return fetchCityData(formInfo.city)
};

const applyButtonEventListener = () => {
  let cityFormButton = document.getElementById("submit-city-form-button");
  cityFormButton.addEventListener('click', (event) => {
    submitCityForm(event)
    .then( object => console.log(object));
  })
};

const modifyDocument = () => {
  applyButtonEventListener();
}

modifyDocument();