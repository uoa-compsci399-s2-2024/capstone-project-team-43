
import React, { useEffect, useState } from 'react';
import '../App.css';
import { fetchProjects } from '../Api.js'
import Project from "../components/project";
import PopUp from "../components/project-pop-up-admin.js";

const ProjectsAvailable = () => {


    const [projects, setProjects] = useState([]);

    
    const submit =() =>{
        document.getElementById('confirm').style.display = "none";
        document.getElementById('close').style.display = "none";
        document.getElementById('edit').style.display = "none";
    }

    const edit =() =>{
        alert("edit");
    }

    const confirmation = () =>{
 
        document.getElementById('confirm').style.display = "block";

    }
   

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


      const handleclick = () =>{
        document.getElementById('confirm').style.display = "block";
        document.getElementById('close').style.display = "block";
        document.getElementById('edit').style.display = "block";
      };


      
    return(
        <div className="projectsAvailable">


 
            <ul>
                {projects.filter(project => project.published === 'false').map(project => (
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
               )
                )}
            </ul>

            <button id="close" onClick={submit}>&times;</button>
            <button id="edit" onClick={edit}>Edit</button>

        </div>    

    );

};

export default ProjectsAvailable;
