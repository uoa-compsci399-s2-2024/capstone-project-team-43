import React,{ useState, useEffect } from "react";

import './project.css';
import { fetchProjectById } from "../../Api";

const Project = ({ projectId, view  }) => {
    const [project, setProject] = useState(null);
    let today = new Date();
    let formatDate = today.toISOString();
    let available = "Unavailable";

    // fetch project data 
    useEffect(() => {
        async function getProjectById(projectId) {
            try {
                console.log('fetching project with id',projectId);
                const data = await fetchProjectById(projectId);
                setProject(data);
                console.log('Fetched Project:'+ data);
            } catch (error) {
                console.error('Failed to load project:', error);
            }
        }
        getProjectById(projectId);
    }, []);

    // if(formatDate < project.expiry){
    //     available = "Available"
    // }

    return(
        <div className={`project-container ${view}`}>
            {(project && view==='client') &&
            <div className="project-content">
                <div className="project-header">
                    <h2>{project.title}</h2>
                </div>
                <div className="project-info">
                    <p>{project.description}</p>
                </div>
            </div>}

            {(project && view==='student') &&
            <div className="project-content">
                <div className="project-number">
                        <p>Project {project.number}</p>
                </div>
                <div className="project-name">
                    <p>{project.title}</p>
                </div>
                <div className="project-description">
                    <p>Description: {project.description}</p>
                </div>
            </div>}
            
            {(project && view==='admin') &&
            <div className="project-content">
                <div className="project-header">
                    <p>{project.title}</p>
                </div>
                <div className="project-info">
                    {project.description && <div className="desc-box">
                        <div className="desc-container">
                            <h3>Description</h3>
                            <div className="desc-text">
                                <p>{project.description}</p>
                            </div>
                        </div>
                    </div>}
                    {project.deliverable && <div className="deliverable-box">
                        <div className="deliverable-container">
                            <h3>Deliverable</h3>
                            <div className="deliverable-text">
                                <p>{project.deliverable}</p>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>}                
        </div>
    )
}



export default Project;