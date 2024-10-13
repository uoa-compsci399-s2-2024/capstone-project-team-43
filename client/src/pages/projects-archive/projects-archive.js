
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
    const [expandedProjects, setExpandedProjects] = useState({});


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

    const expandProject = (projectId) => {
        setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] })); 
    }

    // projects for the given semester
    const archivedProjects = projects.filter(project => project.semester_id === semesterID);

    return(
        <main className="projects-archive">
            {semester && <div className='content'>
                <div className='page-heading'>
                    <div className='semester-heading'>
                        {semester && <h1>Project Archive</h1>}
                        {/* update semesterID when dropdown button is selected */}
                        <SemesterDropdown onSelectSemester={handleSemesterSelect} hideSemesters={['current','upcoming']} />
                    </div>
                    <h2 className='page-subheading'>{semester.name}</h2>
                </div>
                <div className = 'page-content display-projects'>
                    {/* display projects from semester */}
                    <div id="archivedProjects">
                        {archivedProjects.length > 0 ? (
                            archivedProjects.map(project => (
                                <div key={project.id} onClick={() => expandProject(project.id)}>
                                    <Project className = 'project'
                                        view='admin'
                                        projectId={project.id}
                                        expanded={expandedProjects[project.id]}
                                        expandProject = {expandProject}
                                    />
                                </div>
                            ))
                        ) : (<div className='text-page'>
                            <p>No projects have been archived for this semester.</p>
                            </div>
                        )}
                    </div>  
                </div>
            </div>}
        </main>  
    );
}

export default ProjectsArchive;