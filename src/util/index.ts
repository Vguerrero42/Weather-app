import axios from "axios";

const weatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;


export const getCity = async (cityName: string, tempUnit: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPIKEY}&units=${tempUnit}`;
  const res = await axios.get(url);
  try {
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.error(error)
    return(error)
  }

};

export const handleError = (error:Error):string=> {
  let message ='';
  const uhOh = "Uh-Oh, ";
        const len = error.message.length;
        const code = error.message.slice(-3, len);
        switch (code) {
          case "404":
            message = `${uhOh} \n seems like that city doesnt exist!`;
            break;
          default:
            message = `${uhOh}\n ${error}`;
            break;
        }
  return message
}

export const deg = "\u00B0";
