
import React, { useEffect, useState } from 'react';
import { createProject } from '../../Api.js'

import { projectinfo } from "../../components/sortable_item.js";
import { fetchUser } from "../../Api.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';

import './project-proposal.css'

const ProjectProposal = () => {
    const [showAttendanceConfirmation, setShowAttendanceConfirmation] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showEquipmentReqWindow, setShowEquipmentReqWindow] = useState(false);


    const [meetingAttendance, setMeetingAttendance] = useState(false);
    const [presentationAttendance, setPresentationAttendance] = useState(false);
    const openAttendanceConfirmation = () => setShowAttendanceConfirmation(true);
    const closeAttendanceConfirmation = () => setShowAttendanceConfirmation(false);

    const handleEquipmentReqSelect = (event) => {
        const value = event.target.value;
        if (value === "1") {
            setShowEquipmentReqWindow(true);
        }
        else{
            setShowEquipmentReqWindow(false);
        }
    }

    const navigate = useNavigate();

    const handleContinueToForm = (field) => {
        if (document.getElementById("check1").checked 
            && document.getElementById("check2").checked) {
            setShowForm(true);
        }
        else {
            setShowAttendanceConfirmation(true);
        }
    };

    const handleGoBack = () => {
        setShowForm(false)
    };

    const handleSuccess = () => {
        setShowSuccessMessage(true)
    };

    const getClientID = () => {
        try {
            const token = localStorage.getItem("authToken");
            if (token === "" || token === null || token === "null") {
                return -1;
            } else {
                const decoded = jwtDecode(token);
                const id = decoded.userId;
    
                if (id === null) {
                    return -1;
                }
                return id;
            }
    
        } catch (err) {
            console.log(err);
        }
    }

    const submit = () =>{
        try {

        let other_client_details = document.getElementById("otherclientdetails").value;
        let title = document.getElementById("projecttitle").value;
        let description = document.getElementById("projectdescription").value;
        let project_deliverable = document.getElementById("desiredoutput").value;
        let special_equipment_requirment = document.getElementById("specialequipment").value;
        let max_teams = document.getElementById("teams").value;
        let preferred_skills = document.getElementById("desiredskill").value;
        let available_resources = document.getElementById("availableresources").value;
        let available_from = document.getElementById("start_date").value;
        let expiry = document.getElementById("date").value;
        let owner_id = getClientID();
        let currentDate = new Date();
        let created = currentDate.toISOString().split('T')[0];

        //Structure:  title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number, semester_id, other_client details
        createProject(title, description, owner_id, special_equipment_requirment, available_resources, preferred_skills, project_deliverable, created, available_from, expiry, "pending", max_teams, -1, 1, other_client_details);
        handleSuccess();

    } catch (err) {
        console.log("Error", err);
        }
    }

    return(
            <main className="project-proposal-page">
                <div className="content">
                    <h1>Project Proposal Form</h1>
                    {(!showForm && !showSuccessMessage)&& <div className="content-section form-content form-intro">
                        <p>Please complete this form if you wish to propose a 
                            project for the COMPSCI 399 Capstone Course.
                        </p>
                        <h2>Submission Deadline</h2>
                        <p>Please note that while we accept applications throughout the year, 
                            if the proposal submission deadline isn't met we will only consider 
                            the project for future semesters.
                        </p>

                        <h2>Project Requirements</h2>    
                        <p>The proposed project should be a research or software development project,
                            suitable in size to be completed within the 12-week 
                            duration of the semester. 
                            It should present a challenge for a team 
                            consisting of 5-6 students. For example, if you are 
                            involved in an ongoing research/development project and seek assistance
                            in developing a specific module, you can propose it as a potential project. 
                            Alternatively, if you are in a service role and require support in creating a system to 
                            facilitate or automate certain aspects of your work, you can suggest a project for consideration.
                            Each team is expected to allocate approximately 7-8 hours per person per week to project development. 
                            The team will produce a prototype system every fortnight, progressively enhancing its functionality.
                        </p>

                        <h2>Supervision Requirements</h2>
                        <p>Team(s) will meet with you (or your nominated representative) at least 
                            once every fortnight to ensure that the project is going in the right direction.
                            There will be a final project presentation session (probably in the last week of the semester) 
                            that we would expect you (or your nominated representative) to attend and provide us with feedback
                            on your team's performance.
                        </p>

                        <h2>Contacts & Information</h2>
                        <p>You can find examples of projects created by capstone students following 
                            this link: https://www.capitalise.space/
                            The course overview can be found here: https://courseoutline.auckland.ac.nz/dco/course/COMPSCI/399/1243
                            If you have any questions, please feel free to contact Anna Trofimova (anna.trofimova@auckland.ac.nz)
                            or Asma Shakil (asma.shakil@auckland.ac.nz).
                        </p>

                        <h2>Meeting Attendance</h2>
                        <p> The teaching team will aim to arrange meetings with the students 
                            at times that best suit your schedule. 
                            You can attend the meetings either in person or via Zoom (or Teams). 
                            The details and schedule of the meetings will be arranged at the beginning 
                            of the semester and will cover the entire duration of the course.
                        </p>
                        <div className='attendance-confirmation-check'>
                            <label>
                                <input className = 'checkbox' type="checkbox" id="check1" value="check" name = "check2" required/>
                                I confirm that I will be able to attend 6 meetings with students, 
                                scheduled 2-3 weeks apart.
                            </label>
                        </div>

                        <h2>Final Presentation Attendance</h2>
                        <p>The teaching team will aim to arrange the final presentation 
                            at a time that best suits your schedule. 
                            The final presentation will be held on the UoA Main Campus 
                            and must be attended in person.
                        </p>
                        <div className='attendance-confirmation-check'>
                                <label for="check1" >
                                    <input className = 'checkbox' type="checkbox" id="check2" value="check" name = "check1" required/>
                                    I confirm that I will be able to attend final presentation in-person.
                                </label>
                        </div>
                        {showAttendanceConfirmation && <div className='pop-up attendance-confirmation' id="pop">
                            <p className="pop-up-text">
                                Please confirm meeting attendance and final presentation attendance before continuing to the project proposal form.
                            </p>
                            <div className="pop-up-header">
                                <button className = 'quit-button' onClick={closeAttendanceConfirmation}></button>
                            </div>
                        </div>}
                    <button onClick={handleContinueToForm} className='main-button'>Continue to Project Proposal Form</button>
                    </div>}
            </div>
            
            {showForm && <form className="content-section form-content form-fill" id="proposalForm">
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
                        <select id="yes-no-equipment" onChange = {handleEquipmentReqSelect}> 
                            <option value="" disabled selected>Select</option>
                            <option value="1">Yes, the project will require special equipment</option>
                            <option value="0">No, the project will not require special equipment</option>
                        </select>
                        {showEquipmentReqWindow && <textarea placeholder="Please specify" id = "specialequipment"/>}
                    </label>
                    <label>
                        <h2>6. Number of Teams*</h2>
                        <p>Would you be open to the idea of multiple teams working on your project? If yes, please specify the maximum number of teams you would be happy to work with. To make it easier for you, all team meetings will be combined into the same time slot, ensuring you won't need to allocate more meeting time than you would with one team.<br /><br />
                            For your consideration, 1-4 teams would require a 1-hour meeting fortnightly. Additionally, we will invite you to evaluate teams' final presentations, typically taking about 20 minutes per team.<br /><br />
                            Working with multiple teams offers the advantage of bringing diverse perspectives and ideas to the project. It also increases the likelihood of achieving a final result that aligns with expectations.</p>
                        <select name="languages" id="teams" required>
                            <option value="" disabled selected>Select</option>
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
                        <h2>9. Project Offering Timeframe*</h2>
                        <p>Please specify the timeframe in which you would like the project to be offered</p>
                        <p>Start date</p>
                        <input type="date" id="start_date"/> 
                        <p>End date</p>
                        <input type="date" id="date"/> 
                    </label>             
                        <div className = 'proposal-submission-buttons' id="proposalButtons">
                        <button className = 'main-button' onClick={handleGoBack} id="back">Go Back</button>
                        <button className = 'main-button'id="submit" form="proposalForm" type="submit" onClick={submit}>Submit</button>
                    </div>
                </form>} 
                {showSuccessMessage && (<div className='success-message'>
                        <h1>Thank you for submitting your project!</h1>
                        <h2>You will be contacted by the course coordinators if your project is assigned to a student team</h2>
                        <div className='redirect-to-proposal'>
                            <Link to='/projects/view'>
                                <span>View Your Projects</span>
                            </Link>
                        </div>
                    </div>
                )}
        </main>
    )
}


