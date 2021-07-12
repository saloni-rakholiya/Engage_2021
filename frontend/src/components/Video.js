import React, { useContext } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { SocketContext } from "../SocketContext";
import {
  VolumeOff,
  VideocamOff,
  Videocam,
  VolumeUp,
  CallEnd,
} from "@material-ui/icons";
import "../styles/video.css";
import { useStyles } from "../styles/video.component.style";

const Video = () => {
  const {
    callAccepted,
    myVideo,
    leaveCall,
    userVideo,
    callEnded,
    cancelAudio,
    voiceOn,
    videoOn,
    stream,
    cancelVideo,
    enableAudio,
    enableVideo,
    onMessageSubmit,
    renderChat,
    onTextChange,
    state,
  } = useContext(SocketContext);
  const classes = useStyles();

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

        {callAccepted && !callEnded && (
          <div className="scrollable-div">
            <Paper className={classes.mycard2}>
              <div className="card">
                <div className="render-chat">
                  <h3 className="whitetxt">Chat</h3>
                  <div className="scrolldiv">{renderChat()}</div>
                </div>
                <form onSubmit={onMessageSubmit}>
                  <div className="name-field">
                    <TextField
                      name="name"
                      className={classes.textField}
                      InputProps={{
                        className: classes.input,
                      }}
                      InputLabelProps={{ className: classes.inputlabel }}
                      onChange={(e) => onTextChange(e)}
                      value={state.name}
                      id="standard-secondary"
                      label="Enter chat-name"
                    />
                  </div>
                  <div>
                    <TextField
                      name="message"
                      className={classes.textField}
                      InputProps={{
                        className: classes.input,
                      }}
                      InputLabelProps={{ className: classes.inputlabel }}
                      onChange={(e) => onTextChange(e)}
                      value={state.message}
                      id="standard-secondary"
                      label="Enter your Message"
                    />
                  </div>
                  <button className="btnsend">Send Message</button>
                </form>
              </div>
            </Paper>
          </div>
        )}
      </div>

      <div className="navbar" id="myNavbar">
        {/* {shareScreen ? (
          <Button className="centerbtn" onClick={stopShareScreenNow}>
            <ScreenShare className="greenicon" />
          </Button>
        ) : (
          <Button className="centerbtn" onClick={shareScreenNow}>
            <StopScreenShare className="redicon" />
          </Button>
        )} */}

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

        {callAccepted && !callEnded ? (
          <Button className="leftbtn" onClick={leaveCall}>
            <CallEnd className="redicon" />
          </Button>
        ) : null}
      </div>
    </Grid>
  );
};

export default Video;
