import React from "react";
import { mount } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";
import EventList from "../EventList";


const feature = loadFeature("./src/features/NumberOfEvents.feature");

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    let AppWrapper;
    given("the user hasn't specified a number of events", () => {
      AppWrapper = mount(<App />);
    });

    when('the search is executed', () => {
      AppWrapper.update();
    });

    then('the search result will display 32 results, which is the default number', () => {
      expect(AppWrapper.state("displayCount")).toBe(32);
      expect(AppWrapper.find(EventList).find(".events")).toHaveLength(0);
      AppWrapper.unmount()
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given("the user hasn't specified a number of events", () => {
      AppWrapper = mount(<App />);
    });

    when('the user types a number', () => {
      AppWrapper.update();
      expect(AppWrapper.find(EventList).find(".events")).toHaveLength(0);
      const value = {target: { value: 1}}
      AppWrapper.find(NumberOfEvents).find(".number").simulate("change", value);
    });

    then('that number of events will be shown', () => {
      AppWrapper.update();
      expect(AppWrapper.state("displayCount")).toBe(1);
      expect(AppWrapper.find(EventList).find(".events")).toHaveLength(0);
      AppWrapper.unmount();
    });
  });
});