
import './App.css';


//import ReactDOM from "react-dom/client";
import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import Cornerstone from "./pages/projects-admin";
import ProjectProposalForm from "./pages/project-proposal";
import ProjectPreferences from './pages/project-preferences';
import ProjectsAvailable from './pages/projects-available';
import About from './pages/about';
import Contact from './pages/contact';
import NewSemster from './pages/new-semster';
import Navbar from "./components/navbar";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/pages/projects-admin' Component={Cornerstone} />
        <Route path='/' Component={Login} />
        <Route path='/pages/project-proposal' Component={ProjectProposalForm} />
        <Route path='/pages/project-preferences' Component={ProjectPreferences} />
        <Route path='/pages/projects-available' Component={ProjectsAvailable} />
        <Route path='/pages/about' Component={About} />
        <Route path='/pages/contact' Component={Contact} />
        <Route path='/pages/new-semster' Component={NewSemster} />
      </Routes>
      

    </div>
  );
}

export default App;
