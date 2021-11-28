import React from "react";
import { render, screen } from "@testing-library/react";
import { createWeatherObj } from "../util/testUtils";
import { CityInfoItem } from "./";

import { InfoProps } from "../myTypes";
import { randomProps } from "../util/testUtils";

describe("CityInfoItem Tests", () => {
  let weather;
  let testProps: any;
  let component: any;

  beforeAll(() => {
    weather = createWeatherObj();
    testProps = randomProps();
    component = render(<CityInfoItem info={testProps} />);
  });

  afterAll(() => {
    component.unmount();
  });

  it("Renders label and value of props correctly", () => {});
});
