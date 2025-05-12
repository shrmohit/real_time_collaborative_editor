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
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
});

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server run at http:localhost:${PORT}`);
});
