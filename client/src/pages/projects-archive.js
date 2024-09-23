
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