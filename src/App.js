import React, { Component } from 'react';
import './App.css';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
// import WbSunnyTwoToneIcon from '@material-ui/icons/WbSunnyTwoTone';
// import FilterDramaTwoToneIcon from '@material-ui/icons/FilterDramaTwoTone';
import { WiDayCloudyWindy, WiDaySunnyOvercast, WiSunrise, WiThermometer, WiBarometer } from "react-icons/wi";
class MainComp extends Component {
  state = {
    temp: 25,
    weather: "Sunny",
    location: "Lagos, Nigeria",
    accent: "purple"
  }
  fabstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 220,
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
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1 style={{ color: this.state.accent }}>{this.state.location}</h1>
          </Grid>
        </Grid>

        <Grid container justify="center"
          alignItems="center" spacing={1}>
          <Grid item xs={2}>
            <div>10</div>
            <div><WiSunrise style={{ fontSize: 40, color: this.state.accent }} /></div>
          </Grid>
          <Grid item xs={2}>
            <div>10</div>
            <div><WiBarometer style={{ fontSize: 40, color: this.state.accent }} /></div>
          </Grid>
          <Grid item xs={2}>
            <div>10</div>
            <div><WiThermometer style={{ fontSize: 40, color: this.state.accent }} /></div>
          </Grid>
          <Grid item xs={2}>
            <div>10</div>
            <div><WiDaySunnyOvercast style={{ fontSize: 40, color: this.state.accent }} /></div>
          </Grid>
          <Grid item xs={2}>
            <div>10</div>
            <div><WiDayCloudyWindy style={{ fontSize: 40, color: this.state.accent }} /></div>
          </Grid>
        </Grid>
      </div>
    </div>);
  }
}

export default MainComp;

