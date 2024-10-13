
import React, { useEffect, useState } from 'react';
import { createProject } from '../../Api.js'

// import { project } from "../../components/sortable_item.js";
// import { project } from "../../components/pop-up admin/project-pop-up-admin.js";
import { fetchUser, fetchProjectById, editProject } from "../../Api.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link, useParams} from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserID, getUserRole } from '../../utils/auth.js';

import './edit-project.css'

const EditProject = () => {
    const { projectID } = useParams();
    const [userRole, setUserRole] = useState(null);
    const [project, setProject] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showEquipmentReqWindow, setShowEquipmentReqWindow] = useState(false);

    // fetch project data 
    useEffect(() => {
        async function getProjectById(projectID) {
            try {
                console.log('fetching project with id',projectID);
                const data = await fetchProjectById(projectID);
                setProject(data);
                console.log('Fetched Project:'+ data);
            } catch (error) {
                console.error('Failed to load project:', error);
            }
        }
        getProjectById(projectID);
    }, [projectID]);


    useEffect(() => {
        const fetchUserRole = async () => {
            console.log("getting user role");
            const role = await getUserRole(); 
            console.log("user role:", role);
            setUserRole(role);
        };
    
        fetchUserRole(); 
    }, []);

    const handleEquipmentReqSelect = (event) => {
        const value = event.target.value;
        if (value === "1") {
            setShowEquipmentReqWindow(true);
        }
        else{
            setShowEquipmentReqWindow(false);
        }
    }

    // const handleSuccess = () => {
    //     setShowSuccessMessage(true)
    // };
    
    
    const submit = (e) =>{
        try {
            e.preventDefault(); 

            console.log('1');
            let other_client_details = document.getElementById("otherclientdetails").value;
            console.log('1');
            let title = document.getElementById("projecttitle").value;
            console.log('1');
            let description = document.getElementById("projectdescription").value;
            console.log('1');
            let project_deliverable = document.getElementById("desiredoutput").value;
            console.log('1');
            
            let special_requirements;
            if (document.getElementById("yes-no-equipment").value == "1") {
                special_requirements = (document.getElementById("specialequipment").value);
            }
            else {
                special_requirements = null;
            }

            console.log('1');
            let max_teams = document.getElementById("teams").value;
            console.log('1');
            let preferred_skills = document.getElementById("desiredskill").value;
            console.log('1');
            let available_resources = document.getElementById("availableresources").value;
            console.log('1');
            let expiry = document.getElementById("date").value;
            console.log('1');
            let owner_id = project.owner_id;
            console.log('1');
            let currentDate = new Date();
            console.log('1');
            let created = project.created;

            // Log all the collected values
            console.log("Other Client Details:", other_client_details);
            console.log("Project Title:", title);
            console.log("Project Description:", description);
            console.log("Project Deliverable:", project_deliverable);
            console.log("Special Equipment Requirement:", special_requirements);
            console.log("Max Teams:", max_teams);
            console.log("Preferred Skills:", preferred_skills);
            console.log("Available Resources:", available_resources);
            console.log("Expiry Date:", expiry);
            console.log("Created Date:", created);
            // id, title, description, special_requirements, available_resources, preferred_skills, project_deliverable, expiry, max_teams, other_client_details
            const response = editProject(project.id, title, description, special_requirements, available_resources, preferred_skills, project_deliverable, expiry, max_teams, other_client_details);
            
            setShowSuccessMessage(true);

        } catch (err) {
            console.log("Error", err);
            }
        }

    useEffect(() => {
        if (project && !showSuccessMessage) {
            async function populateForm() {
                console.log('populating project details for editing...');
                try {
                    project.title && (document.getElementById("projecttitle").value = project.title);
                    project.description && (document.getElementById("projectdescription").value = project.description);
                    project.deliverable && (document.getElementById("desiredoutput").value = project.deliverable);
                    project.max_teams && (document.getElementById("teams").value = project.max_teams);
                    project.preferred_skills && (document.getElementById("desiredskill").value = project.preferred_skills);
                    project.available_resources && (document.getElementById("availableresources").value = project.available_resources);
                    project.expiry && (document.getElementById("date").value = project.expiry.substring(0,10));

                    try {
                        if (project.special_requirements) {
                            document.getElementById("yes-no-equipment").value = "1";
                            setShowEquipmentReqWindow(true);
                            document.getElementById("specialequipment").value = project.special_requirements
                        } else {
                            document.getElementById("yes-no-equipment").value = "0";
                        }
                    } catch {
                        document.getElementById("yes-no-equipment").value = "0";
                    }

                console.log('finished populating');
                } catch(err) {
                    console.log('error populating project:',err);
                }
            }
            
            populateForm();
        }
    }, [project]);

    return(
            <main className="project-proposal-page">
                {project && <div className="content">
                    <div className='page-heading'>
                        <h1>Edit Project</h1>
                        <h2>{(userRole==='admin' && project.number) && `Project ${project.number}:`}{project.name}</h2>
                    </div>            
                {!showSuccessMessage && <form onSubmit={submit} className="page-content form-content form-fill" id="proposalForm">
                    <label>
                        <h2>1. Other Clients' Details</h2>
                        <p>If there is anyone else involved in the project, please provide their names and emails</p>
                        <textarea placeholder="Enter your answer" id="otherclientdetails"/>
                    </label>
                    <label>
                        <h2>2. Project Title* </h2>
                        <p>Please provide an informative project title.</p>
                        <input type="text" name="title" placeholder="Enter your answer" required id="projecttitle"/>
                    </label>
                    <label>
                        <h2>3. Project Description* </h2>
                        <p>Please provide a short description (3-10 sentences) of the project.</p>
                        <textarea placeholder="Enter your answer" required id="projectdescription"/>
                    </label>
                    <label>
                        <h2>4. Desired Output*</h2>
                        <p>Please identify the features that will constitute the MVP (minimum viable product).</p>
                        <textarea placeholder="Enter your answer" required id="desiredoutput"/>
                    </label>
                    <label>
                        <h2>5. Special Equipment Requirements*</h2>
                        <p>Will your project require special equipment that you are unable to provide? <br />
                            If yes, please specify the required equipment.<br />
                            Note: We can only accept a limited number of projects with special equipment needs.
                        </p>
                        <select id="yes-no-equipment"  defaultValue = 'Select' onChange = {handleEquipmentReqSelect}> 
                            <option value="1">Yes, the project will require special equipment</option>
                            <option value="0">No, the project will not require special equipment</option>
                        </select>
                        {showEquipmentReqWindow && <textarea placeholder="Please specify" required id = "specialequipment"/>}
                    </label>
                    <label>
                        <h2>6. Number of Teams*</h2>
                        <p>Would you be open to the idea of multiple teams working on your project? If yes, please specify the maximum number of teams you would be happy to work with. To make it easier for you, all team meetings will be combined into the same time slot, ensuring you won't need to allocate more meeting time than you would with one team.<br /><br />
                            For your consideration, 1-4 teams would require a 1-hour meeting fortnightly. Additionally, we will invite you to evaluate teams' final presentations, typically taking about 20 minutes per team.<br /><br />
                            Working with multiple teams offers the advantage of bringing diverse perspectives and ideas to the project. It also increases the likelihood of achieving a final result that aligns with expectations.</p>
                        <select defaultValue = 'Select' name="languages" id="teams" required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </label>
                    <label>
                        <h2>7. Desired Team Skills </h2>
                        <p>
                        Please specify any skills you would like team members to have. This could include expertise in a specific technology or tool that you want the team to use for implementing the project.
                        </p>
                        <textarea placeholder="Enter your answer" id="desiredskill"/>
                    </label>
                    <label>
                        <h2>8. Available Resources</h2>
                        <p>
                        Are there any resources you would like to provide for students to become more familiar with your project?
                        </p>
                        <textarea placeholder="Enter your answer" id="availableresources" />
                    </label>
                    <label>
                        <h2>9. Future Consideration</h2>
                        <p>Please specify when you would like the project to be withdrawn from consideration</p>
                        <input type="date" id="date"/> 
                    </label>             
                        <div className = 'proposal-submission-buttons' id="proposalButtons">
                        <button className = 'main-button'id="submit" form="proposalForm" type="submit">Save Changes</button>
                    </div>
                </form>}

                {showSuccessMessage && (<div className='page-content'>
                    <div className='success-message'>
                        <p>Project Updated Successfully! </p>
                        <div className='project-edit-redirect'>
                            {userRole === 'client' && <Link to='/projects/view'>
                                <span>View Your Projects</span>
                            </Link>}
                            {userRole === 'admin' && <Link to='/projects/available'>
                                <span>View Published Projects</span>
                            </Link>}
                            {userRole === 'admin' && <Link to='/projects/manage'>
                                <span>Manage All Projects</span>
                            </Link>}
                        </div>
                    </div>
                </div>
                )}
            </div>}
        </main>
    )
}


export default EditProject;
