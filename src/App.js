import React, { Component } from 'react';
import './App.css';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import LocationComp from "./components/locationComponent"
import SearchBar from "./components/SearchBar"
import { WiStrongWind, WiHumidity, WiWindDeg, WiThermometer, WiBarometer } from "react-icons/wi";
var axios = require('axios');
var cancel = false;
class MainComp extends Component {
  state = {
    temp: 25,
    weather: {},
    main: {},
    location: "Lagos, Nigeria",
    wind: {},
    accent: "purple",
    tray: true,
    cancel: false,
    recent_locations: []
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
    axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: tee,
        APPID: "a7bec659ed63a41dafea39b7664a0618"
      }
    })
      .then((response) => {
        console.log(response);
        var id = response.data.id;
        var recent_locations = {};
        const newRecent = this.state.recent_locations.filter(c => c.id === id);
        console.log(newRecent.length);
        var num = newRecent.length;
        if (num === 0) {
          console.log("herere");
          recent_locations = this.state.recent_locations.concat({ id: response.data.id, name: `${response.data.name}, ${response.data.sys.country}`, temp: Math.floor(response.data.main.feels_like - 273) });

          if (recent_locations.length > 5) {
            recent_locations.splice(0, 1);
          } 
          this.setState({ recent_locations: recent_locations })

        }


        // }
        this.setState({
          weather: response.data.weather[0],
          main: response.data.main,
          location: `${response.data.name}, ${response.data.sys.country}`,
          wind: response.data.wind,
          tray: true,

        });


      })
      .catch((error) => {
        console.log(error);
      })
  };

  handleremoveRecent = (id) => {
    console.log(`Cancel from ${id} card`);
    const newRecent = this.state.recent_locations.filter(c => c.id !== id);
    this.setState({ recent_locations: newRecent });
    cancel = true
  };
  get_val = (name) => {

    axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: name,
        APPID: "a7bec659ed63a41dafea39b7664a0618"
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({
          weather: response.data.weather[0],
          main: response.data.main,
          location: `${response.data.name}, ${response.data.sys.country}`,
          wind: response.data.wind,
          tray: true
        });

      })
      .catch((error) => {
        console.log(error);
      })
  }
  handleOnSelect = (id) => {
    console.log(id);
    console.log(cancel);

    if (!cancel) {
      const find = this.state.recent_locations.filter(c => c.id === id);
      this.get_val(find[0].name);
    }
    // this.setState({ cancel: false });
    cancel = false

  }
  componentDidMount = () => {
    axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: "Abuja",
        APPID: "a7bec659ed63a41dafea39b7664a0618"
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({
          weather: response.data.weather[0],
          main: response.data.main,
          location: `${response.data.name}, ${response.data.sys.country}`,
          wind: response.data.wind
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    if (this.state.tray) {
      return (
        <div className="App">
          <div className="mainImg">
            <h3 className="weather">{this.state.weather.description}{}</h3>
            <h1 className="temp">{Math.floor(this.state.main.feels_like - 273)}<span className="deg">o</span> </h1>
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

              <Grid item xs={3}>
                <div><WiBarometer style={{ fontSize: 40, color: this.state.accent }} /></div>
                <div>{this.state.main.pressure} hPa</div>
              </Grid>
              <Grid item xs={2}>
                <div><WiThermometer style={{ fontSize: 40, color: this.state.accent }} /></div>
                <div>{Math.floor(this.state.main.feels_like - 273)}<sup>o</sup>C</div>
              </Grid>
              <Grid item xs={2}>
                <div><WiHumidity style={{ fontSize: 40, color: this.state.accent }} /></div>
                <div>{this.state.main.humidity}%</div>
              </Grid>
              <Grid item xs={2}>
                <div><WiStrongWind style={{ fontSize: 40, color: this.state.accent }} /></div>
                <div>{this.state.wind.speed}m/s</div>
              </Grid>
              <Grid item xs={2}>
                <div><WiWindDeg style={{ fontSize: 40, color: this.state.accent }} /></div>
                <div>{this.state.wind.deg}<sup>o</sup></div>
              </Grid>
              <Grid item xs={5}>
                <Button color="primary" fullWidth>Today</Button>
              </Grid>
              <Grid item xs={5}>
                <Button color="primary" fullWidth>Tomorrow</Button>
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
              <LocationComp key={location.id} id={location.id} location={location.name} temp={location.temp} onRemoveRecent={this.handleremoveRecent} onSelect={this.handleOnSelect} />
            ))
          }
        </div>
      );
    }

  }
}

export default MainComp;

