import React, { Component } from "react";

class LocationCard extends Component {
  state = {
    count: 0,
  };
  render() {
    return (
      <div>
        <img src={require("../assets/T_3.svg")} alt="im" />
        
      </div>
    );
  }
  // incrementCount = () => {
  //   this.setState({ count: this.state.count + 1 });
  // };
}

export default LocationCard;
