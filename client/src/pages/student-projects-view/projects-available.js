
import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../../Api.js'
import Project from "../../components/project/project.js";
import PopUp from "../../components/project-pop-up-student.js";

import './projects-available.css'

const ProjectsAvailable = () => {
    const [projects, setProjects] = useState([]);
    const [expandedProjects, setExpandedProjects] = useState({});

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

    const expandProject = (projectId) => {
        setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] })); 
    }



    //   const handleclick = (project) =>{
    //     document.getElementById('popup').style.display = "block";
    //     document.getElementById('close').style.display = "block";       
    //   };



    //   const close =() =>{
    //     document.getElementById('popup').style.display = "none";
    //     document.getElementById('close').style.display = "none";
    // }

      
    return(
        <main className="students-projects-view-page">
            <div className='content'>
                <div className='page-heading'>
                    <h1>Available Projects</h1>
                </div>
                <div className='page-content'>
                <div className='projects-container'>
                    {projects.filter(project => project.published === 'true').length === 0 && 
                        <p>
                            There are currently no available projects.
                        </p>
                    }
                    {projects.filter(project => project.published === 'true').length > 0 && 
                    projects.map(project => (
                        // expand project when user clicks
                        <div key={project.id} onClick={() => expandProject(project.id)}>
                
                            <Project className = 'project'
                                view='student'
                                projectId={project.id}
                                expanded={expandedProjects[project.id]}
                                expandProject = {expandProject}
                            />
                             {/* {false &&<PopUp project = {project}/>} */}
                        </div>))}
                        {/* <button id="close" onClick={close}>&times;</button> */}
                </div>
                </div>
            </div>
        </main>    

    );

};

export default ProjectsAvailable;
