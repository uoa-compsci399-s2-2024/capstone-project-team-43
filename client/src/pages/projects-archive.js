
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../admin.css';
import '../App.css';
import '../index.js'
import { fetchProjectsBySemester, fetchSemester } from '../Api.js'
import Project from "../components/project.js";
import SemesterDropdown from "../components/semester-dropdown.js";

const ProjectsArchive = () => {
    const { semesterID } = useParams();

    const [semester, setSemester] = useState(null);
    const [projects, setProjects] = useState([]);


    // Get semester data from server
    useEffect(() => {
        async function getSemester() {
            try {
                const data = await fetchSemester(semesterID);
                setSemester(data);
                console.log('Fetched semester data:', data);  
            } catch (error) {
                console.error('Failed to load semester:', error);
            }
        }
        getSemester();
    }, [semesterID]);


    // get data on all projects 
    useEffect(() => {
        async function getProjectsBySemester() {
            try {
                const data = await fetchProjectsBySemester(semesterID);
                setProjects(data);
                console.log('projects:'+data);
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjectsBySemester();
    }, [semesterID]);


    return(
        <div className="projects-archive">
            <div className='page-header'>
                <h2>Project Archive</h2>
                <div className='semester-heading'>
                    {semester && <h1>{semester.name}</h1>}
                    <SemesterDropdown pathway={'archive'}></SemesterDropdown>
                </div>
            </div> 
            <div className = 'page-content display-projects'>
                <div id="archivedProjects">
                    {projects.length > 0 ? projects.map(project => (
                        <Project id={project.id} name={project.title} description={project.description} />
                    )):<p>There are no projects for this semester.</p>}
                </div>  
            </div>
        </div>  
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