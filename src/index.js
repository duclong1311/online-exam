import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Admin from './Components/Admin/Admin';
import User from './Components/User/User';
import HomePage from './Components/Home/HomePage';
import ManageUser from './Components/Admin/Content/ManageUser';
import DashBoard from './Components/Admin/Content/DashBoard';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<HomePage />} />
          <Route path="/user" element={<User />} />
        </Route>

        <Route path="/admin" element={<Admin />} >
          <Route index element={<DashBoard />} />
          <Route path='/admin/manage-user' element={<ManageUser />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
