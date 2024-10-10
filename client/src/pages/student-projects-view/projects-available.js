
import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../../Api.js'
import Project from "../../components/project/project.js";
import PopUp from "../../components/project-pop-up-student.js";

const ProjectsAvailable = () => {
    const [projects, setProjects] = useState([]);

    // get data on all accepted projects 
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
        document.getElementById('popup').style.display = "block";
        document.getElementById('close').style.display = "block";       
      };



      const close =() =>{
        document.getElementById('popup').style.display = "none";
        document.getElementById('close').style.display = "none";
    }

      
    return(
        <main className="students-projects-view-page">
            <div className='content'>
                <h1>Available Projects</h1>
                <div className='projects-container'>
                    {projects.filter(project => project.published === 'true' && project.semester_id === 1).length === 0 && 
                        <p>
                            There are currently no available projects.
                        </p>
                    }
                    {projects.filter(project => project.published === 'true' && project.semester_id === 1).length > 0 && 
                    projects.map(project => (
                        <div key={project.id} onClick={() => handleclick(project)} id="projectDisplay">
                           
                            <Project 
                                view='student'
                                number={project.number} 
                                name={project.title} 
                                description={project.description}
                            />
                             <PopUp project = {project}/>
                        </div>))}
                        <button id="close" onClick={close}>&times;</button>
                </div>
            </div>
        </main>    

    );

};

export default ProjectsAvailable;
