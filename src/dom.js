import helpers from "./helpers";
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
    const formInfo = dom.getFormInputValues(form);
    return api.fetchCityData(formInfo.city);
  },
  applyButtonEventListener: () => {
    const cityFormButton = document.getElementById("submit-city-form-button");
    cityFormButton.addEventListener("click", event => {
      dom.submitCityForm(event.target.parentElement).then(data => {
        dom.displayWeather(data);
        let weather = data.weather[0].main;
        dom.changeBackground(weather);
      });
    });
  },
  applyCityInputEventListener: () => {
    const cityInput = document.getElementById("city-input");
    const cityFormButton = document.getElementById("submit-city-form-button");
    cityInput.addEventListener("keypress", event => {
      if (event.keyCode == 13) {
        event.preventDefault();
        cityFormButton.click();
      }
    });
  },
  removePreviousDisplay: () => {
    const display = document.getElementById("display-section");
    if (display) {
      display.parentNode.removeChild(display);
    }
  },
  displayWeather: data => {
    dom.removePreviousDisplay();
    const formSection = document.getElementsByTagName("body")[0].children[0];
    const display = helpers.createContent({
      element: "section",
      id: "display-section",
      classList: ["display-section", "container"],
      children: [
        {
          element: "div",
          classList: ["card", "my-3"],
          children: [
            {
              element: "div",
              classList: ["row", "no-gutters"],
              children: [
                {
                  element: "div",
                  classList: ["col-3"],
                  children: [
                    {
                      element: "img",
                      src: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                      classList: ["weather-icon", "card-img"]
                    }
                  ]
                },
                {
                  element: "div",
                  classList: ["col-9"],
                  children: [
                    {
                      element: "div",
                      classList: ["card-body"],
                      children: [
                        {
                          element: "h3",
                          textContent: data.name,
                          classList: ["card-title"]
                        },
                        {
                          element: "p",
                          textContent: data.weather[0].description,
                          classList: ["card-text"]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });
    formSection.insertAdjacentElement("afterend", display);
  },
  modifyDocument: () => {
    dom.applyButtonEventListener();
    dom.applyCityInputEventListener();
  },
  setBodyBackground: gradient => {
    let body = document.getElementById('body');
    body.style['background-image'] = gradient;
  },
  changeBackground: searchTerm => {
    searchTerm = searchTerm.toLowerCase();
    api.fetchColors(searchTerm)
      .then(data => data.json())
      .then(obj => {
        let hexCodes = helpers.pickColors(obj.colors)
        let radialGradient =
          "radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), repeating-radial-gradient(circle, ";
        
        for (let i = 0; i < hexCodes.length - 1; i += 1) {
          radialGradient += `${hexCodes[i]} ${100 + (50*i)}px,`;
        }
        radialGradient += `${hexCodes[4]} 250px)`;
        dom.setBodyBackground(radialGradient);
        }
      )
  }
};

export default dom;
