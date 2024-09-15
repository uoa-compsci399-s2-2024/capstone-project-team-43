import React from "react";

import '../App.css';
const navbar = () =>{
    const showsidemenu = () =>{
        if(document.getElementById('sidemenu').style.display == "block"){
            document.getElementById('sidemenu').style.display = "none";
        }
        else{
            document.getElementById('sidemenu').style.display = "block";
        }
    }
    return(
        <div>
        <nav className="navbar">
            <p onClick={showsidemenu}>sidemenu</p>
            <a href="/">Cornerstone</a>
            <ul>
                <li>
                    <a href="/pages/projects-admin">project</a>
                </li>
                {/* <li>
                    <a href="/pages/login">login</a>
                </li> */}
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
                    <a href="/pages/new-semster">New Semster</a>
                </li>
            </ul>
        </nav>
        <div id="sidemenu">
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
                </ul>
            </div>
        </div>
    )

}

export default navbar;