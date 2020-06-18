import React, { Component } from 'react';
import './App.css';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import LocationComp from "./components/locationComponent"
import SearchBar from "./components/SearchBar"
import { WiDayCloudyWindy, WiDaySunnyOvercast, WiSunrise, WiThermometer, WiBarometer } from "react-icons/wi";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaSearchLocation } from "react-icons/fa";
// // import Button from 'react-bootstrap/Button';
// // import InputGroup from 'react-bootstrap/InputGroup';
// // import FormControl from 'react-bootstrap/FormControl';


class MainComp extends Component {
  state = {
    temp: 25,
    weather: "Sunny",
    location: "Lagos, Nigeria",
    accent: "purple",
    tray: true
  }


  fabstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 220,
    left: 'auto',
    position: 'fixed',
  };

  toggle = () => {
    if (this.state.tray) {
      this.setState({ tray: false });
    } else {
      this.setState({ tray: true });
    }
  };
  tee = () => {
    alert("✔️ This works on every component!");
  };

  render() {
    if (this.state.tray) {
      return (
        <div className="App">
          <div className="mainImg">
            <h3 className="weather">{this.state.weather}</h3>
            <h1 className="temp">{this.state.temp}<span className="deg">o</span> </h1>
          </div>
          <Fab style={this.fabstyle} color="primary" size="large" aria-label="add" onClick={this.toggle} >
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
        </div>
      );
    }


    else {
      return (
        <div className="container ">
          <div style={{ alignText: "center" }} >
            <SearchBar onToggle={this.toggle} />
          </div>
          <LocationComp location={"Ontario, Canada"} temp={13} />
          <LocationComp location={"Abeokuta, Nig."} temp={25} />
          <LocationComp location={"London,UK"} temp={15} />
        </div>
      );
    }

  }
}

export default MainComp;

