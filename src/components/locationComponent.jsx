import React, { Component } from "react";
import "./locationComponent.css";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { MdCancel } from "react-icons/md";


class LocationCard extends Component {
  state = {};

 tee = () =>{
  console.log("here");
 }
 palm =require(`../assets/${this.props.imgnum}.svg`);
 locationCard = {
   backgroundImage: 'url(' + this.palm + ')'
 }

  render() {
    return (
      <div className=" container my-5 locationCard" style={this.locationCard} onClick={()=> this.props.onSelect(this.props.id)}>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={8}>
            <h1 style={{ color: "white" }}>{this.props.location}</h1>
          </Grid>
          <Grid item xs={3}>
            <h1 className="temp inline px-1">
              {this.props.temp}
              <span className="deg">o</span>{" "}
            </h1>
          </Grid>
          <Grid item xs={1}>
          <IconButton className="p-1" onClick={() => this.props.onRemoveRecent(this.props.id)} aria-label="search">
            <MdCancel />
          </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LocationCard;
