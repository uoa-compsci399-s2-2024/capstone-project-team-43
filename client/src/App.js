import './index.css';
import './App.css';

import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landing-page/landing-page";
import Dashboard from './pages/dashboard/dashboard';
import Layout from './components/layout/layout.js';
import About from './pages/about/about.js';
import Contact from './pages/contact/contact.js';
import Faq from './pages/faq/faq.js';
import AccountSettings from './pages/account-settings/account-settings.js';

import ProjectProposalForm from "./pages/project-proposal/project-proposal.js";
import ClientProjectsView from './pages/client-projects-view/client-projects.js';

import ManageSemester from './pages/manage-semester/manage-semester.js';
import ProjectsArchive from './pages/projects-archive/projects-archive.js';
import CreateSemester from './pages/create-semester/create-semester.js';
import AdminProjectsView from './pages/admin-projects-view/projects-admin.js';
import EditProject from './pages/edit-project/edit-project.js';

import ProjectsAvailable from './pages/student-projects-view/projects-available.js';
import ProjectPreferences from './pages/project-preference-form/project-preferences.js';


function App() {

  return (
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>;

          {/* home page */}
          <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>;
        

          {/* Student Pages */}
          <Route path='/projects/available' element={<Layout><ProjectsAvailable/></Layout>} />
          <Route path='/project/preferences/submit' element={<Layout><ProjectPreferences/></Layout>} />

          {/* Admin Pages  */}
          <Route path='/projects/archive/:semesterID' element={<Layout><ProjectsArchive /></Layout>} />
          <Route path='/manage/semester/:semesterID' element={<Layout><ManageSemester /></Layout>}/>
          <Route path='/create/semester' element={<Layout><CreateSemester /></Layout>}/>
          <Route path='/projects/manage' element={<Layout><AdminProjectsView /></Layout>}/>
          <Route path='/projects/edit/:projectID' element={<Layout><EditProject /></Layout>}/>


          {/* Client Pages */}
          <Route path='/projects/submit' element={<Layout><ProjectProposalForm/></Layout>} />
          <Route path='/projects/view' element={<Layout><ClientProjectsView/></Layout>} />


          {/* General */}
          <Route path='/about' element={<Layout><About/></Layout>} />
          <Route path='/contact' element={<Layout><Contact/></Layout>} />
          <Route path='/account/settings' element={<Layout><AccountSettings /></Layout>} />
          <Route path='/faq' element={<Layout><Faq /></Layout>} />


        </Routes>
      
      </div>
  );
}

export default App;
