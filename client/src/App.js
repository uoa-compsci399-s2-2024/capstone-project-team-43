
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
import Header from './components/header';


// import Navbar from "./components/navbar";
import ManageSemester from './pages/manage-semester';
import ProjectsArchive from './pages/projects-archive';
import ClientProjects from './pages/client-projects';
import AccountSettings from './pages/account-settings';
import LandingPage from './pages/landing-page';

function App() {

  return (
    <div>
      {/* <Navbar /> */}
      <Header />
      <Routes>
        <Route path='/pages/projects-admin' Component={Cornerstone} />
        <Route path='/pages/projects-available' Component={ProjectsAvailable} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' Component={Login} />

        <Route path='/pages/project-proposal' Component={ProjectProposalForm} />
        <Route path='/pages/project-preferences' Component={ProjectPreferences} />
        <Route path='/pages/projects-archive/:semesterID' element={<ProjectsArchive />} />
        <Route path='/pages/about' Component={About} />
        <Route path='/pages/contact' Component={Contact} />
        <Route path='/pages/new-semster' Component={NewSemster} />
        <Route path='/pages/manage-semester/:semesterID' element={<ManageSemester />} />
        <Route path='/pages/account-settings/' element={<AccountSettings />} />

        <Route path='/pages/client-projects' Component={ClientProjects} />
      </Routes>
      

    </div>
  );
}

export default App;
