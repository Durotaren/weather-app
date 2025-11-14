import { logic } from './logic';

export const dom = (() => {
  const input = document.getElementById('search-input');
  const searchBtn = document.querySelector('.search-img');
  const dayContainers = document.querySelectorAll('.day-container');
  const tempDisplay = document.querySelector('.temp');
  const todayHigh = document.querySelector('.today-right-high');
  const todayLow = document.querySelector('.today-right-low');

  const updateDisplay = (data) => {
    tempDisplay.textContent = `${data.currentTemp}°C`;
    todayHigh.textContent = `${Math.round(logic.fahrenheitToC(data.fiveDays[0].tempmax))}°C`;
    todayLow.textContent = `${Math.round(logic.fahrenheitToC(data.fiveDays[0].tempmin))}°C`;
  };

  const updateDayContainers = (data) => {
    let counter = 0;
    console.log(data);

    dayContainers.forEach((container) => {
      const date = new Date(data.fiveDays[counter].datetime);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      container.firstElementChild.textContent = day;
      container.lastElementChild.textContent = `${Math.round(
        logic.fahrenheitToC(data.fiveDays[counter].tempmax)
      )}°C`;
      counter++;
    });
  };

  searchBtn.addEventListener('click', () => {
    if (!input.value) {
      return;
    }

    let formatInput =
      input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();
    logic.fetchWeather(formatInput).then((data) => {
      (updateDisplay(data), updateDayContainers(data));
    });
    input.value = '';
  });

  return { updateDisplay, updateDayContainers };
})();

logic.fetchWeather('Sofia').then((data) => console.log(data));
