import React, { Component } from "react";

 class NumberOfEvents extends Component {
   state = {
     numEvents: 32,
   };

   handleInputChange = (e) => {
     const newVal = parseInt(e.target.value);
     this.setState({
       numEvents: newVal,
     });
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
           onChange={(e) => this.handleInputChange(e)}
         />
       </div>
     );
   }
 }

export default NumberOfEvents;