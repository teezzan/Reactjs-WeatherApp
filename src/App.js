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
    weather: {},
    location: "Lagos, Nigeria",
    accent: "purple",
    tray: true,
    recent_locations: [
      { id: 1, name: "Ontario, Canada", temp: 15 },
      { id: 2, name: "Manchester", temp: 9 },
      { id: 3, name: "Abeokuta", temp: 25 }]
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
  handleSearch = () => {
    var tee = document.getElementById("searchText").value;
    console.log(tee);
    //call api and store into state.r
    var axios = require('axios');
    axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q:tee,
        APPID:"a7bec659ed63a41dafea39b7664a0618"
      }
    })
    .then(function (response) {
      console.log(response);
      this.setState({
        weather: response.data.weather[0],
        main: response.data.main
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  handleremoveRecent = (id) => {
    console.log(`Cancel from ${id} card`);
    const newRecent = this.state.recent_locations.filter(c => c.id !== id);
    this.setState({recent_locations: newRecent});
  };
  render() {
    if (this.state.tray) {
      return (
        <div className="App">
          <div className="mainImg">
            <h3 className="weather">{this.state.weather.description}</h3>
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
            <SearchBar onToggle={this.toggle} onSearch={this.handleSearch} />
          </div>
          {
            this.state.recent_locations.map(location => (
              <LocationComp key={location.id} id={location.id} location={location.name} temp={location.temp} onRemoveRecent={this.handleremoveRecent}/>
            ))
          }
        </div>
      );
    }

  }
}

export default MainComp;

