import React, { Component } from 'react';
import './App.css';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import LocationComp from "./components/locationComponent"
import SearchBar from "./components/SearchBar"
import { WiStrongWind, WiHumidity, WiWindDeg, WiThermometer, WiBarometer } from "react-icons/wi";
var axios = require('axios');
var cancel = false;
function randomint(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var palm = require(`../public/${randomint(1, 14)}.svg`);


class MainComp extends Component {

  state = {
    temp: null,
    weather: {},
    main: {},
    location: "",
    wind: {},
    accent: "purple",
    tray: true,
    cancel: false,
    recent_locations: [],
    palm: palm,
    backgroundImage: 'url(' + palm + ')',
    // logo : require('../1.svg')
  }



  fabstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 220,
    left: 'auto',
    position: 'fixed',
  };


  mainImg = {
    backgroundImage: 'url(' + this.state.palm + ')',
    // backgroundImage: url('src/images/background.png')

  }
  toggle = () => {
    if (this.state.tray) {
      this.setState({ tray: false });
    } else {
      this.setState({ tray: true });
    }
  };
  handleSearch = () => {
    var tee = document.getElementById("searchText").value;
    console.log(tee);
    //call api and store into state.r
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
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
        var imgnum = randomint(1, 14);
        if (num === 0) {
          recent_locations = this.state.recent_locations.concat({ id: response.data.id, name: `${response.data.name}, ${response.data.sys.country}`, temp: Math.floor(response.data.main.feels_like - 273), imgnum: imgnum });

          if (recent_locations.length > 5) {
            recent_locations.splice(0, 1);
          }
          this.setState({ recent_locations: recent_locations })
          localStorage.setItem('recent', JSON.stringify(recent_locations));
        }


        // }
        // var palm = require(`../public/${imgnum}.svg`);

        this.setState({
          weather: response.data.weather[0],
          main: response.data.main,
          location: `${response.data.name}, ${response.data.sys.country}`,
          wind: response.data.wind,
          tray: true
        });
        this.tee(imgnum);


      })
      .catch((error) => {
        console.log(error);
      })
  };

  handleremoveRecent = (id) => {
    console.log(`Cancel from ${id} card`);
    const newRecent = this.state.recent_locations.filter(c => c.id !== id);
    this.setState({ recent_locations: newRecent });
    localStorage.setItem('recent', JSON.stringify(newRecent));
    cancel = true
  };
  get_val = (name, which = false) => {

    axios.get('https://api.openweathermap.org/data/2.5/weather', {
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
        if (which) {
          console.log("inside which");

          var imgnum = randomint(1, 14);
          // var palm = require(`../public/${imgnum}.svg`);
          var recent_locations = this.state.recent_locations.concat({ id: response.data.id, name: `${response.data.name}, ${response.data.sys.country}`, temp: Math.floor(response.data.main.feels_like - 273), imgnum: imgnum });
          this.setState({
            recent_locations: recent_locations
          })
          localStorage.setItem('recent', JSON.stringify(recent_locations));
          this.tee(imgnum);
        }

      })
      .catch((error) => {
        console.log(error);
      })
  }
  handleOnSelect = (id) => {
    // console.log(id);
    // console.log(cancel);
    console.log("inside select");
    if (!cancel) {
      const find = this.state.recent_locations.filter(c => c.id === id);
      this.get_val(find[0].name);
      this.tee(find[0].imgnum);
    }
    // this.setState({ cancel: false });
    cancel = false

  }
  updateRecent = (id) => {
    var id_pld = "";
    for (var i = 0; i < id.length; i++) {
      id_pld += `${id[i]},`
    }
    axios.get('https://api.openweathermap.org/data/2.5/group', {
      params: {
        id: id_pld,
        APPID: "a7bec659ed63a41dafea39b7664a0618",
        units: "metric"
      }
    })
      .then((response) => {
        var recent_locations = []
        for (var i = 0; i < response.data.cnt; i++) {
          var payload = {
            id: response.data.list[i].id,
            temp: Math.floor(response.data.list[i].main.feels_like),
            name: `${response.data.list[i].name}, ${response.data.list[i].sys.country}`,
            imgnum: randomint(1, 14)
          }
          recent_locations.push(payload);
        }
        console.log(response);
        this.setState({ recent_locations },()=>{
          this.tee(this.state.recent_locations[this.state.recent_locations.length-1].imgnum);
        });

        // console.log("that first", this.state.recent_locations);


      })
      .catch((error) => {
        console.log(error);
      })
  }
  componentDidMount = () => {

    const val = JSON.parse(localStorage.getItem('recent'))
    if (val != null && val !== {}) {
      console.log("that first");
      this.setState({ recent_locations: val });

      this.get_val(val[val.length - 1].name);
      var id = [];
      for (var i = 0; i < val.length; i++) {
        id.push(val[i].id);
      }
      this.updateRecent(id);



    }
    else {
      //this.setState({ recent_locations: [] });
      this.get_val("London", true);
    }


  };
  tee = (num) => {
    var imgnum = randomint(1, 14)
    var palm = require(`../public/${num}.svg`);
    this.setState({
      backgroundImage: 'url(' + palm + ')'
    })
    console.log(imgnum);
    console.log(palm);
  }

  render() {
    if (this.state.tray) {
      return (
        <div className="App">
          <div className="mainImg" style={{ backgroundImage: this.state.backgroundImage }}>
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
              {/* <Grid item xs={5}>
                <Button color="primary" fullWidth >Today</Button>
              </Grid>
              <Grid item xs={5}>
                <Button color="primary" fullWidth>Tomorrow</Button>
              </Grid> */}
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
          {this.state.recent_locations.map(location => (
            <LocationComp key={location.id} id={location.id} imgnum={location.imgnum} location={location.name} temp={location.temp} onRemoveRecent={this.handleremoveRecent} onSelect={this.handleOnSelect} />
          ))
          }
        </div>
      );
    }

  }
}

export default MainComp;

