import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from ".";
import { Weather } from "../myTypes";
import { createWeatherObj } from "../util/testUtils";

describe("Home Component Input tests", () => {
  let input;
  let defaultText = "Enter City Name";

  beforeEach(() => {
    render(<Home />);
  });

  afterEach(() => {});

  it("Place Holder Text is present before and after user input", () => {
    let inputBarText = screen
      .getByTestId("city-name-input")
      .getAttribute("placeholder");
    expect(inputBarText).toEqual(defaultText);
  });
});
