
import React, { useEffect, useState } from 'react';
import '../App.css';
import { fetchProjects, fetchSemesters } from '../Api.js'
import Project from "../components/project";
import Header from "../components/admin-semester-header.js";
import { useLocation } from 'react-router-dom'

const ProjectsArchive = () => {
    const location = useLocation()
  const { from } = location.state

  console.log(from);
  
    const [semesters, setSemesters] = useState([]);

    // get data onall semesters
    useEffect(() => {
        async function getSemesters() {
            try {
                const data = await fetchSemesters();
                setSemesters(data);
            } catch (error) {
                console.error('Failed to load semesters:', error);
            }
        }
        getSemesters();
    }, []);

// console.log(props);


    const [projects, setProjects] = useState([]);

    // get data onall accepted projects 
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

    let sem_id = from;
    return(
        
        <div className="archive">
            <Header semester = "2024 - Semester 1" current = "2024 - Semester 2" semesters = {semesters}/>
            <div id="archivedProjects">
            
                {projects.filter(project => project.semester_id === sem_id).map(project => (
                    <Project id={project.id} name={project.title} description={project.description} status={project.status}/>
                    
                ))}
                 {/* <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
                 <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
                 <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
                 <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
             */}
            </div>  
        </div>  
    );
}

export default ProjectsArchive;