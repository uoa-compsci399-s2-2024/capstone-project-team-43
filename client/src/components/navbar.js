import React from "react";
import Cookies from 'js-cookie';

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

    // Logs the user out by blacklisting the token and clearing the users local storage token
    const Logout = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            console.log("TAKING TOKEN: ", token);
            let res = await fetch("http://localhost:3001/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": `${token}`,
                },
            });

        if (res.status !== 200) {
            throw new Error('Logout was Unsuccessful');
        }

        // Clears local storage
        localStorage.setItem('authToken', ""); 
        Cookies.remove('authToken');
        console.log("Successfully Logged out!");
        window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    return(
        <div>
        <nav className="navbar">
            <p onClick={showsidemenu} id="studentSideBar">sidemenu</p>
            <p onClick={showadminsidemenu} id="adminSideBar">Admin sidemenu</p>
            <p onClick={showclientsidemenu} id="clientSideBar">Client sidemenu</p>
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
                    <button onClick={Logout}>Sign Out</button>
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
                    <button onClick={Logout}>Sign Out</button>
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
                <button onClick={Logout}>Sign Out</button>
                </li>
                </ul>
            </div>
        </div>
    )

}

export default navbar;