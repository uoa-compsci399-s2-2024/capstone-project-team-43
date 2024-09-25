
import React from "react";
import { createProject } from '../Api.js'

import '../App.css';
import { projectinfo } from "../components/sortable_item.js";
import { getUserByID } from "../Api.js";
import { jwtDecode } from "jwt-decode";
// import { archiveprojectinfo } from "./projects-archive.js";



const projectProposal = () => {

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
        let expiry = document.getElementById("date").value;
        let owner_id = getClientID();
        let currentDate = new Date();
        let created = currentDate.toISOString().split('T')[0];

        //Structure:  title, description, owner_id, special_requirements, available_resources, preferred_skills, project_deliverable, created, expiry, status, max_teams, project_number, semester_id, other_client details
        createProject(title, description, owner_id, special_equipment_requirment, available_resources, preferred_skills, project_deliverable, created, expiry, "pending", max_teams, -1, 1, other_client_details);
    } catch (err) {
        console.log("Error", err);
        }
    }

    const next = () =>{

        if(projectinfo !== null){
            console.log(getUserByID(projectinfo.project.owner_id));
            //document.getElementById("clientname").value = projectinfo.project.owner_id;
            //document.getElementById("clientemail").value = projectinfo.project.owner_id;
            document.getElementById("projecttitle").value = projectinfo.project.title;
            document.getElementById("projectdescription").value = projectinfo.project.description;
            document.getElementById("desiredoutput").value = projectinfo.project.deliverable;
            document.getElementById("specialequipment").value = projectinfo.project.special_requirements;
            document.getElementById("desiredskill").value = projectinfo.project.preferred_skills;
            document.getElementById("date").value = projectinfo.project.expiry;   
            // console.log(document.getElementById("clientname"));
            // document.getElementById("clientname").value = projectinfo.owner_id;
        }
        // else if (archiveprojectinfo !== null){
        //     document.getElementById("clientname").value = archiveprojectinfo.owner_id;
        //     document.getElementById("clientemail").value = archiveprojectinfo.owner_id;
        //     document.getElementById("projecttitle").value = archiveprojectinfo.title;
        //     document.getElementById("projectdescription").value = archiveprojectinfo.description;
        //     document.getElementById("desiredoutput").value = archiveprojectinfo.deliverable;
        //     document.getElementById("specialequipment").value = archiveprojectinfo.special_requirements;
        //     document.getElementById("desiredskill").value = archiveprojectinfo.preferred_skills;
        //     document.getElementById("date").value = archiveprojectinfo.expiry;
        // }

       if(document.getElementById("check1").checked === false || document.getElementById("check2").checked === false){
            // alert("Please read the information and confirm availability before proceeding.");
            document.getElementById('pop').style.display = "block";
       }else{
            document.getElementById('next').style.display = "none";
            document.getElementById('back').style.display = "block";
            document.getElementById('proposalContent').style.display = "block";
            document.getElementById('proposalInformation').style.display = "none";
            document.getElementById("proposalHeader").scrollIntoView({ behavior: "smooth" });

       }
    }

    const back = () =>{
        document.getElementById('next').style.display = "inline";
        document.getElementById('back').style.display = "none";
        document.getElementById('proposalContent').style.display = "none";
        document.getElementById('proposalInformation').style.display = "block";
    }

    const close = () => {
        document.getElementById('pop').style.display = "none";
    }



  
    return(
            <div className="projectProposal">
                
            <div id="pop">
                Please confirm meeting attendance and final presentation attendance. <br /><br /><br />
                <button id="popBack" onClick={close}>Back</button>
            </div>
                <h1 id="proposalHeader"> Computer Science Capstone Project Proposal Form</h1>
                <div id="proposalInformation">
                <h3>Deadline</h3>

                Please complete this form if you wish to propose a project for the COMPSCI 399 Capstone Course in S2 2024. The deadline for form submission is June 30, 2024, by 11:59 pm.

                <br />Note: We accept applications throughout the year, but if the deadline isn't met, we will consider the project only for the following semester.

                <h3>Project Requirements</h3>
                <br />The proposed project should be a research or software development project, suitable in size to be completed within the 12-week duration of the semester. It should present a challenge for a team consisting of 5-6 students. For example, if you are involved in an ongoing research/development project and seek assistance in developing a specific module, you can propose it as a potential project. Alternatively, if you are in a service role and require support in creating a system to facilitate or automate certain aspects of your work, you can suggest a project for consideration.

                <br />Each team is expected to allocate approximately 7-8 hours per person per week to project development. The team will produce a prototype system every fortnight, progressively enhancing its functionality.

                <h3>Supervision Requirements</h3>
                <br />Team(s) will meet with you (or your nominated representative) at least once every fortnight to ensure that the project is going in the right direction.
                <br />There will be a final project presentation session (probably in the last week of the semester) that we would expect you (or your nominated representative) to attend and provide us with feedback on your team's performance.

                <h3>Contacts & Information</h3>
                <br />You can find examples of projects created by capstone students following this link: https://www.capitalise.space/
                <br />The course overview can be found here: https://courseoutline.auckland.ac.nz/dco/course/COMPSCI/399/1243 
                <br /> If you have any questions, please feel free to contact Anna Trofimova (anna.trofimova@auckland.ac.nz) or Asma Shakil (asma.shakil@auckland.ac.nz)
                

                <h3>Meeting attendance:</h3>
                <p>
                The teaching team will aim to arrange meetings with the students at times that best suit your schedule. You can attend the meetings either in person or via Zoom (or Teams). The details and schedule of the meetings will be arranged at the beginning of the semester and will cover the entire duration of the course.
                </p>
                <input type="checkbox" id="check1" value="check"  required/>
                I confirm that I will be able to attend 6 meetings with students, scheduled 2-3 weeks apart.<br />

           
                <h3>Final presentation attendance:</h3>
                <p>The teaching team will aim to arrange the final presentation at a time that best suits your schedule. The final presentation will be held on the UoA Main Campus and must be attended in person.</p>
                <input type="checkbox" id="check2" value="check" required/>
                I confirm that I will be able to attend final presentation in-person.<br />
                </div>

            
            <form className="proposalForm" id="proposalForm">
                <div id="proposalContent">
                <label>
                    <h3>1. Other clients' details</h3>
                    <p>If there is anyone else involved in the project, please provide their names and emails</p>
                    <textarea placeholder="Enter your answer" id="otherclientdetails"/>
                </label>
                <label>
                    <h3>2. Project title* </h3>
                    <p>Please provide an informative project title.</p>
                    <input type="text" name="title" placeholder="Enter your answer" required id="projecttitle"/>
                </label>
                <label>
                    <h3>3. Project description* </h3>
                    <p>Please provide a short description (3-10 sentences) of the project.</p>
                    <textarea placeholder="Enter your answer" required id="projectdescription"/>
                </label>
                <label>
                    <h3>4. Desired output*</h3>
                    <p>Please identify the features that will constitute the MVP (minimum viable product).</p>
                    <textarea placeholder="Enter your answer" required id="desiredoutput"/>
                </label>
                <label>
                    <h3>5. Special equipment requirements*</h3>
                    <p>Will your project require special equipment that you are unable to provide? <br />
                        If yes, please specify the required equipment.<br />
                        Note: We can only accept a limited number of projects with special equipment needs.
                    </p>
                    <input type="radio" id="html" name="fav_language" value="HTML" /> No<br />
                    <input type="radio" id="html" name="fav_language" value="HTML" /> Yes<br />
                    <textarea placeholder="Please specify" id = "specialequipment"/>
                </label>
                <label>
                    <h3>6. Number of teams*</h3>
                    <p>Would you be open to the idea of multiple teams working on your project? If yes, please specify the maximum number of teams you would be happy to work with. To make it easier for you, all team meetings will be combined into the same time slot, ensuring you won't need to allocate more meeting time than you would with one team.<br /><br />
                        For your consideration, 1-4 teams would require a 1-hour meeting fortnightly. Additionally, we will invite you to evaluate teams' final presentations, typically taking about 20 minutes per team.<br /><br />
                        Working with multiple teams offers the advantage of bringing diverse perspectives and ideas to the project. It also increases the likelihood of achieving a final result that aligns with expectations.</p>
                    {/* <input type="radio" id="html" value="1" /> No, only 1 team<br />
                    <input type="radio" id="html" value="4" /> Yes, up to 4 teams<br />
                    <input type="radio" id="html" value="" /> <input type="text" name="other" id="numberofteams"/> */}
                    <select name="languages" id="teams" required>
                        <option value="" disabled selected>Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                </label>
                <label>
                    <h3>7. Desired team skills </h3>
                    <p>
                    Please specify any skills you would like team members to have. This could include expertise in a specific technology or tool that you want the team to use for implementing the project.
                    </p>
                    <textarea placeholder="Enter your answer" id="desiredskill"/>
                </label>
                <label>
                    <h3>8. Available resources</h3>
                    <p>
                    Are there any resources you would like to provide for students to become more familiar with your project?
                    </p>
                    <textarea placeholder="Enter your answer" id="availableresources" />
                </label>
                <label>
                    <h3>9. Project offering timeframe*</h3>
                    <p>Please specify the semester which you would like your project to be offered.</p>

                    {/* <select name="languages" id="timeframe" required>
                        <option value="">Select</option>
                        <option value="">this sem</option>
                        <option value="">next sem</option>
                        <option value="">2 from current</option>
                        <option value="">3 from current</option>
                    </select> */}
                    <input type="date" id="date"/> 
                </label>             
                </div> 
            </form>  
            <div id="proposalButtons">
                <button onClick={next} id="next">Next</button>
                <button onClick={back} id="back">Back</button>
                <button id="submit" form="proposalForm" type="submit" onClick={submit}>Submit</button>
            </div>
        </div>
        
        
    )

}




export default projectProposal;