import React, { Component } from "react";
import "./locationComponent.css"

import Grid from '@material-ui/core/Grid';
class LocationCard extends Component {
  state = {
  };
  
  render() {
    return <div className=" container my-5 locationCard" >
              <Grid container justify="center"
          alignItems="center" spacing={1}>
          <Grid item xs={8}>
          <h1 style={{ color: "white" }}>{this.props.location}</h1>
          </Grid>
          <Grid item xs={4}><h1 className="temp inline">{this.props.temp}<span className="deg">o</span> </h1>
          </Grid>
          </Grid>
      
      
    </div>;
  }
}

export default LocationCard;
