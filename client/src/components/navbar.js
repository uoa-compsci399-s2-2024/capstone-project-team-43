import React from "react";

import '../App.css';
const navbar = () =>{
    return(
        <nav className="navbar">
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
            </ul>
            
        </nav>
    )

}

export default navbar;