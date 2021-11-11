import React, {Component} from "react";
import {ErrorAlert} from "./Alert";

class NumberOfEvents extends Component {
  state = {
    displayCount: 32,
    infoText: "",
  }

  handleInputChange = (event) => {
    let value = event.target.value
    if(value === "") {
      this.setState({
        infoText: "Please enter a number",
        displayCount: value,
      })
    } else if(value <= 0) {
      this.setState({
        infoText: "Min of 1",
        displayCount: value,
      }) 
    } else if(value > 64) {
      this.setState({
        infoText: "Max of 64",
        displayCount: value,
      }) 
    } else {this.setState({
      displayCount: value,
      infoText: "",
    });
    this.props.getDisplayCount(event.target.value);
    }
  }

  render() {

    return(
      <div className="NumberOfEvents">
        <ErrorAlert text={this.state.infoText}/>
        <p>Number of Events</p>
        <input 
          id="eventsDisplayed"
          type="number"
          className="number"
          value={this.state.displayCount}
          onChange={this.handleInputChange}
        />

      </div>
    )
  }
}

export default NumberOfEvents;