
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects, fetchProjectsByUser, fetchPublishedProjects } from '../../Api.js'
import Project from "../../components/project/project.js";
import PopUp from "../../components/pop-up admin/project-pop-up-admin.js";
import { getUserID, getUserRole } from '../../utils/auth.js';
import './client-projects.css'

const ClientProjectsView = () => {
    const [projects, setProjects] = useState([]);
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        console.log("getting user id");
        const id = getUserID();
        console.log("user id:"+id);
        setUserID(id);

    }, []);

    // Fetch client's own projects        
    useEffect(() => {
        if (userID) {
            async function getProjectsByUser(userID) {
                try {
                    const data = await fetchProjectsByUser(userID);
                    setProjects(data);
                } catch (error) {
                    console.error('Failed to load projects:', error);
                }  
            getProjectsByUser(userID);
            }
        }
    }, [userID]); 


            // } else {
        //     // Admin & student view: Fetch all projects
        //     async function getPublishedProjects() {
        //         try {
        //             const data = await fetchPublishedProjects();
        //             setProjects(data);
        //         } catch (error) {
        //             console.error('Failed to load published projects:', error);
        //         }
        //     }
        //     getPublishedProjects();
        // }

    const handleclick = () =>{
        document.getElementById('popup').style.display = "block";
        document.getElementById('close').style.display = "block";
        //document.getElementById('edit').style.display = "block";
      };
      const close =() =>{
        document.getElementById('popup').style.display = "none";
        document.getElementById('close').style.display = "none";
    }
      const submit =() =>{
        document.getElementById('confirm').style.display = "none";
        document.getElementById('close').style.display = "none";
        document.getElementById('edit').style.display = "none";
    }

    // const userProjects = projects.filter(project => project.owner_id === userID);

    // console.log("USER PROJECTS: ", userProjects);


    return(
        <main className="client-projects-view-page">
            {projects && <div className='content'>
                <div className='page-heading'>
                    <h1>Your Projects</h1>
                </div>
                <div className='page-content'>
                <div className='projects-container'>
                    {projects.length === 0 && (
                        <p>You haven't submitted any project proposals yet.</p>
                    )}
                    {projects.length > 0 && projects.map(project => (
                            <div key={project.id} onClick={() => handleclick()}>
                                <Project 
                                    view = 'client'
                                    projectId={project.id}
                                />  
                                {/* <div id="confirm"> */}
                            <PopUp project= {project} />
                           
                            </div>
                            
                    ))}
                     <button id="close" onClick={close}>&times;</button>                   
                            
                </div>
                <div className='redirect-to-proposal'>
                    <Link to='/projects/submit'>
                        <span>Go to Project Proposal Form</span>
                    </Link>
                </div>
                </div>
            </div> }
        </main>  
    );
}

export default ClientProjectsView;