import { logic } from './logic';
import { dom } from './dom';

const controller = (() => {
  const input = document.getElementById('search-input');
  const searchBtn = document.querySelector('.search-img');

  searchBtn.addEventListener('click', async () => {
    if (!input.value) {
      return;
    }

    let formatInput =
      input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();

    const data = await logic.fetchWeather(formatInput);
    const cityData = await logic.fetchCountry(formatInput);
    dom.updateDisplay(data, cityData);
    dom.updateDayContainers(data);
    input.value = '';
  });
})();
