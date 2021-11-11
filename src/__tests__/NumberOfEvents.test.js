import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents getDisplayCount={() => {}}/>);
  })
  test("render text input", () => {
    expect(NumberOfEventsWrapper.find(".number")).toHaveLength(1);
  });
  test("the default value should be 32", () => {
    expect(NumberOfEventsWrapper.find(".number").prop("value")).toBe(32);
  });
  test("change state when input changes", () => {
    const eventObject = { target: {value: 16}};
    NumberOfEventsWrapper.find(".number").simulate("change", eventObject);
    expect(NumberOfEventsWrapper.state("displayCount")).toBe(16);
  });
})