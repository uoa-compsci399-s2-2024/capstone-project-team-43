import React from "react";

import '../App.css';
const navbar = () =>{
    const showsidemenu = () =>{
        if(document.getElementById('sidemenu').style.display === "block"){
            document.getElementById('sidemenu').style.display = "none";
        }
        else{
            document.getElementById('sidemenu').style.display = "block";
        }
    }

    const showadminsidemenu = () =>{
        if(document.getElementById('adminsidemenu').style.display === "block"){
            document.getElementById('adminsidemenu').style.display = "none";
        }
        else{
            document.getElementById('adminsidemenu').style.display = "block";
        }
    }

    const showclientsidemenu = () =>{
        if(document.getElementById('clientsidemenu').style.display === "block"){
            document.getElementById('clientsidemenu').style.display = "none";
        }
        else{
            document.getElementById('clientsidemenu').style.display = "block";
        }
    }

    return(
        <div>
        <nav className="navbar">
            <p onClick={showsidemenu}>sidemenu</p>
            <p onClick={showadminsidemenu}>Admin sidemenu</p>
            <p onClick={showclientsidemenu}>Client sidemenu</p>
            <a href="/">Cornerstone</a>
            <ul>
                <li>
                    <a href="/pages/projects-admin">project</a>
                </li>
                <li>
                    <a href="/pages/projects-archive">Projects archive</a>
                </li>
                <li>
                    <a href="/pages/project-proposal">Project Proposal</a>
                </li>
                <li>
                    <a href="/pages/project-preferences">Project Preferences</a>
                </li>
                <li>
                    <a href="/pages/projects-available">Projects(students)</a>
                </li>
                <li>
                    <a href="/pages/about">About</a>
                </li>
                <li>
                    <a href="/pages/contact">Contact</a>
                </li>
                <li>
                    <a href="/pages/manage-semester">Upload</a>
                </li>
                <li>
                    <a href="/pages/new-semster">New Semster</a>
                </li>
                <li>
                    <a href="/pages/manage-future">Manage Future</a>
                </li>
                <li>
                    <a href="/pages/manage-current">Manage Current</a>
                </li>
            </ul>
        </nav>
        <div id="sidemenu" className="sidemenu">
                <ul>
                    Projects                    
                <li>
                    <a href="/pages/projects-available" className="sidemenusub">Browse Projects</a>
                </li>
                <li>
                    <a href="/pages/project-preferences" className="sidemenusub">Project Preferences Form</a>
                </li>
                <li>
                    <a href="/pages/about">About</a>
                </li>
                <li>
                    <a href="/pages/contact">Contact</a>
                </li>
                <li>
                    Sign Out
                </li>
                </ul>
            </div>
            <div id="adminsidemenu" className="sidemenu">
                <ul>
                    Control Panel                  
                <li>
                    <a href="/pages/projects-admin" className="sidemenusub">Manage Projects</a>
                </li>
                <li>
                    <a href="/pages/manage-current" className="sidemenusub">Manage Semesters</a>
                </li>
                <li>
                    <a href="/pages/projects-archive" className="sidemenusub">View Archive</a>
                </li>
                Projects
                <li>
                    <a href="/pages/project-proposal" className="sidemenusub">Project Proposal Form</a>
                </li>
                <li>
                    <a className="sidemenusub">My Projects</a>
                </li>


                <li>
                    <a href="/pages/about">About</a>
                </li>
                <li>
                    <a href="/pages/contact">Contact</a>
                </li>
                <li>
                    Sign Out
                </li>
                </ul>
            </div>
            <div id="clientsidemenu" className="sidemenu">
                <ul>
                    Projects                    
                <li>
                    <a href="/pages/project-proposal" className="sidemenusub">Project Proposal Form</a>
                </li>
                <li>
                    <a className="sidemenusub">My Projects</a>
                </li>
                <li>
                    <a href="/pages/about">About</a>
                </li>
                <li>
                    <a href="/pages/contact">Contact</a>
                </li>
                <li>
                    Sign Out
                </li>
                </ul>
            </div>
        </div>
    )

}

export default navbar;