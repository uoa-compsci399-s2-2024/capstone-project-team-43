
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects, fetchProjectsByUser } from '../../Api.js'
import Project from "../../components/project/project.js";
import PopUp from "../../components/project-pop-up-admin.js";
import { jwtDecode } from "jwt-decode";
import { getUserId } from '../../utils/auth.js';

import './client-projects.css'

const ClientProjectsView = () => {
    const [projects, setProjects] = useState([]);
    const userId = getUserId();
    
    // useEffect(() => {
    //     async function getProjectsByUser() {
    //         try {
    //             const data = await fetchProjectsByUser(userId);
    //             setProjects(data);
    //         } catch (error) {
    //             console.error('Failed to load projects:', error);
    //         }
    //     }
    //     getProjectsByUser();
    // }, []);

    useEffect(() => {
        async function getProjects() {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjects();
    }, []);

    const handleclick = () =>{
        document.getElementById('confirm').style.display = "block";
        document.getElementById('close').style.display = "block";
        document.getElementById('edit').style.display = "block";
      };
      const submit =() =>{
        document.getElementById('confirm').style.display = "none";
        document.getElementById('close').style.display = "none";
        document.getElementById('edit').style.display = "none";
    }

    return(
        <main className="client-projects-view-page">
            <div className='content'>
                <h1>Your Projects</h1>
                <div className='projects-container'>
                    {projects.filter(project => project.owner_id === userId).length === 0 &&
                        <p>
                            You haven't submitted any project proposals yet.
                        </p>
                    }
                    {(projects.filter(project => project.owner_id === userId).length > 0 &&
                        projects.map(project => (
                            (<div onClick={() => handleclick(project)}>
                                <Project 
                                    id={project.id} 
                                    name={project.title} 
                                    description={project.description}
                                    requirements = {project.special_requirements}
                                    resources = {project.resources}
                                    skills = {project.preferred_skills}
                                    deliverable = {project.project_deliverable}
                                    created = {project.created}
                                    expiry= {project.expiry}
                                    teams = {project.max_teams}
                                    number = {project.project_number}
                                />  
                            </div>)  
                        ))
                    )}                   
                            {/* <div id="confirm"> */}
                            {/* <PopUp id={project.id} 
                                name={project.title} 
                                description={project.description}
                                requirements = {project.special_requirements}
                                resources = {project.resources}
                                skills = {project.preferred_skills}
                                deliverable = {project.project_deliverable}
                                created = {project.created}
                                expiry= {project.expiry}
                                teams = {project.max_teams}
                                number = {project.project_number}
                            /> */}
                </div>
                <div className='redirect-to-proposal'>
                    <Link to='/projects/submit'>
                        <span>Go to Project Proposal Form</span>
                    </Link>
                </div>
            </div> 
        </main>  
    );
}

export default ClientProjectsView;