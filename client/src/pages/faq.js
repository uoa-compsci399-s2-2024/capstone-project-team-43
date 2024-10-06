import React from "react";

import '../App.css';

const Faq = () =>{
    return(
        <div id="faq" className="faq">
            <br></br>
            <h1>Frequently Asked Questions</h1>
           <h2> General </h2>
           <p>
        <b>I forgot my password. How can I reset it? <br /></b>
            You can reset your password by clicking on the "Forgot Password" link on the login page. Follow the instructions to reset your password via email.
            </p>
        <p>
        <b>Can I have both a client and student account? <br /></b>
            No, each account is designed for a specific role (client or student). Only students who have enrolled into CS 399 may be able to login as a student.
            </p>
        <p>
        <b>Who should I contact for technical support? <br /></b>
            For any technical issues or support, please contact our support team via the "Contact Us" page or email exsample@gmail.com.
            </p>

            <h2> Client </h2>
           <p>
        <b>How do I submit a new project? <br /></b>
        To submit a project:
        <ul>
            <li>
            Navigate to the "Project Proposal Form" section.
            </li>
            <li>
            Read thoroughly through the information page and agree to our conditions to move on to fill in required information.
            </li>
            <li>
            Once you have filled in all required information click "Submit" at bottom of the page to finalise your project submission.
            </li>  
        </ul>
            </p>
        <p>
        <b>How can I check my projects?<br /></b>
        To check the status of your project:
        <ul>
            <li>
            Go to the "My Projects" section.
            </li>
            <li>
            Each project will have a status indicator indicating it is either “available” or “unavailable”.
            </li>
        </ul>
        </p>
        <p>
        <b>Can I edit or update my submitted project? <br /></b>
        Yes, projects may be edit or updated through navigating the "My Projects" section.
        <ul>
            <li>
            Go to the "My Projects" section.
            </li>
            <li>
            Click on the project you want to update.
            </li>
            <li>
            Click the "Edit" button in the project pop up.
            </li>  
            <li>
            Make the necessary changes and save.
            </li>  
        </ul>
            </p>
            <p>
        <b>What does the status "Unavailable" mean for my project? <br /></b>
        The "Unavailable" status indicates that your project is no longer active for our student to select for their preference of projects.
            </p>



            <h2> Student </h2>
           <p>
        <b>How do I view available projects? <br /></b>
        To view approved projects:

        <ul>
            <li>
            Navigate to the "Projects" page, where all approved projects will be listed.
            </li>
            <li>
            You may click on a project to view more information on the chosen project.
            </li>
        </ul>
            </p>
        <p>
        <b>How do I submit my project preferences? <br /></b>
        To submit your preferences:
        <ul>
            <li>
            Go to the "Project Preferences Form" section.
            </li>
            <li>
            Select your top 5 project choices by clicking the numbered buttons (1 through 5) for ranking.
            </li>
            <li>
            After selecting your preferences, click "Submit" to finalise your choices.
            </li>
        </ul>
        </p>
        <p>
        <b>Can I change my project preferences after submitting them?<br /></b>
        Yes, you can change your preferences up until the submission deadline:
        <ul>
            <li>
            Go back to the "Project Preferences Form" section.
            </li>
            <li>
            Update your rankings and click "Submit" again.
            </li> 
        </ul>
            </p>
            <p>
        <b>How do I know if I've been assigned to a project? <br /></b>
        The project allocations will be uploaded to canvas by the lecturers after they are looked over and approved.
            </p>

        </div>
    )
}

export default Faq;