import React from 'react';
import ReactDOM from 'react-dom/client';
import Signup from './jsxcomponents/Signup'; 
import Login from './jsxcomponents/Login'
import {BrowserRouter , Routes , Router}from 'react-router-dom' //imports for router in react
import App from './jsxcomponents/App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
    
  </React.StrictMode>
);

 
