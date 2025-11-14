export const logic = (() => {
  const apiKey = 'A58FRBCCTVYQN9LT7Q79Z67WZ';

  function fahrenheitToC(f) {
    return ((f - 32) * 5) / 9;
  }

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

  const cleanData = (data) => ({
    city: data.address,
    currentTemp: Math.floor(fahrenheitToC(data.currentConditions.temp)),
    desc: data.currentConditions.conditions,
    fiveDays: data.days.splice(0, 5),
  });
  return { fetchWeather };
})();
