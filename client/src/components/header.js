import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import cornerstone_logo from '../media/cornerstone_logo.png';
import GetUserRole from './get-user-role';

import '../App.css';
import '../index.css';


const Header = () => {
    const [userRole, setUserRole] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);  

    // Changes to the user's role once the auth token has been verified

    // get user role (student, admin etc.)
    useEffect(() => {
        const role = GetUserRole();
        console.log('role header:',role);
        setUserRole(role);
    }, []);

    return (
        <header>
            <p>hi</p>
            {/* logo linking to home page */}
            <div className='logo-container'>
                <Link to="/">
                    <img src={require('../media/logo.png')} alt="Link to home page" />
                </Link>
            </div>
        </header>
    );
    }

    export default Header;


    //     try {
    //     document.getElementById('adminSideBar').style.display = "none";
    //     document.getElementById('clientSideBar').style.display = "none";
    //     document.getElementById('studentSideBar').style.display = "block";
    //     document.getElementById('projectSortNav').style.display = "none";
    //     document.getElementById('projectProposalNav').style.display = "none";
    //     document.getElementById('projectPreferencesNav').style.display = "block";
    //     document.getElementById('projectsAvailableNav').style.display = "block";
    //     document.getElementById('clientProjectNav').style.display = "none";
    //     } catch (err) {}
    // }

    // const client_links = () => {
    //     try {
    //     document.getElementById('adminSideBar').style.display = "none";
    //     document.getElementById('clientSideBar').style.display = "block";
    //     document.getElementById('studentSideBar').style.display = "none";
    //     document.getElementById('projectSortNav').style.display = "none";
    //     document.getElementById('projectProposalNav').style.display = "block";
    //     document.getElementById('projectPreferencesNav').style.display = "none";
    //     document.getElementById('projectsAvailableNav').style.display = "none";
    //     document.getElementById('clientProjectNav').style.display = "block";
    //     } catch (err) {}
    // }

    // const admin_links = () => {
    //     try {
    //     document.getElementById('adminSideBar').style.display = "block";
    //     document.getElementById('clientSideBar').style.display = "none";
    //     document.getElementById('studentSideBar').style.display = "none";
    //     document.getElementById('projectSortNav').style.display = "block";
    //     document.getElementById('projectsArchiveNav').style.display = "block";
    //     document.getElementById('projectProposalNav').style.display = "none";
    //     document.getElementById('projectPreferencesNav').style.display = "none";
    //     document.getElementById('projectsAvailableNav').style.display = "block";
    //     document.getElementById('clientProjectNav').style.display = "none";
    //     } catch (err) {}
    // }

    // const not_logged_in = () => {
    //     try {
    //     document.getElementById('adminSideBar').style.display = "none";
    //     document.getElementById('clientSideBar').style.display = "none";
    //     document.getElementById('studentSideBar').style.display = "none";
    //     document.getElementById('projectSortNav').style.display = "none";
    //     document.getElementById('projectProposalNav').style.display = "none";
    //     document.getElementById('projectsAvailableNav').style.display = "none";
    //     document.getElementById('projectPreferencesNav').style.display = "none";
    //     document.getElementById('clientProjectNav').style.display = "none";
    //     } catch (err) {}
    // }

    // const debugging_nav = () => {
    //     document.getElementById('adminSideBar').style.display = "block";
    //     document.getElementById('clientSideBar').style.display = "block";
    //     document.getElementById('studentSideBar').style.display = "block";
    //     document.getElementById('projectSortNav').style.display = "block";
    //     document.getElementById('projectProposalNav').style.display = "block";
    //     document.getElementById('projectsAvailableNav').style.display = "block";
    //     document.getElementById('projectPreferencesNav').style.display = "block";
    //     document.getElementById('clientProjectNav').style.display = "block";
        
    // }



    // const showsidemenu = () => {
    //     if (document.getElementById('sidemenu').style.display === "block") {
    //         document.getElementById('sidemenu').style.display = "none";
    //     }
    //     else {
    //         document.getElementById('sidemenu').style.display = "block";
    //     }
    // }

    // const showadminsidemenu = () => {
    //     if (document.getElementById('adminsidemenu').style.display === "block") {
    //         document.getElementById('adminsidemenu').style.display = "none";
    //     }
    //     else {
    //         document.getElementById('adminsidemenu').style.display = "block";
    //     }
    // }

    // const showclientsidemenu = () => {
    //     if (document.getElementById('clientsidemenu').style.display === "block") {
    //         document.getElementById('clientsidemenu').style.display = "none";
    //     }
    //     else {
    //         document.getElementById('clientsidemenu').style.display = "block";
    //     }
    // }

    // // Logs the user out by blacklisting the token and clearing the users local storage token
    // const Logout = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const token = localStorage.getItem('authToken');
    //         console.log("TAKING TOKEN: ", token);
    //         let res = await fetch("http://localhost:3001/api/auth/logout", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "authToken": `${token}`,
    //             },
    //         });

    //         if (res.status !== 200) {
    //             throw new Error('Logout was Unsuccessful');
    //         }

    //         // Clears local storage
    //         localStorage.setItem('authToken', "");
    //         Cookies.remove('authToken');
    //         console.log("Successfully Logged out!");
    //         window.location.href = '/';
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     // Gets the token from the cookie sent from the google callback
    //     const getToken = async () => {

    //         const stored_token = localStorage.getItem("authToken");

    //         console.log("token: ", stored_token);

    //         if (stored_token !== "") {

    //             try {
    //                 let res = await fetch("http://localhost:3001/api/auth/role", {
    //                     method: "GET",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         "authToken": `${stored_token}`,

    //                     },
    //                 });
    //                 const resJson = await res.json();

    //                 role = resJson.role;

    //                 console.log(res.status);

    //                 if (res.status === 200) {

    //                     if (role === "client") {
    //                         console.log("user is a client");
    //                         client_view();
    //                     } else if (role === "student") {
    //                         console.log("user is a student");
    //                         student_view();
    //                     } else if (role === "admin") {
    //                         console.log("user is an admin");
    //                         admin_view();
    //                     } else {
    //                         //debugging_nav();
    //                         not_logged_in();  //**uncomment for production and commment out debugging_nav()**
    //                     } 

    //                 } else {
    //                     // Clears local storage
    //                     localStorage.setItem('authToken', "");
    //                     console.log("An error occurred during login");
    //                     window.location.reload();
                        
    //                 }
    //             } catch (err) {
    //                 // Clears local storage
    //                 localStorage.setItem('authToken', "");
    //                 console.log(err);
    //                 window.location.reload();
    //             }
    //         } else {
    //             //debugging_nav(); 
    //             not_logged_in(); //**uncomment for production and commment out debugging_nav()**
    //         }
    //     };
    //     getToken(); // This function gets called every time the page is rendered, (page refresh or redirects)
    // }, []);

