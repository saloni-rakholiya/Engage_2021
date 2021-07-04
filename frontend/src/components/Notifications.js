import React, { useContext } from "react";
import { Button } from "@material-ui/core";

import { SocketContext } from "../SocketContext";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h2>{call.name} is calling :</h2>
          <Button
            variant="contained"
            style={{ backgroundColor: "#0B6D74", color: "#FFFFFF" }}
            onClick={answerCall}
          >
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
