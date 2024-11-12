
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProjects, fetchProjectsByUser, fetchPublishedProjects } from '../../Api.js'
import Project from "../../components/project/project.js";
import PopUp from "../../components/pop-up admin/project-pop-up-admin.js";
import { getUserID, getUserRole } from '../../utils/auth.js';
import './client-projects.css'

const ClientProjectsView = () => {
    const [projects, setProjects] = useState([]);
    const [userID, setUserID] = useState(null);
    const [expandedProjects, setExpandedProjects] = useState({});

    const navigate = useNavigate();


    useEffect(() => {
        console.log("getting user id");
        const id = getUserID();
        console.log("user id:"+id);
        setUserID(id);

    }, []);

    const expandProject = (projectId) => {
        setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] })); 
    }



    // Get all projects in database
    useEffect(() => {
        async function getProjects() {
            try {
                const data = await fetchProjects();
                const id = getUserID();
                const userProjects = data.filter(project => project.owner_id == id);
                setProjects(userProjects);
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjects();
    }, []);

    const expandAll = () => {
        const allExpanded = {};
        projects.forEach(project => {
            allExpanded[project.id] = true; 
        });
        setExpandedProjects(allExpanded);
    }

    const collapseAll = () => {
        const allCollapsed = {};
        projects.forEach(project => {
            allCollapsed[project.id] = false; 
        });
        setExpandedProjects(allCollapsed);
    }

    return(
        <main className="client-projects-view-page">
            {projects && <div className='content'>
                <div className='page-heading'>
                    <h1>Your Projects</h1>
                </div>
                {projects.length > 0 && <div className='page-content'>
                <div className='projects-container'>
                    {projects.map(project => (
                            <div key={project.id} >
                            <Project className = 'project'
                                view='client'
                                projectId={project.id}
                                expanded={expandedProjects[project.id]}
                                expandProject = {expandProject}
                            />
                            {/* // <div className="project-wrapper-buttons">
                            //     <button onClick={() => expandProject(project.id)} className="admin-expand-button">
                            //         {!expandedProjects[project.id] ? 'Expand Project Details' : 'Collapse Project Details'}
                            //     </button> 
                            // {expandedProjects[project.id] && <button onClick={() => navigate(`/projects/edit/${project.id}`)} className="admin-expand-button">
                            //         Edit Project
                            //     </button>} 
                            // </div> */}
                        </div>
                    ))}                       
                </div>
                </div>}
                {projects.length === 0 && (<div className='page-content text-page'>
                        <p>You haven't submitted any project proposals yet</p>
                        <Link to='/projects/submit'>
                            <span className="create-link">Go to Project Proposal Form</span>
                        </Link>
                    </div>
                    )}
                </div>}
        </main>  
    );
}

export default ClientProjectsView;