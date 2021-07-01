import React from "react";
import { Typography, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Video from "./components/Video";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: "30px 100px",
    display: "flex",
    padding: "5px",
    backgroundColor: "#92D7DC",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <h1 align="center">TEAMS CLONE</h1>
      </AppBar>
      <Video />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};

export default App;
