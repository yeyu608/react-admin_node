import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import HomePage from './layout'
import './App.css';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route key='1' path='/register'element={<Register/>} />
        <Route key='2' path='/login' element={<Login/>} />
        <Route key='3' path='/home' element={<Home/>} />
        <Route key='4' path='/homepage' element={<HomePage/>} />
      </Routes>
    </HashRouter>
  )
}

export default App;