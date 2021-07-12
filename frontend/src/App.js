import React from "react";
import { AppBar } from "@material-ui/core";
import { useStyles } from "./styles/app.component.style.js";
import Video from "./components/Video";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar
        className={classes.appBar}
        style={{ backgroundColor: "black" }}
        position="static"
      >
        <h2 align="center" color="white">
          TEAMS CLONE
        </h2>
      </AppBar>
      <Options>
        <Notifications />
      </Options>
      <Video />
    </div>
  );
};

export default App;
