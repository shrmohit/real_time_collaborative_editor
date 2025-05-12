import { useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success("RoomId is generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("both field required");
      return;
    }
    // navigate
    navigate(`/editor/${roomId}`, { state: { username } });
    toast.success("Room is created");
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#1c1e29]">
      <div className="w-full max-w-xl px-4">
        <div className="bg-gray-700 shadow-md rounded-lg p-4">
          <div className="bg-gray-900 p-6 text-center rounded-lg">
            <h1 className="text-white">Editor</h1>
            <h4 className="text-white text-2xl font-semibold mb-4">
              Enter the ROOM ID
            </h4>

            <div className="mb-3">
              <input
                type="text"
                placeholder="ROOM ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              onClick={joinRoom}
              className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white text-lg py-3 rounded-md transition duration-300"
            >
              JOIN
            </button>
            <p className="mt-4 text-white">
              Don't have a room ID? create{" "}
              <span
                className="text-green-400 hover:underline cursor-pointer"
                onClick={generateRoomId}
              >
                New Room
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
