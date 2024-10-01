
import React, { useEffect, useState } from 'react';
import '../App.css';
import { fetchProjects, fetchSemesters } from '../Api.js'
import Project from "../components/project";
import PopUp from "../components/project-pop-up-admin.js";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const ClientProjects = () => {

    let id;
    try {
        const token = Cookies.get("authToken");
        if (token === "") {
            console.log("User not logged in");
        } else {
        const decoded = jwtDecode(token);
        console.log(decoded);
        id = decoded.userId;
        console.log("ROLE SHOWING ", id);
    }
    } catch (err) {
        console.log(err);
    } 


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

    let owner_id = id;
    return(
        
        <div className="clientProjects">
           
            <div id="projectsC">
            
                {projects.filter(project => project.owner_id === owner_id).map(project => (
                     (<div onClick={() => handleclick(project)}>
                     <Project id={project.id} name={project.title} description={project.description} expiry={project.expiry}/>
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

                     </div>)
                 
                    
                ))}
<button id="close" onClick={submit}>&times;</button>

            </div>  
        </div>  
    );
}

export default ClientProjects;