import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Disciplinas from './pages/Disciplinas.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/home/",
    element: <Home/>
  },
  {
    path: "/cadastro",
    element: <Cadastro/>
  },
  // {
  //   path: "/professores",
  //   element: <Profess/>
  // },
  {
    path: "/disciplinas",
    element: <Disciplinas/>
  },
  

])



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>,
)
