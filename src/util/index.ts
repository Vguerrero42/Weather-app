import axios from "axios";

const weatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;

export const getCity = async (cityName: string, tempUnit: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPIKEY}&units=${tempUnit}`;
  let res: any = await axios.get(url);
  try {
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.error(error)
  }
  return;
};

export const deg = "\u00B0";
