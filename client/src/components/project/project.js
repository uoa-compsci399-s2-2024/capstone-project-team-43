import React from "react";
import { getUserRole } from '../../utils/auth.js';

import './project.css';

const Project = ({ number, name, description, status, expiry }) => {
    let today = new Date();
    let formatDate = today.toISOString();
    let available = "Unavailable";
    const userRole = getUserRole();

    if(formatDate < expiry){
        available = "Available"
    }

    return(
        <div className={`project-container ${userRole}`}>
            {userRole==='client' &&
            <div className="project-content">
                <div className="project-header">
                    <h2>{name}</h2>
                </div>
                <div className="project-info">
                    <p>{description}</p>
                </div>
            </div>}

            {userRole==='student' &&
            <div className="project-content">
                <div className="project-number">
                        <p>Project {number}</p>
                </div>
                <div className="project-name">
                    <p>{name}</p>
                </div>
                <div className="project-description">
                    <p>Description: {description}</p>
                </div>
            </div>}
            
            {userRole==='admin' &&
            <div className="project-content">
                <div className="number">
                        <p>Project {number}</p>
                </div>
                <div className="name">
                    <p>{name}</p>
                </div>
                <div className="description">
                    <p>Description: {description}</p>
                </div>
                <div className="status">
                    {status}
                </div>
                <div className="availability">
                {available}
                </div>
            </div>}                
        </div>
    )
}



export default Project;