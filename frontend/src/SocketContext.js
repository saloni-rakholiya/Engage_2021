import React, { createContext, useState, useRef, useEffect } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io("http://localhost:5000/");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [shareScreen, setShareScreen] = useState(false);
  const [me, setMe] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  const startVideo=()=>{
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
  }
  const cancelVideo = () => {
    console.log("No video");
    setVideoOn(false);
    myVideo.current.srcObject
      .getTracks()
      .map((t) => (t.kind == "video" ? (t.enabled = false) : null));
  };

  const enableVideo = () => {
    console.log("Video on");
    myVideo.current.srcObject
      .getTracks()
      .map((t) => (t.kind == "video" ? (t.enabled = true) : null));
    setVideoOn(true);
  };

  const cancelAudio = () => {
    console.log("No Audio");
    setVoiceOn(false);
    myVideo.current.srcObject
      .getTracks()
      .map((t) => (t.kind == "audio" ? (t.enabled = false) : null));
  };

  const enableAudio = () => {
    setVoiceOn(true);
    console.log("Audio On");
    myVideo.current.srcObject
      .getTracks()
      .map((t) => (t.kind == "audio" ? (t.enabled = true) : null));
  };

  const shareScreenNow = () => {
    console.log("sharing screen now");
    navigator.mediaDevices
      .getDisplayMedia({
        video: { cursor: "always" },
        audio: { echoCancellation: true, noiseSuppresion: true },
      })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    setShareScreen(true);
  };
  const stopShareScreenNow = () => {
    console.log("not sharing screen now");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
    setShareScreen(false);
  };
  return (
    <SocketContext.Provider
      value={{
        call,
        startVideo,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        shareScreenNow,
        stopShareScreenNow,
        shareScreen,
        me,
        videoOn,
        voiceOn,
        callUser,
        leaveCall,
        answerCall,
        cancelVideo,
        cancelAudio,
        enableAudio,
        enableVideo,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
