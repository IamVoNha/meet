import React, { Component } from 'react';
import './App.css';
import { NotificationAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    displayCount: 32,
    currentCity: "all",
    notificationText: '',
    showWelcomeScreen: undefined
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
      if(this.mounted){
        let filteredEvents = events.slice(0, this.state.displayCount);
        this.setState({
          events: filteredEvents,
          locations: extractLocations(events),
        });
      }
    });
  }
}

  updateEvents = (location, displayCount) => {
    this.mounted = true;
    getEvents().then((events) => {
      if(this.mounted) {
        const locationEvents = (location === "all") ?
          events :
          events.filter((event) => event.location === location);
        let filteredEvents = locationEvents.slice(0, displayCount)
        this.setState({
          events: filteredEvents,
          currentCity: location,
        });
      }
    });
  }

  getDisplayCount = (value) => {
    const location = this.state.currentCity;
    this.setState({
      displayCount: value
    })
    this.updateEvents(location, value);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        <h2 className="app-name">Meet App</h2>
        <div className="input-boxes">

          <NotificationAlert text={this.state.notificationText} />

          <CitySearch 
            locations={this.state.locations}  
            updateEvents={this.updateEvents} 
            displayCount={this.state.displayCount}
          />

          <NumberOfEvents getDisplayCount={this.getDisplayCount}/>
          </div>

          <EventList events={this.state.events} />

          <ScatterChart width={800} height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis type="number" dataKey="number" name="number of events" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>

          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;