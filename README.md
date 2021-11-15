# Project Name

**Meet-APP**

<img width="1440" alt="MeetAppScreenShot" src="https://user-images.githubusercontent.com/86613776/141755035-9c8fa7f8-fcd7-4b98-b6a7-11446e9eb4e6.png">

## Description

This project is a serverless progressive web application built with React using the Google Calendar API to fetch events. The app was built with a Test-Driven Development approach which included using Jest for unit amd integrated tests, Cucumber for Behavior Driven test, Puppeteer for end-to-end tests.

## Built With

   - React

## See it in action

 Click me to view. <a href="https://iamvonha.github.io/meet/">link here!</a>

## Dependencies

   - "@testing-library/jest-dom": "^5.14.1",
   - "@testing-library/react": "^11.2.7",
   - "@testing-library/user-event": "^12.8.3",
   - "atatus-spa": "^4.3.2",
   - "axios": "^0.23.0",
   - "nprogress": "^0.2.0",
   - "react": "^17.0.2",
   - "react-dom": "^17.0.2",
   - "react-scripts": "4.0.3",
   - "recharts": "^2.1.6",
   - "web-vitals": "^0.2.4",
   - "workbox-background-sync": "^5.1.4",
   - "workbox-broadcast-update": "^5.1.4",
   - "workbox-cacheable-response": "^5.1.4",
   - "workbox-core": "^5.1.4",
   - "workbox-expiration": "^5.1.4",
   - "workbox-google-analytics": "^5.1.4",
   - "workbox-navigation-preload": "^5.1.4",
   - "workbox-precaching": "^5.1.4",
   - "workbox-range-requests": "^5.1.4",
   - "workbox-routing": "^5.1.4",
   - "workbox-strategies": "^5.1.4",
   - "workbox-streams": "^5.1.4"

## devDependencies

   - "enzyme": "^3.11.0",
   - "gh-pages": "^3.2.3",
   - "jest-cucumber": "^3.0.1",
   - "puppeteer": "^10.4.0"

## Key Features
1) Filter events by city.
2) Show/hide event details.
3) Specify number of events.
4) Use the app when offline.
5) Add an app shortcut to the home screen.
6) View a chart showing the number of upcoming events by city.

## User Stories & Secnarios
1.	Show/Hide an Event’s Details - As a user, I would like to filter events by specific cities so that I can see the list of events that takes place in each city separately.
  -	Scenario 1: An event element is collapsed by default
    -	Given: the user hasn't clicked the show details button on the event
    - When the user opens the app
 		- Then the extra details should be hidden
  -	Scenario 2: User can expand an event to see its details
    - Given the user hasn't clicked the show details button on the event
 		- When the user clicks the show details button
 		- Then the extra details should be displayed
  -	Scenario 3: User can collapse an event to hide it’s details
    - Given the extra details are displayed
 		- When the user clicks the hide details button
 		- Then the extra details should be hidden
2.	Specify Number of Events – As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or less events.
  -	Scenario 1: When a user hasn’t specified a number, 32 is the default number
    - Given the user hasn't specified a number of events
    - When the search is executed 
    - Then the search result will display 32 results, which is the default number
  -	Scenario 2: The user can change the number of events they want to see
    - Given the user hasn't specified a number of events
    - When the user types a number 
    - Then that number of events will be shown
3.	Use the App when Offline -As a user, I would like to be able to use the app when offline so that I can use the app when desired without the need of internet connection.
  -	Scenario 1: Show cached data when there’s no internet connection
    - Given there’s no internet connection
    - When when user opens the app
    - Then the user should see each data 
  -	Scenario 2: Show an error when the user changes the settings (city, time, range)
    - Given the user has no internet connection
    - When user wants to change the time/location settings
    - Then the user will receive an error message
4.	Data Visualization – As a user, I would like to see a chart displaying the upcoming events so I can see specifically which events are taking place in which cities.
  -	Scenario 1: Show a chart with the number of upcoming events in each city
    - Given the user is exploring a chart with upcoming events in each city
    - When user clicks on the chart
    - Then the user will see a charts displaying upcoming events in each city