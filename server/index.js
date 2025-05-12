import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);

//socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update to match your frontend URL
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};
io.on("connection", (socket) => {
  // console.log("User connected", socket.id);

  // listen
  socket.on("join", ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);

    // Send the list only to the newly joined user
    io.to(socket.id).emit("joined", {
      clients,
      username,
      socketId: socket.id,
    });

    // Notify others (except the newly joined)
    socket.in(roomId).emit("user-joined", {
      username,
      socketId: socket.id,
    });
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.in(roomId).emit("code-change", { code });
  });

  // // new user se past code dekha sakta hai
  socket.on("sync-code", ({ socketId, code }) => {
    io.to(socketId).emit("sync-code", { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server run at http:localhost:${PORT}`);
});
