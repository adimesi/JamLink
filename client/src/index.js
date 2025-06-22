import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
// import axios from "axios";
// import Cookies from "js-cookie";
// const token = Cookies.get('token');
// if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </SocketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
