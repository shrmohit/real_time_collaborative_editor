import { io } from "socket.io-client";

export const initSocket = async () => {
  const backendUrl = import.meta.env.VITE_SERVER_URL;
  // console.log("Backend URL:", backendUrl);

  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };

  return io(backendUrl, options);
};
