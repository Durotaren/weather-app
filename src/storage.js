export let defaults = ['San Francisco', 'Sydney', 'Prague'];

export const updateDefaults = (city) => {
  defaults.pop();
  defaults.unshift(city);
  console.log(defaults);
};
