import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

//socket.io
const io = new Server(server);
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
});

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server run at http:localhost:${PORT}`);
});
