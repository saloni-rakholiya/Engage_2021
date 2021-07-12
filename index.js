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

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
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
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
    io.to(data.to).emit("stopcalling");
  });

  socket.on("rejectCall", (data) => {
    io.to(data.to).emit("callRejected");
  });

  socket.on("private message", (anotherSocketId, name, message) => {
    socket.to(anotherSocketId).emit("private message", { name, message });
  });
});

server.listen(PORT, () => console.log(`Running on port ${PORT}`));
