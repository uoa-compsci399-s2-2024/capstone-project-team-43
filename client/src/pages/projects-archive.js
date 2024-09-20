
import React, { useEffect, useState } from 'react';
import '../App.css';
import { fetchProjects } from '../Api.js'
import Project from "../components/project";
import Header from "../components/admin-semester-header.js";

const ProjectsArchive = () => {
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
        
        <div className="archive">
            <Header semester = "2024 - Semester 1" current = "2024 - Semester 2"/>
            <div id="archivedProjects">
            
                {projects.map(project => (
                    <Project id={project.id} name={project.title} description={project.description} />
                    
                ))}
                 <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
                 <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
                 <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
                 <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
            
            </div>  
        </div>  
    );
}

export default ProjectsArchive;