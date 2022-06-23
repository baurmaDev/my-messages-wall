import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Main from './components/Main/Main'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);


