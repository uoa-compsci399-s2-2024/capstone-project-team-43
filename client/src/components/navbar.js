import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import cornerstone_logo from '../media/cornerstone_logo.png';

import '../App.css';

const Navbar = () => {

        // Changes to the user's role once the auth token has been verified
        let role = null;

    // Hides both register and login forms
    const form_close = () => {
        document.getElementById('loginright').style.display = "none";
        document.getElementById('createacc').style.display = "none";
    }

    const student_view = () => {
        try {
        document.getElementById('adminSideBar').style.display = "none";
        document.getElementById('clientSideBar').style.display = "none";
        document.getElementById('studentSideBar').style.display = "block";
        document.getElementById('projectSortNav').style.display = "none";
        document.getElementById('projectProposalNav').style.display = "none";
        document.getElementById('projectPreferencesNav').style.display = "block";
        document.getElementById('projectsAvailableNav').style.display = "block";
        document.getElementById('clientProjectNav').style.display = "none";
        } catch (err) {}
    }

    const client_view = () => {
        try {
        document.getElementById('adminSideBar').style.display = "none";
        document.getElementById('clientSideBar').style.display = "block";
        document.getElementById('studentSideBar').style.display = "none";
        document.getElementById('projectSortNav').style.display = "none";
        document.getElementById('projectProposalNav').style.display = "block";
        document.getElementById('projectPreferencesNav').style.display = "none";
        document.getElementById('projectsAvailableNav').style.display = "none";
        document.getElementById('clientProjectNav').style.display = "block";
        } catch (err) {}
    }

    const admin_view = () => {
        try {
        document.getElementById('adminSideBar').style.display = "block";
        document.getElementById('clientSideBar').style.display = "none";
        document.getElementById('studentSideBar').style.display = "none";
        document.getElementById('projectSortNav').style.display = "block";
        document.getElementById('projectsArchiveNav').style.display = "block";
        document.getElementById('projectProposalNav').style.display = "none";
        document.getElementById('projectPreferencesNav').style.display = "none";
        document.getElementById('projectsAvailableNav').style.display = "block";
        document.getElementById('clientProjectNav').style.display = "none";
        } catch (err) {}
    }

    const not_logged_in = () => {
        try {
        document.getElementById('adminSideBar').style.display = "none";
        document.getElementById('clientSideBar').style.display = "none";
        document.getElementById('studentSideBar').style.display = "none";
        document.getElementById('projectSortNav').style.display = "none";
        document.getElementById('projectProposalNav').style.display = "none";
        document.getElementById('projectsAvailableNav').style.display = "none";
        document.getElementById('projectPreferencesNav').style.display = "none";
        document.getElementById('clientProjectNav').style.display = "none";
        } catch (err) {}
    }

    const debugging_nav = () => {
        document.getElementById('adminSideBar').style.display = "block";
        document.getElementById('clientSideBar').style.display = "block";
        document.getElementById('studentSideBar').style.display = "block";
        document.getElementById('projectSortNav').style.display = "block";
        document.getElementById('projectProposalNav').style.display = "block";
        document.getElementById('projectsAvailableNav').style.display = "block";
        document.getElementById('projectPreferencesNav').style.display = "block";
        document.getElementById('clientProjectNav').style.display = "block";
        
    }

    try {
        const token = localStorage.getItem("authToken");

        if (token === "" || token === null || token === "null") {
            localStorage.setItem("authToken", "");
            //debugging_nav(); 
            not_logged_in(); //**uncomment for production and commment out debugging_nav()**
        } else {
        const decoded = jwtDecode(token);
        const role = decoded.role;

        if (role === "student") {
            student_view();
        } else if (role === "client") {
            client_view();
        } else if (role === "admin") {
            admin_view();
        }
    }
    } catch (err) {
        console.log(err);
    }

    const showsidemenu = () => {
        if (document.getElementById('sidemenu').style.display === "block") {
            document.getElementById('sidemenu').style.display = "none";
        }
        else {
            document.getElementById('sidemenu').style.display = "block";
        }
    }

    const showadminsidemenu = () => {
        if (document.getElementById('adminsidemenu').style.display === "block") {
            document.getElementById('adminsidemenu').style.display = "none";
        }
        else {
            document.getElementById('adminsidemenu').style.display = "block";
        }
    }

    const showclientsidemenu = () => {
        if (document.getElementById('clientsidemenu').style.display === "block") {
            document.getElementById('clientsidemenu').style.display = "none";
        }
        else {
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
            window.location.href = '/';
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // Gets the token from the cookie sent from the google callback
        const getToken = async () => {

            const stored_token = localStorage.getItem("authToken");

            console.log("token: ", stored_token);

            if (stored_token !== "") {

                try {
                    let res = await fetch("http://localhost:3001/api/auth/role", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "authToken": `${stored_token}`,

                        },
                    });
                    const resJson = await res.json();

                    role = resJson.role;

                    console.log(res.status);

                    if (res.status === 200) {

                        if (role === "client") {
                            console.log("user is a client");
                            client_view();
                        } else if (role === "student") {
                            console.log("user is a student");
                            student_view();
                        } else if (role === "admin") {
                            console.log("user is an admin");
                            admin_view();
                        } else {
                            //debugging_nav();
                            not_logged_in();  //**uncomment for production and commment out debugging_nav()**
                        } 

                    } else {
                        // Clears local storage
                        localStorage.setItem('authToken', "");
                        console.log("An error occurred during login");
                        window.location.reload();
                        
                    }
                } catch (err) {
                    // Clears local storage
                    localStorage.setItem('authToken', "");
                    console.log(err);
                    window.location.reload();
                }
            } else {
                //debugging_nav(); 
                not_logged_in(); //**uncomment for production and commment out debugging_nav()**
            }


        };

        getToken(); // This function gets called every time the page is rendered, (page refresh or redirects)
    }, []);

    return (
        <div>
            <nav className="navbar">
                <button className = 'sideMenuButton' onClick={showsidemenu} id="studentSideBar"></button>
                <button className = 'sideMenuButton' onClick={showadminsidemenu} id="adminSideBar"></button>
                <button className = 'sideMenuButton' onClick={showclientsidemenu} id="clientSideBar"></button>
                <ul>
                    <li>
                        <Link to='/pages/projects-available' id="projectsAvailableNav" state={{ user: "student" }}> Projects Available </Link> <br />
                    </li>
                    
                    <li>
                            <Link to='/pages/project-proposal' id="projectProposalNav" state={{ user: role }}> Project Proposal Form </Link> <br />
                        </li>
                        <li>
                        <Link to='/pages/about' state={{ user: role }} id="aboutNav"> About </Link> <br />
                    </li>
                    
                    <li>
                        <Link to='/' state={{ user: role }}> 
                            <img id="cornerstone_logo" src={cornerstone_logo} alt="Cornerstone" />
                        </Link> <br />
                    </li>
                    
                    <li>
                        <Link to='/pages/contact' state={{ user: role }}> Contact </Link> <br />
                    </li>
                    
                    <li>
                        <Link to='/pages/project-preferences' id="projectPreferencesNav" state={{ user: "student" }}> Project Preferences </Link> <br />
                    </li>
                    <li>
                        <Link to='/pages/projects-admin' id="projectSortNav" state={{ user: "admin" }}> Projects </Link> <br />
                    </li>
                    <li>
                    <Link to="/pages/client-projects" id="clientProjectNav">Client Projects</Link> <br />
                    </li>

                </ul>
            </nav>
            <div id="sidemenu" className="sidemenu">
                <div className='sidemenu-link-container'>
                    <ul>
                        Projects
                        <li>
                            <a href="/pages/projects-available" className="sidemenusub">Browse Projects</a>
                        </li>
                        <li>
                            <a href="/pages/project-preferences" className="sidemenusub">Project Preferences Form</a>
                        </li>
                        <li>
                            <Link to='/pages/about' state={{ user: role }}> About </Link> <br />
                        </li>
                        <li>
                            <Link to='/pages/contact' state={{ user: role }}> Contact </Link> <br />
                        </li>
                        <li>
                            <button className = 'logoutButton' onClick={Logout}>Sign Out</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="adminsidemenu" className="sidemenu">
                <div className='sidemenu-link-container'>
                    <ul>
                        Control Panel
                        <li>
                            <a href="/pages/projects-admin" className="sidemenusub">Manage Projects</a>
                        </li>
                        <li>
                            <a href="/pages/manage-semester/1" className="sidemenusub">Manage Semesters</a>
                        </li>
                        <li>
                            <a href="/pages/projects-archive/1" id="projectsArchiveNav" className="sidemenusub">View Archive</a>
                        </li>
                        Projects
                        <li>
                            <Link to='/pages/project-proposal' state={{ user: role }}> Project Proposal Form </Link> <br />
                        </li>
                        <li>
                            <Link to="/pages/client-projects" className="sidemenusub">My Projects</Link>
                        </li>


                        <li>
                            <Link to='/pages/about' state={{ user: role }}> About </Link> <br />
                        </li>
                        <li>
                            <Link to='/pages/contact' state={{ user: role }}> Contact </Link> <br />
                        </li>
                        <li>
                            <button className = 'logoutButton' onClick={Logout}>Sign Out</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="clientsidemenu" className="sidemenu">
                <div className='sidemenu-link-container'>
                    <ul>
                        Projects
                        <li>
                            <a href="/pages/project-proposal" className="sidemenusub">Project Proposal Form</a>
                        </li>
                        <li>
                            <a className="sidemenusub">My Projects</a>
                        </li>
                        <li>
                            <Link to='/pages/about' state={{ user: role }}> About </Link> <br />
                        </li>
                        <li>
                            <Link to='/pages/contact' state={{ user: role }}> Contact </Link> <br />
                        </li>
                        <li>
                            <button className = 'logoutButton' onClick={Logout}>Sign Out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )

}

export default Navbar;