import React,{createContext} from "react";
import { io } from "socket.io-client";
const SOCKET_SERVER_URL = process.env.REACT_SOCKET_SERVER_URL;

export const SocketContext = createContext();
export const socket = io(SOCKET_SERVER_URL);

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}