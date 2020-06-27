import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from "@material-ui/icons/Search";
import { AiOutlineArrowLeft } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5px",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "2fr",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


export default function CustomizedInputBase(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <IconButton
        onClick={props.onToggle}
        className={classes.iconButton}
        aria-label="menu"
      >
        <AiOutlineArrowLeft />
      </IconButton>
      <InputBase
        className={classes.input}
        id="searchText"
        placeholder="Search Location"
      />
      <IconButton className={classes.iconButton} onClick={props.onSearch} aria-label="search">
        <SearchIcon  />
      </IconButton>
    </Paper>
  );
}
// onClick={this.props.onToggle}
