const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let sharedText = ""; // Store text globally

io.on("connection", (socket) => {
  socket.emit("update-text", sharedText); // Send current text to new user

  socket.on("send-text", (newText) => {
    sharedText = newText;
    socket.broadcast.emit("update-text", newText); // Sync with others
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
