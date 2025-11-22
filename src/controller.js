import { logic } from './logic';
import { dom } from './dom';
import { updateDefaults } from './storage';

const controller = (() => {
  const input = document.getElementById('search-input');
  const searchBtn = document.querySelector('.search-img');

  searchBtn.addEventListener('click', async () => {
    if (!input.value) {
      return;
    }

    let formatInput;

    if (input.value.split(' ').length === 1) {
      formatInput =
        input.value.charAt(0).toUpperCase() +
        input.value.slice(1).toLowerCase();
    } else {
      formatInput = input.value
        .split(' ')
        .map(
          (element) =>
            element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
        )
        .join(' ');
    }

    const data = await logic.fetchWeather(formatInput);
    const cityData = await logic.fetchCountry(formatInput);
    if (data !== null) {
      updateDefaults(formatInput);
      dom.init();
    }
    input.value = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === input) {
      searchBtn.click();
    }
  });
})();

dom.init();
