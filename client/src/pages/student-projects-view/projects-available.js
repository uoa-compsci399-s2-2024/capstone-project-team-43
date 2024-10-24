
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
                const published = data.filter(project => project.published === 'true');
                setProjects(published)
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjects();
    }, []);

    const expandProject = (projectId) => {
        setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] })); 
    }

    const expandAll = () => {
        const allExpanded = {};
        projects.forEach(project => {
            allExpanded[project.id] = true; 
        });
        setExpandedProjects(allExpanded);
    }

    const collapseAll = () => {
        const allCollapsed = {};
        projects.forEach(project => {
            allCollapsed[project.id] = false; 
        });
        setExpandedProjects(allCollapsed);
    }
  
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
                    <div className='expand-collapse-button'>
                        <button className='expand' onClick={expandAll}>
                            Expand All
                        </button>
                        <button className='expand' onClick={collapseAll}>
                            Collapse All
                        </button>
                    </div>
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
