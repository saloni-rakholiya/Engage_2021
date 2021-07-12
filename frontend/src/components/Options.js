import React, { useState, useContext } from "react";
import { Button, TextField, Grid, Container, Paper } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import { useStyles } from "../styles/options.component.style.js";
import { SocketContext } from "../SocketContext";
import { ColorButton } from "../styles/custombutton.js";
import "../styles/options.css";

const Options = ({ children }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    iscalling,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const classes = useStyles();
  console.log(iscalling);
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        {callAccepted && !callEnded ? null : (
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container className={classes.boxx}>
              <Grid item xs={12} md={6} className={classes.padding}>
                <TextField
                  className={classes.textField}
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{ className: classes.inputlabel }}
                  label="Enter your Call-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
                <CopyToClipboard text={me} className={classes.margin}>
                  <ColorButton
                    variant="contained"
                    fullWidth
                    startIcon={<Assignment fontSize="large" />}
                  >
                    Generate Link
                  </ColorButton>
                </CopyToClipboard>
              </Grid>
              <Grid item xs={12} md={6} className={classes.padding}>
                <TextField
                  label="Enter ID to call"
                  className={classes.textField}
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{ className: classes.inputlabel }}
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  fullWidth
                />
                {callAccepted && !callEnded ? null : (
                  // <Button
                  //   variant="contained"
                  //   style={{ backgroundColor: "#FF0000", color: "#FFFFFF" }}
                  //   startIcon={<PhoneDisabled fontSize="large" />}
                  //   fullWidth
                  //   onClick={leaveCall}
                  //   className={classes.margin}
                  // >
                  //   Hang Up
                  // </Button>
                  <ColorButton
                    variant="contained"
                    startIcon={<Phone fontSize="large" />}
                    fullWidth
                    onClick={() => callUser(idToCall)}
                    className={classes.margin}
                  >
                    Call
                  </ColorButton>
                )}
              </Grid>
              {iscalling ? (
                <h2 className="callingtxt">Calling the other user!!</h2>
              ) : null}
            </Grid>
          </form>
        )}
        {children}
      </Paper>
    </Container>
  );
};

export default Options;
