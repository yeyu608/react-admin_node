import React from "react";
import { useRoutes } from "react-router-dom";

import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import HomePage from './layout'
import routes from "./router/routerList"
import './App.css';


const CreateRoutes = () => {
  const element = useRoutes(routes)
  return element
}


const App = () => {

  //生成动态路由
  console.log(CreateRoutes())
  
  return (
      <CreateRoutes />
  )
}

export default App;