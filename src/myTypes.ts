export interface Weather {
  tempUnit:string,
  base:string
    coord:{
      lon:number,
      lat:number
    }
    weather: [
      {
        id: number,
        main: string,
        description: string,
        icon: string
      }
    ],
    main: {
      feels_like:number,
      temp: number,
      pressure: number,
      humidity: number,
      temp_min: number,
      temp_max: number
    },
    visibility: number,
    wind: {
      speed: number,
      deg: number,
      gust:number
    },
    dt: number,
    sys: {
      type: number,
      id: number,
      message?: number,
      country: string,
      sunrise: number,
      sunset: number
    },
    clouds:{
      all:number
    },
    timezone:number,
    id: number,
    name: string,
    cod: number
}

export interface InfoProps {
  info: {
    label: string;
    value: string | [string, string];
  };
}

