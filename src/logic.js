export const logic = (() => {
  const apiKey = 'A58FRBCCTVYQN9LT7Q79Z67WZ';

  const fahrenheitToC = (f) => ((f - 32) * 5) / 9;

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

      return cleanData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCountry = async (city) => {
    try {
      const result = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );

      if (!result.ok) {
        throw new Error('Failed');
      }

      const clean = await result.json();
      console.log(clean, clean.results[0].country);

      return clean.results[0].country;
    } catch (err) {
      console.error(err);
    }
  };

  const cleanData = (data) => ({
    city: data.address,
    currentTemp: Math.round(fahrenheitToC(data.currentConditions.temp)),
    desc: data.currentConditions.conditions,
    fiveDays: data.days.splice(0, 5),
  });

  return { fetchWeather, fahrenheitToC, fetchCountry };
})();
