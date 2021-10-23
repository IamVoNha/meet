import React from "react";
 import { shallow } from "enzyme";
 import NumberOfEvents from "../NumberOfEvents";

 describe("<NumberOfEvents /> component", () => {
   let NumberOfEventsWrapper;

   beforeAll(() => {
     NumberOfEventsWrapper = shallow(<NumberOfEvents />);
   });

   test("render text input", () => {
     expect(NumberOfEventsWrapper.find(".num-events")).toHaveLength(1);
   });

   test("renders text input correctly", () => {
     const numEvents = NumberOfEventsWrapper.state("numEvents");
     expect(NumberOfEventsWrapper.find(".num-events").prop("value")).toBe(
       numEvents
     );
   });

   test("the default value should be 32", () => {
     expect(NumberOfEventsWrapper.find(".num-events").prop("value")).toEqual(32);
   });

   test("change state when input changes", () => {
     NumberOfEventsWrapper.setState({
       numEvents: 20,
     });
     const eventObject = { target: { value: 10 } };
     NumberOfEventsWrapper.find(".num-events").simulate("change", eventObject);
     expect(NumberOfEventsWrapper.state("numEvents")).toBe(10);
   });
 });