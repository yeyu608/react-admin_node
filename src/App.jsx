import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import HomePage from './layout'
import routes from "./router/routerList.ts"
import './App.css';


//生成动态路由
console.log(routes)
const createRoutes = () => {
  let result = []
  routes.map(item => {
    if (item.children) {
      item.children.map(ele => {
        result.push(
          <Route key={ele.id} path={item.path + ele.path} element={ele.element} />
        )
      })
    }
    result.push(
      <Route key={item.id} path={item.path} element={item.element} />
    )
  })
  return result
}
console.log(createRoutes())

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Login />}></Route>
        <Route path='/register'element={<Register/>} />
        <Route path='/homepage' element={<HomePage/>} />
        {createRoutes()}
      </Routes>
    </BrowserRouter>
  )
}

export default App;