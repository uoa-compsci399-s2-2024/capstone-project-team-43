//import logo from './logo.svg';
//import './App.css';


//import ReactDOM from "react-dom/client";
import React from "react";
import { Routes, Route, Link} from "react-router-dom";
import Login from "./pages/login";
import Cornerstone from "./pages/projects-admin";

import Navbar from "./components/navbar";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/pages/projects-admin' Component={Cornerstone} />
        <Route path='/pages/login' Component={Login} />
      </Routes>

      <Login />

    </div>
  );
}

export default App;
