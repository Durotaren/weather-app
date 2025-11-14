import { logic } from './logic';
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

  const updateDisplay = (data) => {
    tempDisplay.textContent = `${data.currentTemp}°C`;
    todayHigh.textContent = `${Math.round(logic.fahrenheitToC(data.fiveDays[0].tempmax))}°C`;
    todayLow.textContent = `${Math.round(logic.fahrenheitToC(data.fiveDays[0].tempmin))}°C`;
    document.body.style.backgroundImage = `url(${chooseBackground(data.fiveDays[0].conditions)})`;
    mainWeatherPara.textContent = data.fiveDays[0].description;
  };

  const updateDayContainers = (data) => {
    let counter = 0;
    console.log(data);

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

  return { updateDisplay, updateDayContainers };
})();
