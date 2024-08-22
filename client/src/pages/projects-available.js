
import React, { useEffect, useState } from 'react';
import '../App.css';
import { fetchProjects } from '../Api.js'

const ProjectsAvailable = () => {

    const [projects, setProjects] = useState([]);

    // get data onall accepted projects 
    useEffect(() => {
        async function getProjects() {
            try {
                const data = await fetchProjects('accepted');
                setProjects(data);
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjects();
    }, []);

    return(
        <div className="projectsAvailable">
            <ul>
                {projects.map(project => (
                    <li key={project.id} className="project">
                        <p id="projectNum"></p>
                        <h2 id="projectName">{project.title}</h2>
                        <p id="projectDescription">{project.description}</p>
                    </li>
                ))}
            </ul>
        </div>    
    );
};

export default ProjectsAvailable;