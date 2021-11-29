import React from "react";
import { render, screen } from "@testing-library/react";
import { CityInfo, CityInfoItem } from ".";
import { Weather } from "../myTypes";
import { createWeatherObj } from "../util/testUtils";

describe("City Info component tests", () => {
  let component: any;
  let weather: any;

  beforeEach(() => {
    weather = createWeatherObj();
    component = render(<CityInfo weather={weather as Weather} />);
  });

  afterEach(() => {
    component.unmount();
  });

  it("Renders the city name and country code correctly", () => {
    let expected = `Weather in ${weather.name}, ${weather.sys.country}`;
    let h2: any = screen.getByTestId("weather-text").innerHTML;
    expect(h2).toEqual(expected);
  });

  it("Renders correct temp unit", () => {
    //Grabbing text from element that renders temp value and slicing the last element in that string which is always going to be C or F
    let screenTempUnit = screen
      .getByLabelText(/value for Temperature/)
      .innerHTML.slice(-1);
    let expectedTempUnit = weather.tempUnit === "imperial" ? "F" : "C";
    expect(screenTempUnit).toBe(expectedTempUnit);
  });
});
