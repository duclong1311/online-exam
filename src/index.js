import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Admin from './Components/Admin/Admin';
import User from './Components/User/User';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
