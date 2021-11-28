import React from "react";
import { Flex, Text } from "@chakra-ui/layout";

import { Weather } from "../myTypes";
import { CityInfoItem } from "./index";
import { deg } from "../util";

interface Props {
  weather: Weather;
}

const CityInfo: React.FC<Props> = ({ weather }) => {
  const tempVal = `${Math.floor(weather.main.temp)}${deg} ${
    weather.tempUnit === "imperial" ? "F" : "C"
  }`;
  const feelsLike = `${Math.floor(weather.main.feels_like)}${deg}`;
  const hiLow = [
    `${Math.floor(weather.main.temp_max)}${deg}`,
    `${Math.floor(weather.main.temp_min)}${deg}`,
  ];
  const windSpeed = `${weather.wind.speed}`;

  return (
    <Flex
      m="3"
      p="3"
      flexDirection="column"
      border="2px solid"
      borderColor="gray.300"
      w="85vw"
      maxWidth="650px"
    >
      <Text
        fontSize="xl"
        data-testid="weather-text"
        borderBottom="1px solid black"
        alignSelf="center"
      >
        Weather in {weather.name}, {weather.sys.country}
      </Text>
      <CityInfoItem
        info={{
          label: "Temperature",
          value: tempVal,
        }}
      />
      <CityInfoItem
        info={{
          label: "Feels Like",
          value: feelsLike,
        }}
      />
      <CityInfoItem
        info={{
          label: "Hi/Low",
          value: [hiLow[0], hiLow[1]],
        }}
      />
      <CityInfoItem info={{ label: "Wind Speed (mph)", value: windSpeed }} />
    </Flex>
  );
};

export default CityInfo;
