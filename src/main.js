import React from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter,HashRouter } from "react-router-dom";
import 'antd/dist/antd.css'
import App from "./App.tsx"

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)