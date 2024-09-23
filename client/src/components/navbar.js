import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLocation, Link } from 'react-router-dom';

import '../App.css';
const Navbar = () => {


    const student_view = () => {
        if (getLocation() === "/") {
            form_close();
        }
        document.getElementById('adminSideBar').style.display = "none";
        document.getElementById('clientSideBar').style.display = "none";
        document.getElementById('studentSideBar').style.display = "block";
        document.getElementById('projectSortNav').style.display = "none";
        document.getElementById('projectsArchiveNav').style.display = "none";
        document.getElementById('projectProposalNav').style.display = "none";
        document.getElementById('projectPreferencesNav').style.display = "block";
        document.getElementById('projectsAvailableNav').style.display = "block";
        document.getElementById('uploadCSVNav').style.display = "none";
        document.getElementById('newSemNav').style.display = "none";
        document.getElementById('manageFutureNav').style.display = "none";
        document.getElementById('manageCurrentNav').style.display = "none";
    }

    const client_view = () => {
        if (getLocation() === "/") {
            form_close();
        }
        document.getElementById('adminSideBar').style.display = "none";
        document.getElementById('clientSideBar').style.display = "block";
        document.getElementById('studentSideBar').style.display = "none";
        document.getElementById('projectSortNav').style.display = "none";
        document.getElementById('projectsArchiveNav').style.display = "none";
        document.getElementById('projectProposalNav').style.display = "block";
        document.getElementById('projectPreferencesNav').style.display = "none";
        document.getElementById('projectsAvailableNav').style.display = "none";
        document.getElementById('uploadCSVNav').style.display = "none";
        document.getElementById('newSemNav').style.display = "none";
        document.getElementById('manageFutureNav').style.display = "none";
        document.getElementById('manageCurrentNav').style.display = "none";
    }

    const admin_view = () => {
        if (getLocation() === "/") {
            form_close();
        }
        document.getElementById('adminSideBar').style.display = "block";
        document.getElementById('clientSideBar').style.display = "none";
        document.getElementById('studentSideBar').style.display = "none";
        document.getElementById('projectSortNav').style.display = "block";
        document.getElementById('projectsArchiveNav').style.display = "block";
        document.getElementById('projectProposalNav').style.display = "block";
        document.getElementById('projectPreferencesNav').style.display = "none";
        document.getElementById('projectsAvailableNav').style.display = "block";
        document.getElementById('uploadCSVNav').style.display = "block";
        document.getElementById('newSemNav').style.display = "none";
        document.getElementById('manageFutureNav').style.display = "block";
        document.getElementById('manageCurrentNav').style.display = "block";
    }

    const not_logged_in = () => {
        if (getLocation() === "/") {
            login_form();
        }
        document.getElementById('adminSideBar').style.display = "none";
        document.getElementById('clientSideBar').style.display = "none";
        document.getElementById('studentSideBar').style.display = "none";
        document.getElementById('projectSortNav').style.display = "none";
        document.getElementById('projectsArchiveNav').style.display = "none";
        document.getElementById('projectProposalNav').style.display = "none";
        document.getElementById('projectsAvailableNav').style.display = "none";
        document.getElementById('projectPreferencesNav').style.display = "none";
        document.getElementById('uploadCSVNav').style.display = "none";
        document.getElementById('newSemNav').style.display = "none";
        document.getElementById('manageFutureNav').style.display = "none";
        document.getElementById('manageCurrentNav').style.display = "none";
    }

    const debugging_nav = () => {
        if (getLocation() === "/") {
            login_form();
        }

        document.getElementById('adminSideBar').style.display = "block";
        document.getElementById('clientSideBar').style.display = "block";
        document.getElementById('studentSideBar').style.display = "block";
        document.getElementById('projectSortNav').style.display = "block";
        document.getElementById('projectsArchiveNav').style.display = "block";
        document.getElementById('projectProposalNav').style.display = "block";
        document.getElementById('projectsAvailableNav').style.display = "block";
        document.getElementById('projectPreferencesNav').style.display = "block";
        document.getElementById('uploadCSVNav').style.display = "block";
        document.getElementById('newSemNav').style.display = "block";
        document.getElementById('manageFutureNav').style.display = "block";
        document.getElementById('manageCurrentNav').style.display = "block";
    }

    try {
        const location = useLocation();
        const { user } = location.state;

        if (user === "student") {
            student_view();
        } else if (user === "client") {
            client_view();
        } else if (user === "admin") {
            admin_view();
        } else {
            //not_logged_in(); **uncomment for production**
        }
    } catch { }

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
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const getLocation = () => {
        const path = window.location.pathname;
        return path;
    }

    // Hides register form, shows register form
    const login_form = () => {
        document.getElementById('loginright').style.display = "block";
        document.getElementById('createacc').style.display = "none";

    }

    // Hides both register and login forms
    const form_close = () => {
        document.getElementById('loginright').style.display = "none";
        document.getElementById('createacc').style.display = "none";
    }

    // Changes to the user's role once the auth token has been verified
    let role = null;


    useEffect(() => {


        // Gets the token from the cookie sent from the google callback
        const getToken = async () => {
            const token = Cookies.get('authToken');
            if (token) {

                // Stores the resulting Auth Token
                localStorage.setItem("authToken", token);
                console.log("Token stored:", token);

            }

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

                            debugging_nav();
                            //login_form(); **once debugging nav bar is done uncomment theses**
                            //not_logged_in();
                        }

                    } else {
                        console.log("An error occurred during login");
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                debugging_nav();
                //login_form(); **once debugging nav bar is done uncomment theses**
                //not_logged_in();
            }


        };

        getToken(); // This function gets called every time the page is rendered, (page refresh or redirects)
    }, []);

    return (
        <div>
            <nav className="navbar">
                <p onClick={showsidemenu} id="studentSideBar">sidemenu</p>
                <p onClick={showadminsidemenu} id="adminSideBar">Admin sidemenu</p>
                <p onClick={showclientsidemenu} id="clientSideBar">Client sidemenu</p>
                <a href="/">Cornerstone</a>
                <ul>
                    <li>
                        <Link to='/pages/projects-admin' id="projectSortNav" state={{ user: "admin" }}> Project </Link> <br />
                    </li>
                    <li>
                        <Link to='/pages/projects-archive' id="projectsArchiveNav" state={{ user: "admin" }}> Projects archive </Link> <br />
                    </li>
                    <li>
                        <Link to='/pages/project-proposal' id="projectProposalNav" state={{ user: role }}> Project Proposal </Link> <br />
                    </li>
                    <li>
                        <Link to='/pages/project-preferences' id="projectPreferencesNav" state={{ user: "student" }}> Project Preferences </Link> <br />
                    </li>
                    <li>
                        <Link to='/pages/projects-available' id="projectsAvailableNav" state={{ user: "student" }}> Projects(students) </Link> <br />
                    </li>
                    <li>
                        <Link to='/pages/about' state={{ user: role }}> About </Link> <br />
                    </li>
                    <li>
                        <Link to='/pages/contact' state={{ user: role }}> Contact </Link> <br />
                    </li>
                    <li>
                        <Link to='/pages/manage-semester' id="uploadCSVNav" state={{ user: "admin" }}> Upload </Link> <br />
                    </li>
                    <li>
                        <Link to='/pages/new-semster' id="newSemNav" state={{ user: "admin" }}> New Semster </Link> <br />
                    </li>
                    <li>
                    <Link to='/pages/manage-future' id="manageFutureNav" state={{ user: "admin" }}> Manage Future </Link> <br />
                    </li>
                    <li>
                    <Link to='/pages/manage-current' id="manageCurrentNav" state={{ user: "admin" }}> Manage Current </Link> <br />
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

export default Navbar;