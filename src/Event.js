import React, { Component } from 'react';

 class Event extends Component {
   state = {
     show: false,
     showButton: 'show details',
   };
   showDetails = () => {
     if (this.state.show === true) {
       this.setState({ show: false, showButton: 'show details' });
     } else {
       this.setState({ show: true, showButton: 'hide details' });
     }
   };

   render() {
     const event = this.props.event;
     return (
       <div className="event">
            <div className="summary">
              <h1>{event.summary}</h1>
            </div>
            <div className="dateTime">Date: {event.start.dateTime.slice(0, 10)}</div>
				    <div className="timeZone">Time Zone: {event.start.timeZone}</div>
				    <div className="location">Location: {event.location}</div>
         {this.state.show && (
            <div className="detailInfo">
              <h2>About event:</h2>
              <div className="description">{event.description}</div>
              <a href={event.htmlLink}>
                See details on Google Calender
              </a>
        </div>
         )}
        <div className="eventButton">
            <button className="showDetails" onClick={this.showDetails}>
              {this.state.showButton}
            </button>
        </div>
       </div>
     );
   }
 }

 export default Event;