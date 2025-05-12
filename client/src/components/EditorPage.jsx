import React, { useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { useEffect } from "react";
import { initSocket } from "../socket";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useRef } from "react";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => {
        handleError(err);
      });
      socketRef.current.on("connect_failed", (err) => {
        handleError(err);
      });
      const handleError = (e) => {
        console.log("socket error =>", e);
        toast.error("Socket connecttion failed");
        navigate("/");
      };
      socketRef.current.emit("join", {
        roomId,
        username: location.state?.username,
      });
    };
    init();
  }, []);
  const [clients, setClients] = useState([
    {
      socketId: 1,
      username: "mohit",
    },
    {
      socketId: 2,
      username: "setu",
    },
  ]);

  if (!location.state) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex flex-grow">
        {/* Client panel */}
        <div className="w-full md:w-1/5 bg-gray-900 text-white flex flex-col p-4">
          {/* <img
            src="/images/codecast.png"
            alt="Logo"
            className="mx-auto mb-2"
            style={{ maxWidth: "150px", marginTop: "-43px" }}
          /> */}
          <h1 className="text-center text-2xl font-bold ">Editor</h1>
          <hr className="my-2 mt-12 border-gray-600" />

          {/* Client list */}
          <div className="flex flex-col flex-grow overflow-auto">
            <span className="mb-2 text-sm font-semibold text-gray-300">
              Members
            </span>
            {clients.map((client) => (
              <Client
                key={client.socketId}
                username={client.username}
              />
            ))}
          </div>

          <hr className="my-3 border-gray-600" />

          {/* Buttons */}
          <div className="mt-auto mb-3 space-y-2">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
              Copy Room ID
            </button>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
              Leave Room
            </button>
          </div>
        </div>

        {/* Editor panel */}
        <div className="w-full md:w-4/5 text-white flex flex-col bg-gray-800">
          {/* Language selector */}
          {/* <div className="bg-gray-900 p-3 flex justify-end">
            <select className="bg-gray-700 text-white rounded px-3 py-2 focus:outline-none">
              {LANGUAGES.map((lang) => (
                <option
                  key={lang}
                  value={lang}
                >
                  {lang}
                </option>
              ))}
            </select>
          </div> */}

          <Editor />
        </div>
      </div>

      {/* Compiler toggle button */}
      {/* <button
        className="fixed bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md z-[1050]"
        onClick={toggleCompileWindow}
      >
        {isCompileWindowOpen ? "Close Compiler" : "Open Compiler"}
      </button> */}

      {/* Compiler section */}
      {/* <div
        className={`bg-gray-900 text-white p-4 transition-all duration-300 ease-in-out fixed bottom-0 left-0 right-0 z-[1040] ${
          isCompileWindowOpen ? "block" : "hidden"
        }`}
        style={{
          height: isCompileWindowOpen ? "30vh" : "0",
          overflowY: "auto",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-semibold">
            Compiler Output ({selectedLanguage})
          </h5>
          <div className="flex space-x-2">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              onClick={runCode}
              disabled={isCompiling}
            >
              {isCompiling ? "Compiling..." : "Run Code"}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              onClick={toggleCompileWindow}
            >
              Close
            </button>
          </div>
        </div>
        <pre className="bg-gray-800 p-4 rounded overflow-auto text-sm">
          {output || "Output will appear here after compilation"}
        </pre>
      </div> */}
    </div>
  );
};

export default EditorPage;
