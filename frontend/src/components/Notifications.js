import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import "../styles/options.css";
import { SocketContext } from "../SocketContext";

const Notifications = () => {
  const { rejectCall, answerCall, call, callAccepted } =
    useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className="bigdiv">
          <h2 className="callingtxt">{call.name} Calling :</h2>
          <Button
            variant="contained"
            className="answeringbtn"
            onClick={answerCall}
          >
            Answer
          </Button>

          <Button
            variant="contained"
            className="rejectingbtn"
            onClick={rejectCall}
          >
            Reject
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
