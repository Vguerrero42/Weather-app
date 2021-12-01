import React, { Component } from "react";
import { render, screen } from "@testing-library/react";
import { Home } from ".";
import { Weather } from "../myTypes";
import { createWeatherObj } from "../util/testUtils";
import { getCity } from "../util/index";

describe("Home Component Input tests", () => {
  let input;
  let inputBar: any;
  let component: any;

  beforeEach(() => {
    component = render(<Home />);
    inputBar = screen.getByTestId("city-name-input");
  });

  afterEach(() => {
    component.unmount();
  });

  it("Place Holder Text is present before user input", () => {
    const defaultText = "Enter City Name";
    expect(inputBar.getAttribute("placeholder")).toEqual(defaultText);
  });
});
