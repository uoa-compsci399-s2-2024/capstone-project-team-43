
import './App.css';


//import ReactDOM from "react-dom/client";
import React from "react";
import { Routes, Route, Link} from "react-router-dom";
import Login from "./pages/login";
import Cornerstone from "./pages/projects-admin";
import ProjectProposalForm from "./pages/project-proposal";

import Navbar from "./components/navbar";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/pages/projects-admin' Component={Cornerstone} />
        <Route path='/' Component={Login} />
        <Route path='/pages/project-proposal' Component={ProjectProposalForm} />
      </Routes>


    </div>
  );
}

export default App;
