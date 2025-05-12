import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Client = ({ username }) => {
  return (
    <div className="flex items-center mb-3">
      <Avatar>
        <AvatarImage
          src={null}
          alt={username}
        />
        <AvatarFallback className="bg-green-600 text-white font-medium text-lg">
          {username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="ml-2">{username.toString()}</span>
    </div>
  );
};

export default Client;
