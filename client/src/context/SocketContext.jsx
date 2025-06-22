import React,{createContext} from "react";
import { io } from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:3000"; 

export const SocketContext = createContext();
export const socket = io(SOCKET_SERVER_URL);

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}