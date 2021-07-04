import React, { useContext, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
import { SocketContext } from "../SocketContext";
import {
  VolumeOff,
  VideocamOff,
  Videocam,
  VolumeUp,
  Send,
  ScreenShare,
  StopScreenShare,
} from "@material-ui/icons";
import "../styles/video.css";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    height: "50vh",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  video2: {
    bottom: 0,
    width: "220px",
    height: "20vh",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  boxx: {
    justifyContent: "center",
    display: "flex",
    marginBottom: "30px",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  mycard: {
    padding: "10px",
    backgroundColor: "#92D7DC",
    margin: "10px",
  },
  mycard2: {
    padding: "10px",
    backgroundColor: "#92D7DC",
    margin: "10px",
  },
}));

const Video = () => {
  const [msg, setMsg] = useState("");
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
    sendMessage,
    getMessage,
    startVideo,
    cancelVideo,
    enableAudio,
    enableVideo,
  } = useContext(SocketContext);
  const classes = useStyles();
  if (stream) {
    stream.getVideoTracks()[0].onended = () => {
      console.log("OHOHOHO");
      {
        videoOn && startVideo();
      }
    };
  }

  return (
    <Grid container className={classes.boxx}>
      <div>
        {callAccepted && !callEnded && (
          <Paper className={classes.mycard}>
            <Grid item xs={12} md={6}>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className={classes.video}
              />
              <Typography variant="h5" gutterBottom>
                {call.name || "Name"}
              </Typography>
            </Grid>
          </Paper>
        )}
      </div>
      {/*  */}
      <div>
        {stream && (
          <Paper className={classes.mycard2}>
            <Grid item xs={12} md={12}>
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className={classes.video2}
              />
            </Grid>
          </Paper>
        )}
      </div>

      <div className="scrollablediv">
        <Paper className={classes.mycard2}>
          <Grid item xs={12} md={12}>
            {msg}
          </Grid>
          <TextField
            label="Your message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            fullWidth
          />
        </Paper>
      </div>
      {/* here */}
      <div className="navbar" id="myNavbar">
        {shareScreen ? (
          <Button className="centerbtn" onClick={stopShareScreenNow}>
            <ScreenShare className="greenicon" />
          </Button>
        ) : (
          <Button className="centerbtn" onClick={shareScreenNow}>
            <StopScreenShare className="redicon" />
          </Button>
        )}

        {videoOn ? (
          <Button className="centerbtn" onClick={cancelVideo}>
            <Videocam className="greenicon" />
          </Button>
        ) : (
          <Button className="centerbtn" onClick={enableVideo}>
            <VideocamOff className="redicon" />
          </Button>
        )}

        {voiceOn ? (
          <Button className="leftbtn" onClick={cancelAudio}>
            <VolumeUp className="greenicon" />
          </Button>
        ) : (
          <Button className="leftbtn" onClick={enableAudio}>
            <VolumeOff className="redicon" />
          </Button>
        )}
      </div>
      {/* here */}
    </Grid>
  );
};

export default Video;
