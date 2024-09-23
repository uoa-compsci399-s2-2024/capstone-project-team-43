
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


      const handleclick = (project) =>{
        document.getElementById('confirm').style.display = "block";
        document.getElementById('close').style.display = "block";
      };


      
    return(
        <div className="projectsAvailable">


 
            <ul>

                {projects.map(project => (
                    

                    (<div onClick={() => handleclick(project)}>
                    <Project id={project.id} name={project.title} description={project.description}/>
                    <div id="confirm">
                        {console.log(project)}
            <PopUp id={project.id} 
            name={project.title} 
            description={project.description}
            // owner id
            skills = {project.preferred_skills}
            deliverable = {project.project_deliverable}
            created = {project.created}
            // expiry= {project.expiry}
            teams = {project.max_num_of_groups}
            number = {project.project_num}
            />
           
        </div>

                    </div>)
                ))}
            </ul>

            <button id="close" onClick={submit}>&times;</button>

        </div>    

    );

};

export default ProjectsAvailable;
