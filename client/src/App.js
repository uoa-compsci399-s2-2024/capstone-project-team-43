//import logo from './logo.svg';
//import './App.css';


//import ReactDOM from "react-dom/client";
import React from "react";
import { Routes, Route, Link} from "react-router-dom";
import Login from "./pages/login";
import Cornerstone from "./pages/projects";

import Navbar from "./components/navbar";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/pages/projects' Component={Cornerstone} />
        <Route path='/pages/login' Component={Login} />
      </Routes>

    </div>
  );
}

export default App;
