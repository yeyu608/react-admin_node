import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router/routerList"
import './App.css';


const App = () => {


  //生成动态路由
  const CreateRoutes = () => {
    const element = useRoutes(routes)
    return element
  }

  return (
    <CreateRoutes />
  )
}

export default App;