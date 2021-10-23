import React from "react";
import { mount } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature('./src/features/numberOfEvents.feature');

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the user hasn't specified a number of events", () => {
      AppWrapper = mount(<App />);
      AppWrapper.setState({ showWelcomeScreen: false });
    });

    when("the search is executed", () => {
      AppWrapper.update();
    });

    then(
      "the search result will display 32 results, which is the default number",
      () => {
        expect(AppWrapper.find(".event")).toHaveLength(32);
      }
    );
  });

  test("User can change the number of events they want to see", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given(
      "the user hasn't specified a number of events",
      () => {
        AppWrapper = mount(<App />);
        AppWrapper.setState({ showWelcomeScreen: false });
      }
    );

    when("the user types a number", () => {
      const numberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      numberOfEventsWrapper
        .find("input")
        .simulate("change", { target: { value: 20 } });
    });

    then("that number of events will be shown", () => {
      expect(AppWrapper.state("numberOfEvents")).toEqual(32);
    });
  });
});