import { logic } from './logic';

const dom = (() => {
  const input = document.getElementById('search-input');
  const searchBtn = document.querySelector('.search-img');
  const dayContainers = document.querySelectorAll('.day-container');
  const tempDisplay = document.querySelector('.temp');
  const todayRight = document.querySelector('.today-right-high');
  const todayLeft = document.querySelector('.today-right-low');

  searchBtn.addEventListener('click', () => {
    if (!input.value) {
      return;
    }

    let formatInput =
      input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();
    logic.fetchWeather(formatInput);
    input.value = '';
  });
})();

logic.fetchWeather('Sofia').then((data) => console.log(data));
