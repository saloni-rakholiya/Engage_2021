import React, { useContext } from "react";
import { Grid, Typography, Paper, makeStyles, Button } from "@material-ui/core";
import { SocketContext } from "../SocketContext";
import { VolumeOff, VideocamOff, Videocam, VolumeUp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  boxx: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  mycard: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const Video = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    cancelAudio,
    voiceOn,
    videoOn,
    stream,
    call,
    cancelVideo,
    enableAudio,
    enableVideo,
  } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.boxx}>
      {stream && (
        <Paper className={classes.mycard}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
              {videoOn ? (
                <Button onClick={cancelVideo}>
                  <VideocamOff />
                </Button>
              ) : (
                <Button onClick={enableVideo}>
                  <Videocam />
                </Button>
              )}

              {voiceOn ? (
                <Button onClick={cancelAudio}>
                  <VolumeOff />
                </Button>
              ) : (
                <Button onClick={enableAudio}>
                  <VolumeUp />
                </Button>
              )}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.mycard}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default Video;
