import { logic } from './logic';
import { defaults } from './storage';
import sunnyIcon from './assets/svgs/sunny.svg';
import partiallyClodyIcon from './assets/svgs/sunny-cloudy.svg';
import overcastIcon from './assets/svgs/overcast.svg';
import rainyIcon from './assets/svgs/rainy.svg';
import snowyIcon from './assets/svgs/snowy.svg';
import sunnyBackground from './assets/images/sunny.jpg';
import cloudyBackground from './assets/images/cloudy.jpg';
import overcastBackground from './assets/images/very-cloudy.jpg';
import rainyBackground from './assets/images/rainy.jpg';
import snowyBackground from './assets/images/snow.jpg';

export const dom = (() => {
  const body = document.body;
  const dayContainers = document.querySelectorAll('.day-container');
  const tempDisplay = document.querySelector('.temp');
  const todayHigh = document.querySelector('.today-right-high');
  const todayLow = document.querySelector('.today-right-low');
  const mainWeatherPara = document.querySelector('.main-weather-para');
  const locationDiv = document.querySelector('.location-text');
  const sunrisePara = document.querySelector('.sunrise-time');
  const sunsetPara = document.querySelector('.sunset-time');
  const hourlyTemperatures = document.querySelectorAll('.hourly-temperature');
  const widgets = document.querySelectorAll('.widget');

  const chooseSvg = (data) => {
    switch (data) {
      case 'Clear':
        return sunnyIcon;
      case 'Partially cloudy':
        return partiallyClodyIcon;
      case 'Overcast':
        return overcastIcon;
      case 'Rain':
        return rainyIcon;
      case 'Snow':
        return snowyIcon;
    }
  };

  const chooseBackground = (data) => {
    switch (data) {
      case 'Clear':
        return sunnyBackground;
      case 'Partially cloudy':
        return cloudyBackground;
      case 'Overcast':
        return overcastBackground;
      case 'Rain':
        return rainyBackground;
      case 'Snow':
        return snowyBackground;
      default:
        return overcastBackground;
    }
  };

  const updateSunriseSunset = (data) => {
    sunrisePara.textContent = data.fiveDays[0].sunrise.slice(0, 5);
    sunsetPara.textContent = data.fiveDays[0].sunset.slice(0, 5);
  };

  const updateHourly = (data) => {
    let counter = new Date().getHours() > 18 ? 18 : new Date().getHours();

    hourlyTemperatures.forEach((element) => {
      element.textContent = `${data.fiveDays[0].hours[counter].datetime.slice(0, 5)} ${Math.round(
        logic.fahrenheitToC(data.fiveDays[0].hours[counter].temp)
      )}°C`;
      counter++;
    });
  };

  const updateWhole = (data, country) => {
    updateDisplay(data, country);
    updateDayContainers(data);
  };

  const updateDisplay = (data, country) => {
    tempDisplay.textContent = `${data.currentTemp}°C`;
    todayHigh.textContent = `${Math.round(logic.fahrenheitToC(data.fiveDays[0].tempmax))}°C`;
    todayLow.textContent = `${Math.round(logic.fahrenheitToC(data.fiveDays[0].tempmin))}°C`;
    body.style.backgroundImage = `url(${chooseBackground(data.fiveDays[0].conditions)})`;
    mainWeatherPara.textContent = data.fiveDays[0].description;
    locationDiv.firstElementChild.textContent = `${data.city}, ${country}`;
    updateSunriseSunset(data);
    updateHourly(data);
    const newDate = new Date(data.fiveDays[0].datetime);
    locationDiv.lastElementChild.textContent = `( ${newDate.toLocaleDateString(
      'en-US',
      {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }
    )} )`;
  };

  const updateDayContainers = (data) => {
    let counter = 0;

    dayContainers.forEach((container) => {
      const conditions = data.fiveDays[counter].conditions
        .split(',')
        .splice(0, 1)
        .join('');

      const date = new Date(data.fiveDays[counter].datetime);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      container.firstElementChild.textContent = day;
      container.lastElementChild.textContent = `${Math.round(
        logic.fahrenheitToC(data.fiveDays[counter].tempmax)
      )}°C`;
      container.firstElementChild.nextElementSibling.src =
        chooseSvg(conditions);
      counter++;
    });
  };

  const updateWidget = (data, country, index) => {
    const arr = Array.from(widgets);
    const found = arr.find((ele) => ele.dataset.id == index);
    let countryVar = '';

    if (country.split(' ').length < 2) {
      countryVar = country;
    } else {
      let curr = country.split(' ');
      for (let i = 0; i < curr.length; i++) {
        countryVar += curr[i].charAt(0);
      }
    }

    const temperature = found.querySelector('.widget-temperature');
    const location = found.querySelector('.widget-location');
    const conditions = found.querySelector('.widget-conditions');

    temperature.textContent = `${Math.round(logic.fahrenheitToC(data.fiveDays[0].tempmax))}°C`;
    location.textContent = `${data.city}, ${countryVar}`;
    conditions.textContent = data.desc;
  };

  const init = async () => {
    for (let i = 0; i < defaults.length; i++) {
      const element = defaults[i];
      const data = await logic.fetchWeather(element);
      const cityData = await logic.fetchCountry(element);

      if (data == null) {
        return;
      }

      if (i === 0) {
        updateWhole(data, cityData);
      } else {
        updateWidget(data, cityData, i);
      }
    }
  };

  return { updateWhole, init };
})();
