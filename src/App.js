import React, { Component } from 'react';
import './App.css';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


class MainComp extends Component {
  state = {
    temp: 5,
    weather: "Sunny"
  }
   fabstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 200,
    left: 'auto',
    position: 'fixed',
  };
  render() {
    return (<div className="App">
      <div className="mainImg">
        <h3 className="weather">{this.state.weather}</h3>
        <h1 className="temp">{this.state.temp}<span className="deg">o</span> </h1>

      </div>
      <Fab style={this.fabstyle} color="primary" size="large" aria-label="add">
        <AddIcon />
      </Fab>
    </div>);
  }
}

export default MainComp;

