import React, { useState, useEffect } from "react";
import { fetchProjects } from '../Api.js'

const ProjectsAdmin = () => {

    const [projects, setProjects] = useState([]);

    // get projects
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

    return(
        <div className="projects">
            <div id="head"> 
            <h3>2024 - Semester 2</h3>

            </div>
            
        <div id="sorting">
        <div id="left">
            <h2>Rejected</h2>
            {/* List rejected projects */}
            <ul>
                {projects
                .filter(project => project.status === 'rejected')
                .map(project => (
                    <li key={project.id}>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul>
        </div>
        <div id="center">
            <h2>Unsorted</h2>
            {/* List unsorted projects */}
            <ul>
                {projects
                .filter(project => project.status === 'pending')
                .map(project => (
                    <li key={project.id}>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul>
        </div>
        <div id="right">
            <h2>Approved</h2>
            {/* List approved projects */}
            <ul>
                {projects
                .filter(project => project.status === 'accepted')
                .map(project => (
                    <li key={project.id}>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul>
            
        </div>

        </div>

        </div>

    );
};

export default ProjectsAdmin;