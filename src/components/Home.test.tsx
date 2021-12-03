import React, { Component } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Home } from ".";
import { Weather } from "../myTypes";
import { createWeatherObj } from "../util/testUtils";
import { getCity } from "../util/index";
import axios from "axios";

describe("Home Component Input tests", () => {
  let input;
  let submitButton: any;
  let inputBar: any;
  let component: any;
  let city: string;

  beforeEach(() => {
    component = render(<Home />);
    inputBar = screen.getByTestId("city-name-input");
    submitButton = screen.getByRole("button", {
      name: /Submit search/i,
    });
  });

  afterEach(() => {
    component.unmount();
    city = "";
  });

  it("Place Holder Text is present before user input", () => {
    const defaultText = "Enter City Name";
    expect(inputBar.getAttribute("placeholder")).toEqual(defaultText);
  });

  // it("Passes city name correctly to api call when submit button is clicked", () => {
  //   city = "Los angeles";
  //   inputBar.innerText = city;
  //   fireEvent.click(submitButton);
  // });

  // it("renders text informing user of invalid search when a 404 is returned", async () => {
  //   city = "aaabbbccc";
  //   inputBar.innerText = city;
  //   fireEvent.click(submitButton);
  //   let invalidTextWarning = await screen.findByText(/Uh-Oh/i);
  //   expect(invalidTextWarning).toBeInTheDocument();
  //   expect(invalidTextWarning).toHaveStyle("color: red");
  // });
});
