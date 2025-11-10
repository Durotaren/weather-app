export const logic = (() => {
  const apiKey = 'A58FRBCCTVYQN9LT7Q79Z67WZ';

  const fetchWeather = async (city) => {
    const result = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`
    );

    const data = await result.json();
    console.log(data);
  };

  return { fetchWeather };
})();
