
import React, { useEffect, useState } from 'react';
import '../App.css';
import { fetchProjects, fetchSemesters } from '../Api.js'
import Project from "../components/project";
import Header from "../components/admin-semester-header.js";
import { useLocation } from 'react-router-dom'
import PopUp from "../components/project-pop-up-admin.js";

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
    let current = semesters.filter(semester => semester.status == 'current')
    let sem_id = from;
    return(
        
        <div className="archive">
            <Header current = {semesters[0]}  semesters = {semesters} page={from}/>
            <div id="archivedProjects">
            
                {projects.filter(project => project.semester_id === sem_id).map(project => (
                    

                    (<div onClick={() => handleclick(project)}>
                 <Project id={project.id} name={project.title} description={project.description} status={project.status}/>
                    <div id="confirm">

            <PopUp id={project.id} 
            name={project.title} 
            description={project.description}
            // owner id
            requirements = {project.special_requirements}
            resources = {project.resources}
            skills = {project.preferred_skills}
            deliverable = {project.project_deliverable}
            created = {project.created}
            expiry= {project.expiry}
            teams = {project.max_teams}
            number = {project.project_number}
            />
        </div>
{/* <button id="close" onClick={submit}>&times;</button> */}
                    </div>)
                    
                ))}
        <button id="close" onClick={submit}>&times;</button>
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