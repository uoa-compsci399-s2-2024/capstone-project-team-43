
import React, { useEffect, useState } from 'react';
import '../App.css';
import { fetchProjects } from '../Api.js'
import Project from "../components/project";

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
                    <Project name={project.title} description={project.description} />
                ))}
            </ul>
        </div>    
    );
};

export default ProjectsAvailable;
