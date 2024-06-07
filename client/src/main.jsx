import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';

const RELOAD_TIME = 10 * 60 * 1000; // 10 minutes

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// WE DO NOT RELOAD THE CLIENT, MIGHT CAUSE UNKNOWN LOOP
// I GUESS IT IS NOT THE RIGHT WAY TO IMPLEMENT TO TIMEOUT
// TODO: ADD IN ANOTHER WAY THE TIMEOUT
// setTimeout(() => {
//   window.location.reload();
// }, RELOAD_TIME); // 10 minutes
