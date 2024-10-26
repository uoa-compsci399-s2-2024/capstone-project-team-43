
import React, { useEffect, useState } from 'react';
import { createProject, fetchSemesters, fetchUsersByRole } from '../../Api.js'

import { fetchUser, updateUserDetails } from "../../Api.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserID } from '../../utils/auth.js';

import './project-proposal.css'
import { formatDate } from '../../utils/format-date.js';

const ProjectProposal = () => {
    const [userID, setUserID] = useState(null);
    const [showAttendanceConfirmation, setShowAttendanceConfirmation] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showEquipmentReqWindow, setShowEquipmentReqWindow] = useState(false);
    const [showExpiryWindow, setShowExpiryWindow] = useState(false);


    const [client, setClient] = useState(null);
    const [meetingAttendance, setMeetingAttendance] = useState(false);
    const [presentationAttendance, setPresentationAttendance] = useState(false);
    const openAttendanceConfirmation = () => setShowAttendanceConfirmation(true);
    const closeAttendanceConfirmation = () => setShowAttendanceConfirmation(false);

    const [upcomingSemester, setUpcomingSemester] = useState(null);

    const navigate = useNavigate();


    // const [nextStart, setNextStart] = useState(null);
    // const [submissionDeadline, setSubmissionDeadline] = useState(null);

    const handleEquipmentReqSelect = (event) => {
        const value = event.target.value;
        if (value === "1") {
            setShowEquipmentReqWindow(true);
        }
        else{
            setShowEquipmentReqWindow(false);
        }
    }


    const handleFurtherConsiderationSelect = (event) => {
        const value = event.target.value;
        if (value === "1") {
            setShowExpiryWindow(true);
        }
        else{
            setShowExpiryWindow(false);
        }
    }

    // Get user data
    useEffect(() => {
        if (userID) {
            async function getUser() {
                try {
                    const data = await fetchUser(userID);
                    setClient(data);
                } catch (error) {
                    console.error('Failed to load client:', error);
                }
            }
        getUser();     
        }
    }, [userID]);
    
    // Get upcoming semester data 
    useEffect(() => {
        console.log('getting semesters data');
        const getSemester = async () => {
                try {
                    const data = await fetchSemesters();
                    const currentDate = new Date();
                    console.log('all sems: ', data);
                    console.log('current date:',currentDate);

                    const upcomingSemesters = data.filter(semester => new Date(semester.start_date) >= currentDate);
                    console.log('upcoming:',upcomingSemester);
                    const sortedSemesters = upcomingSemesters.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
                    console.log('sorted:',sortedSemesters);
                    const earliestSemester = sortedSemesters.length > 0 ? sortedSemesters[0] : null;
                    console.log('earliest:',earliestSemester);

                    setUpcomingSemester(earliestSemester);
                    console.log('Fetched upcoming semester:', earliestSemester);
                } catch (error) {
                    console.error('Failed to load upcoming semester:', error);
                }
            }
        getSemester();
    }, []); 

    // useEffect(() => {
    //     console.log('getting semesters data');
    //     const getSemesters = async () => {
    //             try {
    //                 const data = await fetchSemesters();
    //                 setSemesters(data);
    //                 console.log('Fetched semester data:', data);
    //             } catch (error) {
    //                 console.error('Failed to load semester:', error);
    //             }
    //         }
    //     getSemesters();
    // }, []); 

    

    
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
        setShowForm(false);
        setShowSuccessMessage(true);
    };


    useEffect(() => {
        console.log("getting user id");
        const id = getUserID();
        console.log("user id"+id);
        setUserID(id);
    }, []);

    const checkReqChecked = () => {
        if (document.getElementById("check1").checked 
        && document.getElementById("check2").checked) {
        setShowAttendanceConfirmation(false);        
        }
    };

    useEffect(() => {
        if (client && !showSuccessMessage) {
            async function populateForm() {
                console.log('populating client details...');
                try {
                    // Check if the element exists before setting the value
                    const fnameElement = document.getElementById("fname");
                    if (fnameElement && client.first_name) {
                        fnameElement.value = client.first_name;
                    }
    
                    const lnameElement = document.getElementById("lname");
                    if (lnameElement && client.last_name) {
                        lnameElement.value = client.last_name;
                    }
    
                    const emailElement = document.getElementById("email");
                    if (emailElement && client.email) {
                        emailElement.value = client.email;
                    }
    
                    const companyElement = document.getElementById("company");
                    if (companyElement && client.company) {
                        companyElement.value = client.company;
                    }
    
                    console.log('finished populating');
                } catch (err) {
                    console.log('error populating:', err);
                }
            }
            populateForm();
        }
    }, [client, showSuccessMessage]);

    const submit = async (e) => {
        try {
            console.log('submitting edits');
            e.preventDefault();
    
            // update client details if needed
            if (document.getElementById("fname").value !== client.first_name){
                await updateUserDetails(client.id, 'first_name', document.getElementById("fname").value);
            }
            if (document.getElementById("lname").value !== client.last_name){
                await updateUserDetails(client.id, 'last_name', document.getElementById("lname").value);
            }
            if (document.getElementById("email").value !== client.email){
                await updateUserDetails(client.id, 'email', document.getElementById("email").value);
            }
            // }
            // if (document.getElementById("company").value !== client.company){
            //     await updateUserDetails(client.id, 'company', document.getElementById("company").value);
            // }
    
            let other_client_details = null; //document.getElementById("otherclientdetails").value;
            let title = document.getElementById("projecttitle").value;
            let description = document.getElementById("projectdescription").value;
            let project_deliverable = document.getElementById("desiredoutput").value;
    
            let special_equipment_requirement = null;
    
            let expiry = '0000-00-00';
    
            let max_teams = document.getElementById("teams").value;
            let preferred_skills = null;
            let available_resources = null;
            let owner_id = userID;
            let currentDate = new Date();
            let created = currentDate.toISOString().split('T')[0];
    
            console.log("Submitting project with values:", {
                other_client_details, title, description, project_deliverable, 
                special_equipment_requirement, max_teams, preferred_skills, 
                available_resources, expiry, owner_id, created
            });
    
            const response = await createProject(
                title, description, owner_id, special_equipment_requirement, 
                available_resources, preferred_skills, project_deliverable, 
                created, created, expiry, "pending", max_teams, -1, 2, other_client_details
            );
    
            handleSuccess();
        } catch (err) {
            console.log("Error", err);
        }
    };


    return(<main className="project-proposal-page">
                <div className="content">
                    <div className='page-heading'>
                        <h1>Project Proposal Form</h1>
                    </div>
                    {(!showForm && !showSuccessMessage)&& <div className="page-content form-content form-intro">
                        <p>Please complete this form if you wish to propose a 
                            project for the COMPSCI 399 Capstone Course.
                        </p>
                        {upcomingSemester && <div> 
                            <h2>Submission Deadline</h2>
                            <p>
                                The submission deadline for the next semester starting {formatDate(upcomingSemester.start_date)} is {formatDate(upcomingSemester.proposal_deadline)}.
                            </p>
                            <p>Please note that while we accept applications throughout the year, 
                                if the proposal submission deadline isn't met we will only consider 
                                the project for future semesters.
                            </p>
                        </div>}

                        <h2>Project Requirements</h2>    
                        <p>The proposed project should be a research or software development project,
                            suitable in size to be completed within the 12-week 
                            duration of the semester. 
                            It should present a challenge for a team 
                            consisting of 5-6 students. For example, if you are 
                            involved in an ongoing research/development project and seek assistance
                            in developing a specific module, you can propose it as a potential project. 
                            <br></br><br></br>Alternatively, if you are in a service role and require support in creating a system to 
                            facilitate or automate certain aspects of your work, you can suggest a project for consideration.
                            <br></br><br></br>Each team is expected to allocate approximately 7-8 hours per person per week to project development. 
                            The team will produce a prototype system every fortnight, progressively enhancing its functionality.
                        </p>

                        <h2>Supervision Requirements</h2>
                        <p>Team(s) will meet with you (or your nominated representative) at least 
                            once every fortnight to ensure that the project is going in the right direction.
                            <br></br><br></br>There will be a final project presentation session (probably in the last week of the semester) 
                            that we would expect you (or your nominated representative) to attend and provide us with feedback
                            on your team's performance.
                        </p>

                        <h2>Contacts & Information</h2>
                        <p>You can find examples of projects created by capstone students following 
                            this link: https://www.capitalise.space/
                            <br></br><br></br>The course overview can be found here: https://courseoutline.auckland.ac.nz/dco/course/COMPSCI/399/1243
                            <br></br><br></br>If you have any questions, please feel free to contact Anna Trofimova (anna.trofimova@auckland.ac.nz)
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
                                <input className = 'checkbox' type="checkbox" id="check1" value="check" name = "check2" required onChange={checkReqChecked}/>
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
                                <label htmlFor="check1" >
                                    <input className = 'checkbox' type="checkbox" id="check2" value="check" name = "check1" required onChange={checkReqChecked}/>
                                    I confirm that I will be able to attend final presentation in-person.
                                </label>
                        </div>
                        {showAttendanceConfirmation && <div className='pop-up attendance-confirmation' id="pop">
                            <p className="pop-up-text">
                                Please confirm meeting attendance and final presentation attendance before continuing to the project proposal form.
                            </p>
                        </div>}
                    <button onClick={handleContinueToForm} className='main-button continue'>Continue to Project Proposal Form</button>
                    </div>}            
            {(showForm && client) && <form onSubmit={submit} className="page-content form-content form-fill" id="proposalForm">
                    <label>
                        <h2>1. Your Details*</h2>
                        <p>Please confirm your name, email address, and company name (if applicable)</p>
                        <div className='client-input-wrapper'>
                           {client.first_name !== undefined && <div className='client-input'>
                                <p>First name:</p>
                                <input 
                                    type='text' 
                                    required 
                                    id="fname" 
                                    defaultValue={client.first_name} 
                                    placeholder="Enter First Name"
                                />
                            </div>}
                            
                            {client.last_name !== undefined && <div className='client-input'>
                                <p>Last Name:</p>
                                <input 
                                    type='text' 
                                    required 
                                    id="lname" 
                                    defaultValue={client.last_name} 
                                    placeholder="Enter Last Name"
                                />
                            </div>}
                            
                            {client.email !== undefined && <div className='client-input'>
                                <p>Email:</p>                        
                                <input 
                                    type='email' 
                                    required 
                                    id="email" 
                                    defaultValue={client.email} 
                                    placeholder="Enter Email"
                                />
                            </div>}
                            
                            {client.company !== undefined && <div className='client-input'>
                                <p>Company:</p>
                                <input 
                                    type='text' 
                                    id="company" 
                                    defaultValue={client.company || ''} 
                                    placeholder="Enter Company Name"
                                />
                            </div>}
                        </div>
                    </label>
                    <label>
                        <h2>2. Other Clients' Details</h2>
                        <p>If there is anyone else involved in the project, please provide their names and emails</p>
                        <textarea placeholder="Enter your answer" id="otherclientdetails"/>
                    </label>
                    <label>
                        <h2>3. Project Title* </h2>
                        <p>Please provide an informative project title.</p>
                        <input type="text" name="title" placeholder="Enter your answer" required id="projecttitle"/>
                    </label>
                    <label>
                        <h2>4. Project Description* </h2>
                        <p>Please provide a short description (3-10 sentences) of the project.</p>
                        <textarea placeholder="Enter your answer" required id="projectdescription"/>
                    </label>
                    <label>
                        <h2>5. Desired Output*</h2>
                        <p>Please identify the features that will constitute the MVP (minimum viable product).</p>
                        <textarea placeholder="Enter your answer" required id="desiredoutput"/>
                    </label>
                    <label>
                        <h2>6. Special Equipment Requirements*</h2>
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
                        <h2>7. Number of Teams*</h2>
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
                        <h2>8. Desired Team Skills </h2>
                        <p>
                        Please specify any skills you would like team members to have. This could include expertise in a specific technology or tool that you want the team to use for implementing the project.
                        </p>
                        <textarea placeholder="Enter your answer" id="desiredskill"/>
                    </label>
                    <label>
                        <h2>9. Available Resources</h2>
                        <p>
                        Are there any resources you would like to provide for students to become more familiar with your project?
                        </p>
                        <textarea placeholder="Enter your answer" id="availableresources" />
                    </label>
                    <label>
                        <h2>10. Future Consideration*</h2>
                        <p>If your project is not selected by students in the upcoming semester, would you like it to be considered for following semesters?</p>
                        <select id="yes-no-futher-consideration" onChange = {handleFurtherConsiderationSelect}> 
                            <option value="" disabled selected>Select</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                        {showExpiryWindow && <div>
                            <p>Please enter the date you would like your project to be withdrawn</p>
                            <input type="date" id="expiry"/>
                            </div>}
                    </label>             
                        <div className = 'proposal-submission-buttons' id="proposalButtons">
                        <button className = 'main-button' onClick={handleGoBack} id="back">Go Back</button>
                        <button className = 'main-button'id="submit" form="proposalForm" type="submit">Submit</button>
                        </div>
                </form>} 

                {showSuccessMessage && (<div className='page-content'>
                    <div className='success-message'>
                        <h3>Success</h3>
                        <div className='project-edit-redirect'>
                            <p>Thank you for submitting your project!</p>
                            <p>You will be contacted by the course coordinators if your project is assigned to a student team.</p>
                            <Link to='/projects/view'>
                                <span>View Your Projects</span>
                            </Link>
                            {/* {userRole === 'admin' && <Link to='/projects/available'>
                                <span>View Published Projects</span>
                            </Link>}
                            {userRole === 'admin' && <Link to='/projects/manage'>
                                <span>Manage All Projects</span>
                            </Link>} */}
                        </div>
                    </div>
                </div>)}
            </div>
        </main>
    )
}

export default ProjectProposal;

