import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  Input,
  Spinner,
  IconButton,
  RadioGroup,
  Radio,
  Text,
} from "@chakra-ui/react";
import { Flex, Heading, Stack } from "@chakra-ui/layout";
import { Search2Icon } from "@chakra-ui/icons";

import { CityInfo } from "./index";
import { getCity } from "../util/index";

interface Props {
  props?: any;
}
const Home: React.FC = () => {
  let [cityName, setCity] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [weatherInfo, setWeatherInfo] = useState();
  let [tempUnit, setTempUnit] = useState("imperial");
  let _errorMessage = useRef("");
  let invalidSearch = useRef(false);
  let lastSearched = useRef("");
  let toggledTemp = useRef(false);

  useEffect(() => {
    if (toggledTemp.current && lastSearched.current) {
      //This code allows the dynamic use of onSubmit to handle resubmission of currently searched city but with the appropriate tempUnit when it is toggled between Farenheit and Celsius
      toggledTemp.current = false;
      onSubmit(null, "T");
    }
  });

  const setAndCleanUp = (val: any) => {
    setWeatherInfo({ tempUnit: tempUnit, ...val });
  };

  const onSubmit = async (e?: any, flag?: string) => {
    let cityToSearch = flag === "T" ? lastSearched.current : cityName;
    if (lastSearched.current !== cityToSearch) setIsLoading(true);
    if (cityToSearch.length > 0) {
      try {
        let res = await getCity(cityToSearch, tempUnit);
        if (res) {
          setAndCleanUp(res);
          lastSearched.current = cityToSearch;
        }
      } catch (error: any) {
        invalidSearch.current = true;
        let uhOh = "Uh-Oh, ";
        let len = error.message.length;
        let code = error.message.slice(-3, len);
        switch (code) {
          case "404":
            _errorMessage.current = `${uhOh} \n seems like that city doesnt exist!`;
            break;
          default:
            _errorMessage.current = `${uhOh}\n ${error}`;
            break;
        }
      }
    } else {
      console.log("here");
      invalidSearch.current = true;
      _errorMessage.current = "Please enter a city name";
    }
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleChange = (e: any) => {
    setCity(e.target.value);
  };

  const toggleTempUnit = (e: any) => {
    let unit = e === "F" ? "imperial" : "metric";
    toggledTemp.current = true;
    setTempUnit(unit);
  };

  const inputFocusReset = () => {
    if (invalidSearch.current) {
      invalidSearch.current = false;
      setCity("");
    }
  };

  return (
    <Flex
      w="70vw"
      flexDirection="column"
      height="100vh"
      alignItems="center"
      m="auto"
    >
      <Heading size="lg" m="6" fontWeight="400">
        Search your city
      </Heading>
      <Flex>
        <Input
          data-testid="city-name-input"
          onFocus={inputFocusReset}
          aria-label="Input City Name"
          value={cityName}
          focusBorderColor="purple.500"
          onChange={handleChange}
          placeholder="Enter City Name"
          variant="filled"
          type="text"
        ></Input>
        <IconButton
          aria-label="Search for city"
          icon={<Search2Icon />}
          onClick={onSubmit}
        ></IconButton>
      </Flex>
      <Flex m="3" justifyContent="center" direction="column">
        {invalidSearch.current && (
          <Text color="red" alignSelf="center">
            {_errorMessage.current}
          </Text>
        )}
        {isLoading && <Spinner size="xl" />}
        {!isLoading && weatherInfo && <CityInfo weather={weatherInfo} />}
      </Flex>
      <RadioGroup onChange={toggleTempUnit} defaultValue="F">
        <Stack direction="row" spacing="10">
          <Radio value="F" colorScheme="purple">
            In Farenheit
          </Radio>
          <Radio value="C" colorScheme="purple">
            In Celsius
          </Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default Home;
