import React, { Component } from "react";

class LocationCard extends Component {
  state = {
    count: 0,
  };
  render() {
    return (
      <div>
        <span className="badge badge-success m-5"> {this.state.count}</span>
        <button onClick={this.incrementCount} className=" btn btn-primary "> Click here </button>
      </div>
    );
  }
  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };
}

export default LocationCard;
