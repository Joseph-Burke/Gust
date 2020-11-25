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
    const formSection = document.getElementsByTagName("body")[0].children[1];
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
                  classList: ["col-4"],
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
                },
                {
                  element: "div",
                  classList: ["col-5"],
                  children: [
                    {
                      element: "div",
                      classList: ["card-body"],
                      children: [
                        {
                          element: "h4",
                          id: "temperature",
                          textContent: `${Math.floor(data.main.temp)}°C`,
                          classList: ["h3"],
                          "data-attribute": "celcius"
                        },
                        {
                          element: "a",
                          id: "conversion-link",
                          classList: ["conversion-link"],
                          textContent: `Click for Fahrenheit`,
                          eventListeners: [
                            [
                              "click",
                              event => {
                                event.preventDefault();
                                dom.convertTemperature();
                              }
                            ],
                            ["hover", ]
                          ]
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
    let body = document.getElementById("body");
    body.style["background-image"] = gradient;
  },
  changeBackground: searchTerm => {
    searchTerm = searchTerm.toLowerCase();
    api
      .fetchColors(searchTerm)
      .then(data => data.json())
      .then(obj => {
        let hexCodes = helpers.pickColors(obj.colors);
        let radialGradient =
          "radial-gradient(circle, rgba(225, 225, 225, 0.9), rgba(225, 225, 225, 0.8)), repeating-radial-gradient(circle, ";

        for (let i = 0; i < hexCodes.length - 1; i += 1) {
          radialGradient += `${hexCodes[i]} ${100 + 50 * i}px,`;
        }
        radialGradient += `${hexCodes[4]} 250px)`;
        dom.setBodyBackground(radialGradient);
      });
  },
  convertTemperature: () => {
    let tempElement = document.getElementById("temperature");
    if (tempElement["data-attribute"] == "celcius") {
      let celcius = tempElement.textContent;
      tempElement.textContent = helpers.convertToFahrenheit(celcius);
      tempElement["data-attribute"] = "fahrenheit";
      document.getElementById('conversion-link').textContent = 'Click for Celcius' ;
    } else if (tempElement["data-attribute"] == "fahrenheit") {
      let fahrenheit = tempElement.textContent;
      tempElement.textContent = helpers.convertToCelcius(fahrenheit);
      tempElement["data-attribute"] = "celcius";
      document.getElementById('conversion-link').textContent = 'Click for Fahrenheit' ;
    }
  }
};

export default dom;