export default ProjectProposal;


// import '../App.css';
// import { createProject, editProject } from '../Api.js';
// import { projectinfo } from "../components/sortable_item.js";
// import { fetchUser } from "../Api.js";
// import { jwtDecode } from "jwt-decode";
// import React from "react";
// import Cookies from 'js-cookie';
// // import { archiveprojectinfo } from "./projects-archive.js";



// const projectProposal = () => {

//     let project_id = -1;

//     const getClientID = () => {
//         try {
//             const token = Cookies.get("authToken");
//             if (token === "" || token === null || token === "null") {
//                 return -1;
//             } else {
//                 const decoded = jwtDecode(token);
//                 const id = decoded.userId;
    
//                 if (id === null) {
//                     return -1;
//                 }
//                 return id;
//             }
    
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     const submit = () =>{
//         try {

//         let other_client_details = document.getElementById("otherclientdetails").value;
//         let title = document.getElementById("projecttitle").value;
//         let description = document.getElementById("projectdescription").value;
//         let project_deliverable = document.getElementById("desiredoutput").value;
//         let special_equipment_requirment = document.getElementById("specialequipment").value;
//         let max_teams = document.getElementById("teams").value;
//         let preferred_skills = document.getElementById("desiredskill").value;
//         let available_resources = document.getElementById("availableresources").value;
//         let expiry = document.getElementById("date").value;
//         let owner_id = getClientID();
//         let currentDate = new Date();
//         let created = currentDate.toISOString().split('T')[0];

//         if (owner_id !== -1) {
//             if (project_id === -1) {
//             console.log("CREATING NEW PROJECT");

//         //Structure:  title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number, semester_id, other_client details
//         createProject(title, description, owner_id, special_equipment_requirment, available_resources, preferred_skills, project_deliverable, created, expiry, "pending", max_teams, -1, 1, other_client_details);
//             } else {
//                 console.log("UPDATING EXISTING PROJECT WITH ID: ", project_id);
//                 editProject(project_id, title, description, special_equipment_requirment, available_resources, preferred_skills, project_deliverable, expiry, max_teams, other_client_details);
//             }
//         }
//     } catch (err) {
//         console.log("Error", err);
//         }
//     }

//     const next = () =>{

//         if(projectinfo !== null){
//             // Must keep this comment here to fetch projectinfo data
//             console.log(fetchUser(projectinfo.project.owner_id));
//             //document.getElementById("clientname").value = projectinfo.project.owner_id;
//             //document.getElementById("clientemail").value = projectinfo.project.owner_id;
//             document.getElementById("otherclientdetails").value = projectinfo.project.other_client_details;
//             document.getElementById("projecttitle").value = projectinfo.project.title;
//             document.getElementById("projectdescription").value = projectinfo.project.description;
//             document.getElementById("desiredoutput").value = projectinfo.project.deliverable;
//             document.getElementById("specialequipment").value = projectinfo.project.special_requirements;
//             document.getElementById("desiredskill").value = projectinfo.project.preferred_skills;
//             document.getElementById("teams").value = projectinfo.project.max_teams;
//             document.getElementById("availableresources").value = projectinfo.project.available_resources;
//             project_id = projectinfo.project.id;
//             try {
//             if (projectinfo.project.special_requirements.length > 0) {
//                 document.getElementById("yes").checked = true;
//             } else {
//                 document.getElementById("no").checked = true;
//             }
//         } catch {
//             document.getElementById("no").checked = true;
//         }

//             const date = projectinfo.project.expiry.split("T");
//             document.getElementById("date").value = date[0];   
//             // console.log(document.getElementById("clientname"));
//             // document.getElementById("clientname").value = projectinfo.owner_id;
//         }
//         // else if (archiveprojectinfo !== null){
//         //     document.getElementById("clientname").value = archiveprojectinfo.owner_id;
//         //     document.getElementById("clientemail").value = archiveprojectinfo.owner_id;
//         //     document.getElementById("projecttitle").value = archiveprojectinfo.title;
//         //     document.getElementById("projectdescription").value = archiveprojectinfo.description;
//         //     document.getElementById("desiredoutput").value = archiveprojectinfo.deliverable;
//         //     document.getElementById("specialequipment").value = archiveprojectinfo.special_requirements;
//         //     document.getElementById("desiredskill").value = archiveprojectinfo.preferred_skills;
//         //     document.getElementById("date").value = archiveprojectinfo.expiry;
//         // }

//        if(document.getElementById("check1").checked === false || document.getElementById("check2").checked === false){
//             // alert("Please read the information and confirm availability before proceeding.");
//             document.getElementById('pop').style.display = "block";
//        }else{
//             document.getElementById('next').style.display = "none";
//             document.getElementById('back').style.display = "block";
//             document.getElementById('proposalContent').style.display = "block";
//             document.getElementById('proposalInformation').style.display = "none";
//             document.getElementById("proposalHeader").scrollIntoView({ behavior: "smooth" });

//        }
//     }

//     const back = () =>{
//         document.getElementById('next').style.display = "inline";
//         document.getElementById('back').style.display = "none";
//         document.getElementById('proposalContent').style.display = "none";
//         document.getElementById('proposalInformation').style.display = "block";
//     }

//     const close = () => {
//         document.getElementById('pop').style.display = "none";
//     }



  
//     return(
//             <div className="projectProposal">
                
//             <div id="pop">
//                 Please confirm meeting attendance and final presentation attendance. <br /><br /><br />
//                 <button id="popBack" onClick={close}>Back</button>
//             </div>
//                 <h1 id="proposalHeader"> Computer Science Capstone Project Proposal Form</h1>
//                 <div id="proposalInformation">
//                 <h3>Deadline</h3>

//                 Please complete this form if you wish to propose a project for the COMPSCI 399 Capstone Course in S2 2024. The deadline for form submission is June 30, 2024, by 11:59 pm.

//                 <br />Note: We accept applications throughout the year, but if the deadline isn't met, we will consider the project only for the following semester.

//                 <h3>Project Requirements</h3>
//                 <br />The proposed project should be a research or software development project, suitable in size to be completed within the 12-week duration of the semester. It should present a challenge for a team consisting of 5-6 students. For example, if you are involved in an ongoing research/development project and seek assistance in developing a specific module, you can propose it as a potential project. Alternatively, if you are in a service role and require support in creating a system to facilitate or automate certain aspects of your work, you can suggest a project for consideration.

//                 <br />Each team is expected to allocate approximately 7-8 hours per person per week to project development. The team will produce a prototype system every fortnight, progressively enhancing its functionality.

//                 <h3>Supervision Requirements</h3>
//                 <br />Team(s) will meet with you (or your nominated representative) at least once every fortnight to ensure that the project is going in the right direction.
//                 <br />There will be a final project presentation session (probably in the last week of the semester) that we would expect you (or your nominated representative) to attend and provide us with feedback on your team's performance.

//                 <h3>Contacts & Information</h3>
//                 <br />You can find examples of projects created by capstone students following this link: https://www.capitalise.space/
//                 <br />The course overview can be found here: https://courseoutline.auckland.ac.nz/dco/course/COMPSCI/399/1243 
//                 <br /> If you have any questions, please feel free to contact Anna Trofimova (anna.trofimova@auckland.ac.nz) or Asma Shakil (asma.shakil@auckland.ac.nz)
                

//                 <h3>Meeting attendance:</h3>
//                 <p>
//                 The teaching team will aim to arrange meetings with the students at times that best suit your schedule. You can attend the meetings either in person or via Zoom (or Teams). The details and schedule of the meetings will be arranged at the beginning of the semester and will cover the entire duration of the course.
//                 </p>
//                 <input type="checkbox" id="check1" value="check"  required/>
//                 I confirm that I will be able to attend 6 meetings with students, scheduled 2-3 weeks apart.<br />

           
//                 <h3>Final presentation attendance:</h3>
//                 <p>The teaching team will aim to arrange the final presentation at a time that best suits your schedule. The final presentation will be held on the UoA Main Campus and must be attended in person.</p>
//                 <input type="checkbox" id="check2" value="check" required/>
//                 I confirm that I will be able to attend final presentation in-person.<br />
//                 </div>

            
//             <form className="proposalForm" id="proposalForm">
//                 <div id="proposalContent">
//                 <label>
//                     <h3>1. Other clients' details</h3>
//                     <p>If there is anyone else involved in the project, please provide their names and emails</p>
//                     <textarea placeholder="Enter your answer" id="otherclientdetails"/>
//                 </label>
//                 <label>
//                     <h3>2. Project title* </h3>
//                     <p>Please provide an informative project title.</p>
//                     <input type="text" name="title" placeholder="Enter your answer" required id="projecttitle"/>
//                 </label>
//                 <label>
//                     <h3>3. Project description* </h3>
//                     <p>Please provide a short description (3-10 sentences) of the project.</p>
//                     <textarea placeholder="Enter your answer" required id="projectdescription"/>
//                 </label>
//                 <label>
//                     <h3>4. Desired output*</h3>
//                     <p>Please identify the features that will constitute the MVP (minimum viable product).</p>
//                     <textarea placeholder="Enter your answer" required id="desiredoutput"/>
//                 </label>
//                 <label>
//                     <h3>5. Special equipment requirements*</h3>
//                     <p>Will your project require special equipment that you are unable to provide? <br />
//                         If yes, please specify the required equipment.<br />
//                         Note: We can only accept a limited number of projects with special equipment needs.
//                     </p>
//                     <input type="radio" id="no" name="fav_language" value="HTML" /> No<br />
//                     <input type="radio" id="yes" name="fav_language" value="HTML" /> Yes<br />
//                     <textarea placeholder="Please specify" id = "specialequipment"/>
//                 </label>
//                 <label>
//                     <h3>6. Number of teams*</h3>
//                     <p>Would you be open to the idea of multiple teams working on your project? If yes, please specify the maximum number of teams you would be happy to work with. To make it easier for you, all team meetings will be combined into the same time slot, ensuring you won't need to allocate more meeting time than you would with one team.<br /><br />
//                         For your consideration, 1-4 teams would require a 1-hour meeting fortnightly. Additionally, we will invite you to evaluate teams' final presentations, typically taking about 20 minutes per team.<br /><br />
//                         Working with multiple teams offers the advantage of bringing diverse perspectives and ideas to the project. It also increases the likelihood of achieving a final result that aligns with expectations.</p>
//                     {/* <input type="radio" id="html" value="1" /> No, only 1 team<br />
//                     <input type="radio" id="html" value="4" /> Yes, up to 4 teams<br />
//                     <input type="radio" id="html" value="" /> <input type="text" name="other" id="numberofteams"/> */}
//                     <select name="languages" id="teams" required>
//                         <option value="" disabled selected>Select</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                         <option value="4">4</option>
//                     </select>

//                 </label>
//                 <label>
//                     <h3>7. Desired team skills </h3>
//                     <p>
//                     Please specify any skills you would like team members to have. This could include expertise in a specific technology or tool that you want the team to use for implementing the project.
//                     </p>
//                     <textarea placeholder="Enter your answer" id="desiredskill"/>
//                 </label>
//                 <label>
//                     <h3>8. Available resources</h3>
//                     <p>
//                     Are there any resources you would like to provide for students to become more familiar with your project?
//                     </p>
//                     <textarea placeholder="Enter your answer" id="availableresources" />
//                 </label>
//                 <label>
//                     <h3>9. Project offering timeframe*</h3>
//                     <p>Please specify the semester which you would like your project to be offered.</p>

//                     {/* <select name="languages" id="timeframe" required>
//                         <option value="">Select</option>
//                         <option value="">this sem</option>
//                         <option value="">next sem</option>
//                         <option value="">2 from current</option>
//                         <option value="">3 from current</option>
//                     </select> */}
//                     <input type="date" id="date"/> 
//                 </label>             
//                 </div> 
//             </form>  
//             <div id="proposalButtons">
//                 <button onClick={next} id="next">Next</button>
//                 <button onClick={back} id="back">Back</button>
//                 <button id="submit" form="proposalForm" type="submit" onClick={submit}>Submit</button>
//             </div>
//         </div>
        
        
//     )

// }




// export default projectProposal;