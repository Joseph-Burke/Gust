import { createContent } from "./helpers";
import api from "./api";

const dom = {
  getFormInputValues: form => {
    let inputs = form.getElementsByTagName("input");
    inputs = Array.from(inputs);
    const inputValues = {};
    inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  },
  submitCityForm: form => {
    let formInfo = dom.getFormInputValues(form);
    return api.fetchCityData(formInfo.city);
  },
  applyButtonEventListener: () => {
    let cityFormButton = document.getElementById("submit-city-form-button");
    cityFormButton.addEventListener("click", event => {
      dom.submitCityForm(event.target.parentElement).then(object =>
        console.log(object)
      );
    });
  },
  modifyDocument: () => {
    dom.applyButtonEventListener();
  }
};

export default dom;
