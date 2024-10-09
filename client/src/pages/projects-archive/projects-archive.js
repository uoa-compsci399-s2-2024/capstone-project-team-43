
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjects, fetchSemester, fetchSemesters } from '../../Api.js';
import Project from "../../components/project/project.js";
import SemesterDropdown from "../../components/semester-dropdown/semester-dropdown.js";
import './projects-archive.css';

const ProjectsArchive = () => {
    const { semesterID: semesterIDFromURL } = useParams();
    const navigate = useNavigate(); 
    const [semesterID, setSemesterID] = useState(semesterIDFromURL || null);

    const [semester, setSemester] = useState(null);
    const [projects, setProjects] = useState([]);

    // Get the semester from server 
    useEffect(() => {
        async function getSemester() {
            // only fetch if semesterID is set
            if (!semesterID) return; 
            try {
                const data = await fetchSemester(semesterID);
                setSemester(data);
                console.log('Fetched semester data:', data);  
                // check semester is retired
                if (data.status !== 'retired') {
                    throw new Error('Semester is not retired.');
                }            
            } catch (error) {
                console.error('Failed to load semester:', error);
                return; 
            }
        }
        getSemester();
    }, [semesterID]);


    // Get all projects in database
    useEffect(() => {
        async function getProjects() {
            try {
                const data = await fetchProjects();
                setProjects(data);
                console.log('projects:'+data);
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjects();
    }, []);

    // handles semester selection in dropdown menu
    const handleSemesterSelect = (selectedSemesterID) => {
        // set new semester to manage
        setSemesterID(selectedSemesterID);
        // update URL without reloading page
        navigate(`/projects/archive/${selectedSemesterID}`, { replace: true }); 
    };

    // projects for the given semester
    const archivedProjects = projects.filter(project => project.semester_id === semesterID);

    return(
        <main className="projects-archive">
            {semester && <div className='content'>
                <div className='page-header'>
                    <div className='semester-heading'>
                        {semester && <h1>{semester.name}</h1>}
                        {/* update semesterID when dropdown button is selected */}
                        <SemesterDropdown onSelectSemester={handleSemesterSelect} hideSemesters={['current','upcoming']} />
                    </div>
                    <h2>Project Archive</h2>

                </div> 
                <div className = 'content display-projects'>
                    {/* display projects from semester */}
                    <div id="archivedProjects">
                        {archivedProjects.length > 0 ? (
                            archivedProjects.map(project => (
                                <Project 
                                    view = 'admin'
                                    number={project.number} 
                                    name={project.title} 
                                    description={project.description} 
                                />
                            ))
                        ) : (
                            <p>No projects have been archived for this semester.</p>
                        )}
                    </div>  
                </div>
            </div>}
        </main>  
    );
}

export default ProjectsArchive;
// import React, { useEffect, useState } from 'react';
// import '../App.css';
// import { fetchProjects, fetchSemesters } from '../Api.js'
// import Project from "../components/project";
// import Header from "../components/admin-semester-header.js";
// import { useLocation } from 'react-router-dom'
// import PopUp from "../components/project-pop-up-admin.js";
// import { useNavigate } from "react-router-dom";
// export let archiveprojectinfo = null;
// const ProjectsArchive = () => {
//     const Navigate = useNavigate();
//     const location = useLocation()
//   const { from } = location.state

//   console.log(from);
  
//     const [semesters, setSemesters] = useState([]);

//     // get data onall semesters
//     useEffect(() => {
//         async function getSemesters() {
//             try {
//                 const data = await fetchSemesters();
//                 setSemesters(data);
//             } catch (error) {
//                 console.error('Failed to load semesters:', error);
//             }
//         }
//         getSemesters();
//     }, []);
// //   const handleclick = () =>{
// //     projectinfo = (id[0]);
// //     Navigate('/pages/project-proposal');
// //   };
//     const handleclick = (proj) =>{
//         archiveprojectinfo = proj;
//         Navigate('/pages/project-proposal');
//         // document.getElementById('confirm').style.display = "block";
//         // document.getElementById('close').style.display = "block";
//         // document.getElementById('edit').style.display = "block";
//       };
//       const submit =() =>{
//         document.getElementById('confirm').style.display = "none";
//         document.getElementById('close').style.display = "none";
//         document.getElementById('edit').style.display = "none";
//     }


//     const [projects, setProjects] = useState([]);

//     // get data onall accepted projects 
//     useEffect(() => {
//         async function getProjects() {
//             try {
//                 const data = await fetchProjects();
//                 setProjects(data);
//             } catch (error) {
//                 console.error('Failed to load projects:', error);
//             }
//         }
//         getProjects();
//     }, []);
//     let current = semesters.filter(semester => semester.status == 'current')
//     let sem_id = from;
//     return(
        
//         <div className="archive">
//             <Header current = {semesters[0]}  semesters = {semesters} page={from}/>
//             <div id="archivedProjects">
            
//                 {projects.filter(project => project.semester_id === sem_id).map(project => (
                    

//                     (<div onClick={() => handleclick(project)}>
//                  <Project id={project.id} name={project.title} description={project.description} status={project.status}/>
//                     <div id="confirm">

//             <PopUp id={project.id} 
//             name={project.title} 
//             description={project.description}
//             // owner id
//             requirements = {project.special_requirements}
//             resources = {project.resources}
//             skills = {project.preferred_skills}
//             deliverable = {project.project_deliverable}
//             created = {project.created}
//             expiry= {project.expiry}
//             teams = {project.max_teams}
//             number = {project.project_number}
//             />
//         </div>
// {/* <button id="close" onClick={submit}>&times;</button> */}
//                     </div>)
                    
//                 ))}
//         <button id="close" onClick={submit}>&times;</button>
//                  {/* <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
//                  <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
//                  <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
//                  <Project id={3} name={"another project"} description={"Another project descrition with some words describing it written here"} />
//              */}
//             </div>  
//         </div>  
//     );
// }

// export default ProjectsArchive;