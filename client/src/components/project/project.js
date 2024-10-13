import React,{ useState, useEffect, useRef } from "react";

import './project.css';
import { fetchProjectById } from "../../Api";

const Project = ({ projectId, view, expanded, expandProject=null  }) => {
    const [project, setProject] = useState(null);
    const [projectButtons, setProjectButtons] = useState(false);
    // const [isExpanded, setIsExpanded] = useState(expanded || false);
    const isStudent = view ==='student';
    const isAdmin = view ==='admin';
    const isClient = view ==='client';

    const projectRef = useRef(null);

    let today = new Date();
    let formatDate = today.toISOString();
    let available = "Unavailable";

    const showProjectButtons = () => {setProjectButtons(true)};
    const hideProjectButtons = () => {setProjectButtons(false)};

    useEffect(() => {
        if (expanded && projectRef.current) {
            projectRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center"}); 
        }
    }, [expanded]);  


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

    return(
        <div className={`project-wrapper  ${expanded ? 'expanded':'collapsed'}`}>
        <div 
            ref={projectRef}
            onMouseEnter={showProjectButtons} 
            onMouseLeave = {hideProjectButtons} 
            className={`project-container ${expanded ? 'expanded':'collapsed'}`}
            >
            {project &&
            <div className="project-content">
                <div className="project-header">
                    <p>{project.project_number > 0 && `${project.project_number}.`} {project.title}</p>
                </div>
                <div className="project-data">
                    <div className="project-data-box">
                        <div className="project-data-container">
                            <p className="proj-data-header">Description</p>
                            <div className="project-data-text">
                                <p>{project.description || 'None'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="project-data-box">
                        <div className="project-data-container">
                            <p className="proj-data-header">Deliverable</p>
                            <div className="project-data-text">
                                <p>{project.deliverable || 'None'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="project-data-box">
                        <div className="project-data-container">
                            <p className="proj-data-header">Preferred Skills</p>
                            <div className="project-data-text">
                                <p>{project.preferred_skills || 'None'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="project-data-box">
                        <div className="project-data-container">
                            <p className="proj-data-header">Special Requirements</p>
                            <div className="project-data-text">
                                <p>{project.special_requirements || 'None'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="project-data-box">
                        <div className="project-data-container">
                            <p className="proj-data-header">Available Resources</p>
                            <div className="project-data-text">
                                <p>{project.preferred_skills || 'None'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {(projectButtons && !isAdmin) && < div className="expand-button-container">
                    <div className="expand-text">
                       {expanded ? 'Click Anywhere to Collapse' : 'Click Anywhere to Expand'}
                    </div>
                </div>}
            </div>}             
        </div> 
        </div>
    )
}



export default Project;