import React, { Component } from "react";
import { ErrorAlert } from './Alert';

 class NumberOfEvents extends Component {
   state = {
     numEvents: 32,
     errorText: ''
   };

   handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 0 || value > 32) {
      return this.setState({  
        numEvents: '',
        errorText: 'Select number between 1 to 32'
      });
    } else {
      this.setState({ 
        numEvents: value,
        errorText: ''
      });
    }
  };

   render() {
     return (
       <div className="NumberOfEvents">
         <p>Number of Events</p>
         <input
           type="number"
           min="1"
           max="100"
           className="num-events"
           value={this.state.numEvents}
           onChange={this.handleInputChanged} />
              <ErrorAlert text={this.state.errorText} />
       </div>
     );
   }
 }

export default NumberOfEvents;