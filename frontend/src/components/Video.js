import React, { useContext } from "react";
import { Grid, Typography, Paper, makeStyles, Button } from "@material-ui/core";
import { SocketContext } from "../SocketContext";
import {
  VolumeOff,
  VideocamOff,
  Videocam,
  VolumeUp,
  ScreenShare,
  StopScreenShare,
} from "@material-ui/icons";

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
    backgroundColor: "#92D7DC",
    margin: "10px",
  },
}));

const Video = () => {
  const {
    name,
    shareScreen,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    cancelAudio,
    voiceOn,
    videoOn,
    stream,
    shareScreenNow,
    stopShareScreenNow,
    call,
    startVideo,
    cancelVideo,
    enableAudio,
    enableVideo,
  } = useContext(SocketContext);
  const classes = useStyles();
  console.log(stream);
  if (stream) {
    stream.getVideoTracks()[0].onended = () => {
      console.log("OHOHOHO");
      {
        {
          videoOn && startVideo();
        }
      }
    };
  }

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

              {shareScreen ? (
                <Button onClick={stopShareScreenNow}>
                  <StopScreenShare />
                </Button>
              ) : (
                <Button onClick={shareScreenNow}>
                  <ScreenShare />
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
