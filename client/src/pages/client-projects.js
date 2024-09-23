
import React, { useEffect, useState } from 'react';
import '../App.css';
import { fetchProjects, fetchSemesters } from '../Api.js'
import Project from "../components/project";

import PopUp from "../components/project-pop-up-admin.js";

const ClientProjects = () => {


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
    const edit =() =>{
        alert("edit");
    }

    let owner_id = 1;
    return(
        
        <div className="clientProjects">
           
            <div id="projectsC">
            
                {projects.filter(project => project.owner_id === owner_id).map(project => (
                     (<div onClick={() => handleclick(project)}>
                     <Project id={project.id} name={project.title} description={project.description}/>
                     <div id="confirm">
                         {console.log(project)}
             <PopUp id={project.id} 
             name={project.title} 
             description={project.description}
             // owner id
             requirements = {project.special_requirements}
             resources = {project.resources}
             skills = {project.preferred_skills}
             deliverable = {project.project_deliverable}
             created = {project.created}
             // expiry= {project.expiry}
             teams = {project.max_num_of_groups}
             number = {project.project_number}
             />
             {/* <button id="close" onClick={submit}>&times;</button> */}
         </div>
                     </div>)
                 
                    
                ))}
<button id="close" onClick={submit}>&times;</button>
<button id="edit" onClick={edit}>Edit</button>
            </div>  
        </div>  
    );
}

export default ClientProjects;