
import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../../Api.js'
import Project from "../../components/project/project.js";
import PopUp from "../../components/project-pop-up-student.js";
import { ReactComponent as CapitaliseLogo } from '../../media/capitalise.svg';


import './projects-available.css'

const ProjectsAvailable = () => {
    const [projects, setProjects] = useState([]);
    const [expandedProjects, setExpandedProjects] = useState({});

    // Get all projects in database
    useEffect(() => {
        async function getProjects() {
            try {
                const data = await fetchProjects();
                console.log('data:',data);
                const currentData = data.filter(project => project.semester_id === 2);
                console.log('current data:',currentData);

                const availableData = currentData.filter(project => project.status === 'accepted');
                console.log('available data:', availableData);

                setProjects(availableData);
                console.log('projects:'+data);
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjects();
    }, []);

    const expandProject = (projectId) => {
        setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] })); 
    }

    // const projects = projects


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
                

                    {projects.filter(project => (project.status === 'accepted' && project.semester_id===2)).length === 0 && 
                    <div className='page-content text-page'> 
                        <p>
                            Available projects have not been published yet.
                        </p>
                        
                    </div>
                    }
                    {projects.filter(project => (project.status === 'accepted' && project.semester_id===2)).length > 0 && 
                    <div className='page-content'> 
                    <div className='projects-container'>
                    {projects.map(project => (
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
                    </div>
                    </div>}
                    <div className='capitalise-container'>
                        <p>Want to view previous Capstone projects?</p>
                        <button className='capitalise-button'
                            onClick={() => window.open('https://www.capitalise.space/', '')}>
                                Visit <CapitaliseLogo className='capitalise-logo'/>
                                {/* <img src = {require('./../../media/capitalise.svg')}></img> */}
                        </button>
                    </div>
                        {/* <button id="close" onClick={close}>&times;</button> */}
                </div>
        </main>    

    );

};

export default ProjectsAvailable;
