import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: {},
      numberOfEvents: 32,
      currentLocation: "all",
    };
  }
  componentDidMount() {
     this.mounted = true;
     getEvents().then((events) => {
       if (this.mounted) {
         this.setState({
           events: events.slice(0, this.state.numberOfEvents),
           locations: extractLocations(events),
         });
       }
     });
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
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}
export default App;