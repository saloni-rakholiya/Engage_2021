import React, { createContext, useState, useRef, useEffect } from "react";
import Peer from "simple-peer";
import ScrollableFeed from "react-scrollable-feed";
import { io } from "socket.io-client";
import "./styles/socketcontext.css";

const SocketContext = createContext();

const socket = io("http://localhost:5000/");
// const socket = io("https://teams-clonee.herokuapp.com/");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [me, setMe] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const [iscalling, setIscalling] = useState(false);
  const [shareScreen, setShareScreen] = useState();

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
        setVideoOn(false);
        myVideo.current.srcObject
          .getTracks()
          .map((t) => (t.kind == "video" ? (t.enabled = false) : null));
      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ userToCall, from, name: callerName, signal }) => {
      setCall({
        isReceivingCall: true,
        from,
        name: callerName,
        signal,
        to: userToCall,
      });
    });

    socket.on("callRejected", () => {
      setIscalling(false);
      window.alert("Your Call was Rejected!");
    });

    socket.on("stopcalling", () => {
      console.log("stoppp");
      setIscalling(false);
    });
    socket.on(
      "registercallUser",
      ({ userToCall, from, name: callerName, signal }) => {
        console.log(userToCall);
        console.log(from);
        setCall({
          isReceivingCall: false,
          from,
          name: callerName,
          signal,
          to: userToCall,
        });
      }
    );
  }, []);

  //
  useEffect(() => {
    socket.on("private message", ({ name, message }) => {
      console.log("reading");
      setChat([...chat, { name, message }]);
    });

    return () => null;
  }, [chat]);
  //

  const answerCall = () => {
    setCallAccepted(true);
    setIscalling(false);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from, from: me });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const rejectCall = () => {
    setCallAccepted(false);
    setCall({});
    socket.emit("rejectCall", { to: call.from });
  };
  const callUser = (id) => {
    console.log("Calling");
    setIscalling(true);
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

  const cancelVideo = () => {
    console.log("No video");
    setVideoOn(false);
    myVideo.current.srcObject
      .getTracks()
      .map((t) => (t.kind == "video" ? (t.enabled = false) : null));
  };

  const enableVideo = () => {
    console.log("Video on");
    setVideoOn(true);
    myVideo.current.srcObject
      .getTracks()
      .map((t) => (t.kind == "video" ? (t.enabled = true) : null));
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

  // const shareScreenNow = () => {
  //   console.log("sharing screen now");

  //   navigator.mediaDevices
  //     .getDisplayMedia({
  //       video: true,
  //       audio: { echoCancellation: true, noiseSuppresion: true },
  //     })
  //     .then((currentStream) => {
  //       console.log("hello");
  //       console.log(currentStream);
  //       setStream(currentStream);
  //       myVideo.current.srcObject = currentStream;
  //       console.log(stream);
  //     });

  //   setShareScreen(true);
  // };
  // const stopShareScreenNow = () => {
  //   console.log("not sharing screen now");
  //   stream.getTracks().forEach((track) => track.stop());

  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((currentStream) => {
  //       setStream(currentStream);
  //       myVideo.current.srcObject = currentStream;
  //     });
  //   setShareScreen(false);
  // };

  // //

  const onMessageSubmit = (e) => {
    console.log("submitted");
    const { name, message } = state;
    setChat([...chat, { name, message }]);
    if (call.to == me) {
      socket.emit("private message", call.from, name, message);
    } else {
      socket.emit("private message", call.to, name, message);
    }
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return (
      <ScrollableFeed>
        {chat.map(({ name, message }, index) => (
          <div key={index}>
            <h3 className="msg">
              {name} -{`>`} <span>{message}</span>
            </h3>
          </div>
        ))}
      </ScrollableFeed>
    );
  };

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //
  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
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
        onMessageSubmit,
        renderChat,
        onTextChange,
        chat,
        state,
        iscalling,
        rejectCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
