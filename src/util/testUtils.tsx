import { deg } from ".";

export const testCitiesArr = [
  {
    tempUnit: "imperial",
    coord: { lon: -74.006, lat: 40.7143 },
    weather: [
      { id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" },
    ],
    base: "stations",
    main: {
      temp: 43.38,
      feels_like: 35.55,
      temp_min: 41,
      temp_max: 45.16,
      pressure: 1003,
      humidity: 54,
    },
    visibility: 10000,
    wind: { speed: 17.27, deg: 290, gust: 26.46 },
    clouds: { all: 90 },
    dt: 1637958039,
    sys: {
      type: 1,
      id: 5141,
      country: "US",
      sunrise: 1637927753,
      sunset: 1637962282,
    },
    timezone: -18000,
    id: 5128581,
    name: "New York",
    cod: 200,
  },
  {
    tempUnit: "metric",
    coord: { lon: -118.2437, lat: 34.0522 },
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
    ],
    base: "stations",
    main: {
      temp: 75.76,
      feels_like: 73.45,
      temp_min: 71.06,
      temp_max: 83.32,
      pressure: 1019,
      humidity: 9,
    },
    visibility: 10000,
    wind: { speed: 3.44, deg: 0 },
    clouds: { all: 1 },
    dt: 1637958326,
    sys: {
      type: 1,
      id: 3694,
      country: "US",
      sunrise: 1637937386,
      sunset: 1637973887,
    },
    timezone: -28800,
    id: 5368361,
    name: "Los Angeles",
    cod: 200,
  },
  {
    tempUnit: "imperial",
    coord: { lon: -5.3526, lat: 36.1447 },
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
    ],
    base: "stations",
    main: {
      temp: 53.55,
      feels_like: 52.45,
      temp_min: 51.84,
      temp_max: 53.55,
      pressure: 1013,
      humidity: 82,
    },
    visibility: 10000,
    wind: { speed: 13.8, deg: 280 },
    clouds: { all: 1 },
    dt: 1637958776,
    sys: {
      type: 1,
      id: 7026,
      country: "GI",
      sunrise: 1637910565,
      sunset: 1637946508,
    },
    timezone: 3600,
    id: 2411585,
    name: "Gibraltar",
    cod: 200,
  },
];

const randomInt = (limit: number) => {
  return Math.floor(Math.random() * limit);
};

const utilObjForProps = {
  types: ["Temperature", "Feels Like", "Hi/Low", "Wind Speed (mph)"],
  temperatures: [
    "36° F",
    "25° F",
    "55° F",
    "88° F",
    "5° C",
    "44° C",
    "2° C",
    "12° F",
  ],
};

export const createWeatherObj = () => {
  const ind = randomInt(testCitiesArr.length);
  const testCity = testCitiesArr[ind];
  return testCity;
};

export const randomProps = () => {
  const ind = randomInt(utilObjForProps.types.length);
  const type = utilObjForProps.types[ind];
  let temps = utilObjForProps.temperatures;
  let val: any = temps[randomInt(temps.length)];
  let temp = val.slice(0, 2);
  switch (type) {
    case "Feels Like":
      break;
    case "Hi/Low":
      let hi = `${Number(temp) + randomInt(10)}`;
      let low = `${Number(temp) - randomInt(10)}`;
      val = [hi, low];
      break;
    case "Wind Speed (mph)":
      val = `${randomInt(20)}`;
      break;
  }
  return {
    info: {
      label: type,
      value: val,
    },
  };
};
