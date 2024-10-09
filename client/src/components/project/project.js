import React from "react";

import './project.css';

const Project = ({ view, number, name, description, status, expiry }) => {
    let today = new Date();
    let formatDate = today.toISOString();
    let available = "Unavailable";

    if(formatDate < expiry){
        available = "Available"
    }

    return(
        <div className={`project-container ${view}`}>
            {view==='client' &&
            <div className="project-content">
                <div className="project-header">
                    <h2>{name}</h2>
                </div>
                <div className="project-info">
                    <p>{description}</p>
                </div>
            </div>}

            {view==='student' &&
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
            
            {view==='admin' &&
            <div className="project-content">
                <div className="name">
                    <p>{name}</p>
                </div>
                <div className="desc-box">
                    <div className="desc-container">
                        <div className="desc-text">
                            {description}
                        </div>
                    </div>
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