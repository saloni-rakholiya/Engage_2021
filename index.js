const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  // console.log(io.sockets.sockets);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    // console.log(io.sockets.sockets.has(userToCall));
    if (!io.sockets.sockets.has(userToCall)) {
      // console.log("doesnt exist");
      io.to(from).emit("iddoesntexist");
    } else {
      io.to(userToCall).emit("callUser", {
        userToCall,
        signal: signalData,
        from,
        name,
      });
      io.to(from).emit("registercallUser", {
        userToCall,
        signal: signalData,
        from,
        name,
      });
    }
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
    io.to(data.to).emit("stopcalling");
  });

  socket.on("checkifsocketexists", ({ id, me }) => {
    // console.log("once");
    io.to(me).emit("checksockets", io.sockets.sockets.has(id));
  });

  socket.on("rejectCall", (data) => {
    io.to(data.to).emit("callRejected");
  });

  socket.on("callcut", (anotherSocketId) => {
    // console.log("cutting");
    io.to(anotherSocketId).emit("callcut");
  });
  socket.on("private message", (anotherSocketId, name, message) => {
    socket.to(anotherSocketId).emit("private message", { name, message });
  });
});

server.listen(PORT, () => console.log(`Running on port ${PORT}`));
