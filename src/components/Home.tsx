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
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Search2Icon } from "@chakra-ui/icons";

import { CityInfo } from "./index";
import { getCity, handleError } from "../util/index";

interface Props {
  props?: any;
}

const Home: React.FC<Props> = () => {
  const [cityName, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState();
  const [tempUnit, setTempUnit] = useState("imperial");

  const _errorMessage = useRef("");
  const invalidSearch = useRef(false);
  const lastSearched = useRef("");
  const toggledTemp = useRef(false);

  useEffect(() => {
    const handleEnterForSearch = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "Enter") onSubmit();
    };
    if (toggledTemp.current && lastSearched.current) {
      //This code allows the dynamic use of onSubmit to handle resubmission of currently searched city but with the appropriate tempUnit when it is toggled between Farenheit and Celsius
      toggledTemp.current = false;
      onSubmit(null, "T");
    }
    window.addEventListener("keyup", handleEnterForSearch);

    return () => {
      window.removeEventListener("keyup", handleEnterForSearch);
    };
  });

  const setAndCleanUp = (val: any) => {
    setWeatherInfo({ tempUnit: tempUnit, ...val });
  };

  const onSubmit = async (e?: null | React.MouseEvent, flag?: string) => {
    const cityToSearch = flag === "T" ? lastSearched.current : cityName;
    if (lastSearched.current !== cityToSearch) setIsLoading(true);
    if (cityToSearch.length > 0) {
      try {
        const res = await getCity(cityToSearch, tempUnit);
        if (res) {
          lastSearched.current = cityToSearch;
          setAndCleanUp(res);
        }
      } catch (error: any) {
        invalidSearch.current = true;
        _errorMessage.current = handleError(error);
      }
    } else {
      invalidSearch.current = true;
      _errorMessage.current = "Please enter a city name";
    }

    setTimeout(() => setIsLoading(false), 500);
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    setCity(e.target.value);
  };

  const toggleTempUnit = (e: any) => {
    const unit = e === "F" ? "imperial" : "metric";
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
      <Box>
        <Heading size="lg" m="6" fontWeight="400">
          Search your city
        </Heading>
      </Box>

      <Flex>
        <Input
          data-testid="city-name-input"
          onClick={inputFocusReset}
          aria-label="Input City Name"
          value={cityName}
          focusBorderColor="purple.500"
          onChange={handleChange}
          placeholder="Enter City Name"
          variant="filled"
          type="text"
        ></Input>
        <IconButton
          type="submit"
          // data-testid="submit-button"
          aria-label="Submit search"
          icon={<Search2Icon />}
          onClick={onSubmit}
        ></IconButton>
      </Flex>
      <Flex m="3" justifyContent="center" direction="column">
        {invalidSearch.current && (
          <Text
            data-testid="error-mess"
            aria-label="error message"
            p="2"
            fontWeight="400"
            fontSize="xl"
            color="red"
            alignSelf="center"
          >
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
