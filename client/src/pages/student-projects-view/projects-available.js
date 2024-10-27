
import React, { useEffect, useState } from 'react';
import { fetchProjects, fetchSemesters } from '../../Api.js'
import Project from "../../components/project/project.js";
import PopUp from "../../components/project-pop-up-student.js";
import { ReactComponent as CapitaliseLogo } from '../../media/visit-capitalise.svg';


import './projects-available.css'

const ProjectsAvailable = () => {
    const [projects, setProjects] = useState([]);
    const [expandedProjects, setExpandedProjects] = useState({});
    const [allCollapsed, setAllCollapsed] = useState(null);
    const [allExpanded, setAllExpanded] = useState(null);
    const [semesterID, setSemesterID] = useState(null);


      // retrieves semesters and sets current semester id
    useEffect(() => {
      console.log('getting semester data');
  
      const getSemester = async () => {
          try {
              const semesters = await fetchSemesters();
              console.log('Fetched all semesters:', semesters);

              // Try to find the current semester
              const currentSemester = semesters.find(semester => semester.status === 'current');
              setSemesterID(currentSemester.id);
          } catch (error) {
              console.error('Failed to fetch semester:', error);
          }
      };
      getSemester();
    }, []);

    // Get all projects in database
    useEffect(() => {
        async function getProjects() {
            try {
                const data = await fetchProjects();
                console.log('data:',data);
                const published = data.filter(project => project.published === 'true');
                setProjects(published)

                const initialExpandedProjects = {};
                published.forEach(project => {
                    initialExpandedProjects[project.id] = false;
                });
                setExpandedProjects(initialExpandedProjects);
                setAllCollapsed(true);
                setAllExpanded(false);
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

    useEffect(() => {
        setAllExpanded(Object.values(expandedProjects).every(value => value === true));
        setAllCollapsed(Object.values(expandedProjects).every(value => value === false));
    }, [expandedProjects]);
  
    return(
        <main className="students-projects-view-page">
            <div className='content'>
                <div className='page-heading'>
                    <h1>Available Projects</h1>
                </div>
                    {projects.filter(project => (project.status === 'accepted' && project.semester_id===semesterID)).length === 0 && 
                    <div className='page-content text-page'> 
                        <p>
                            Available projects have not been published yet.
                        </p>
                        
                    </div>
                    }
                    {projects.filter(project => (project.status === 'accepted' && project.semester_id===2)).length > 0 && 
                    <div className='page-content'> 

                    <div className='projects-buttons-wrapper'>
                        <div className='expand-collapse-button'>
                            {!allExpanded && <button className='expand' onClick={expandAll}>
                                Expand All
                            </button>}
                            {!allCollapsed && <button className='expand' onClick={collapseAll}>
                                Collapse All
                            </button>}
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
                    </div>
                    </div>}
                    <div className='capitalise-container'>
                        <p>Want to view previous Capstone projects?</p>
                        <button className='capitalise-button'
                            onClick={() => window.open('https://www.capitalise.space/', '')}>
                                <CapitaliseLogo className='capitalise-logo'/>
                                {/* <img src = {require('./../../media/capitalise.svg')}></img> */}
                        </button>
                    </div>
                        {/* <button id="close" onClick={close}>&times;</button> */}
                </div>
        </main>    

    );

};

export default ProjectsAvailable;
