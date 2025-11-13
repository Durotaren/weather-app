export const logic = (() => {
  const apiKey = 'A58FRBCCTVYQN9LT7Q79Z67WZ';

  const fetchWeather = async (city) => {
    try {
      const result = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`
      );

      if (!result.ok) {
        throw new Error('Fail');
      }

      const data = await result.json();
      console.log(data);
      console.log(data.days);
      console.log(data.currentConditions.conditions);
      console.log(data.currentConditions.temp);
      return { data };
    } catch (err) {
      console.error(err);
    }
  };

  return { fetchWeather };
})();
