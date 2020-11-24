import helpers from './helpers';
import api from './api';

const dom = {
  getFormInputValues: form => {
    let inputs = form.getElementsByTagName('input');
    inputs = Array.from(inputs);
    const inputValues = {};
    inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  },
  submitCityForm: form => {
    const formInfo = dom.getFormInputValues(form);
    return api.fetchCityData(formInfo.city);
  },
  applyButtonEventListener: () => {
    const cityFormButton = document.getElementById('submit-city-form-button');
    cityFormButton.addEventListener('click', event => {
      dom.submitCityForm(event.target.parentElement).then(object => console.log(object));
    });
  },
  modifyDocument: () => {
    dom.applyButtonEventListener();
  },
};

export default dom;
