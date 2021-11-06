import React, { Component } from 'react';
import './App.css';
import { NotificationAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: {},
      numberOfEvents: 32,
      currentLocation: "all",
      notificationText: '',
      showWelcomeScreen: undefined
    };
  }
  async componentDidMount() {
     this.mounted = true;

      if (navigator.onLine === false) {
       this.setState({
         notificationText: 'It seems you are offline. The events may be out of date while offline. To make sure you are getting the up to date events, make sure you are connected to the internet!'
       });
    } else {
       this.setState({
         notificationText: ''
      });
    }

    const accessToken = localStorage.getItem('access_token');
  const isTokenValid = (await checkToken(accessToken)).error ? false : true;
  const searchParams = new URLSearchParams(window.location.search);

  const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if ((code || isTokenValid) && this.mounted) {

      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  updateEvents = (location, numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      const eventsToShow = locationEvents.slice(0, numberOfEvents);
      this.setState({
        events: eventsToShow,
        currentLocation: location,
      });
    });
  };
  updateNumberOfEvents = async (e) => {
    const newVal = e.target.value ? parseInt(e.target.value) : 32;
    await this.setState({ numberOfEvents: newVal });
    this.updateEvents(this.state.currentLocation, this.state.numberOfEvents);
  };
  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        <NotificationAlert text={this.state.notificationText} />

        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />

        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />

        <EventList events={this.state.events} />

        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}
export default App;