import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import "../styles/options.css";
import { SocketContext } from "../SocketContext";
import { AnswerButton } from "../styles/answerbtn";
import { RejectButton } from "../styles/rejectbtn";
const Notifications = () => {
  const { rejectCall, answerCall, call, callAccepted } =
    useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className="bigdiv">
          <h2 className="callingtxt">{call.name} Calling :</h2>
          <AnswerButton
            variant="contained"
            onClick={answerCall}
          >
            Answer
          </AnswerButton>

          <RejectButton
            variant="contained"
            onClick={rejectCall}
          >
            Reject
          </RejectButton>
        </div>
      )}
    </>
  );
};

export default Notifications;
