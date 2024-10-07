import React from "react";
import './faq.css';


const Faq = () =>{
    return(
        <main id="faq" className="faq-page">
            <div className="content">
            <h1>Frequently Asked Questions</h1>

            <div className="faq-section">
                <h3>I forgot my password. How can I reset it?</h3>
                <p>You can reset your password by clicking on the "Forgot Password" link on the login page. 
                Follow the instructions to reset your password via email.</p>
            <h3>Can I have both a client and student account?</h3>
                <p>
                    No, each account is designed for a specific role (client or student). Only students who have enrolled into CS 399 may be able to login as a student.
                </p>
            <h3>Who should I contact for technical support?</h3>
                <p>For any technical issues or support, please contact our support team via the "Contact Us" page or email exsample@gmail.com.
                </p>
            </div>

            <h2>For Clients</h2>
            <div className="faq-section">
                <h3>How do I submit a new project?</h3>
                    <p>To submit a project:
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
                <h3>How can I check my projects?</h3>
                    <p>To check the status of your project:
                        <ul>
                            <li>
                            Go to the "My Projects" section.
                            </li>
                            <li>
                            Each project will have a status indicator indicating it is either “available” or “unavailable”.
                            </li>
                        </ul>
                    </p>

                <h3>Can I edit or update my submitted project?</h3>
                <p>
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

                <h3>What does the status "Unavailable" mean for my project? </h3>
                <p>
                    The "Unavailable" status indicates that your project is no longer active for our student to select for their preference of projects.
                </p>
            </div>


            <h2>For Students</h2>
            <div className="faq-section">
                <h3>How do I view available projects?</h3>
                <p>
                    To view approved projects, navigate to the 'Projects' page, where all approved projects will be listed.
                    You may click on a project to view more information on the chosen project.
                </p>
                   
                <h3>How do I submit my project preferences?</h3>
                    <p>To submit your preferences:
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
                <h3>Can I change my project preferences after submitting them?</h3>
                    <p>Yes, you can change your preferences up until the submission deadline:
                        <ul>
                            <li>
                            Go back to the "Project Preferences Form" section.
                            </li>
                            <li>
                            Update your rankings and click "Submit" again.
                            </li> 
                        </ul>
                    </p>
                <h3>How do I know if I've been assigned to a project?</h3>
                <p>
                    The project allocations will be uploaded to canvas by the lecturers after they are looked over and approved.
                </p>
            </div>
        </div>
    </main>
    )
}

export default Faq;