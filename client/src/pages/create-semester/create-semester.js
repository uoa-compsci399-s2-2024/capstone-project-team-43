import React, { useState }from "react";
import './create-semester.css';
import { createSemester } from '../../Api.js';
import { Link } from "react-router-dom";

const CreateSemester = () =>{
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = () =>{
        try {

        let start_date = document.getElementById("start").value;
        let end_date = document.getElementById("end").value;

        let start_bidding_date = document.getElementById("start_bid_date").value;
        let start_bidding_time = document.getElementById("start_bid_time").value;

        let end_bidding_date = document.getElementById("end_bid").value;
        let end_bidding_time = document.getElementById("end_bid_time").value;

        let start_bidding_datetime = `${start_bidding_date} ${start_bidding_time}:00`;
        let end_bidding_datetime = `${end_bidding_date} ${end_bidding_time}:00`;


        let is_semester_one = document.getElementById("is_sem_1").value;

        let proposal_deadline = document.getElementById("proposal_deadline").value;


        console.log('creating semester...');
        console.log(start_date);
        console.log(end_date);
        console.log(start_bidding_datetime);
        console.log(end_bidding_datetime);
        console.log(is_semester_one);
        console.log(proposal_deadline);



        const createdSemester = createSemester(start_date, end_date, start_bidding_datetime, end_bidding_datetime, is_semester_one, proposal_deadline);
        setShowSuccessMessage(true)

    } catch (err) {
        console.log("Error", err);
        }
    }


    return(
        <main id="create-semester-page" className="create-semester-page">
            <div className="page-heading">
                <h1>Create a New Semester</h1>
            </div>
            {!showSuccessMessage && <form className="page-content content-section form-content form-fill" id="proposalForm">
                    <label className="form-section">
                        <h2>Semester Dates*</h2>
                        <p>Enter the start and end date for the semester </p>
                        <div className="date-input-container">
                            <div className="start-end-container">
                                <div className="date-input">
                                    <p>Start</p>
                                    <input type='date' placeholder="YYYY-MM-DD" id="start"/>  
                                </div>
                                <div className="date-input"> 
                                    <p>End</p>
                                    <input type='date' placeholder="YYYY-MM-DD" id="end"/>       
                                </div> 
                            </div>
                            <div className="date-input">
                                <p>Type</p>
                                <select id="is_sem_1" defaultValue="true" required>
                                    <option value="true">Semester One</option>
                                    <option value="false">Semester Two</option>
                                </select>
                            </div>
                        </div> 
                    </label>
                    <label className="form-section">
                        <h2>Project Bidding Timeframe*</h2>
                        <p>Choose when teams will be able to submit their project preferences.</p>

                        <div className="date-input-container">
                            <div className="date-input">
                                <p>Start</p>
                                <input type='date' placeholder="YYYY-MM-DD" id="start_bid_date"/> 
                                <input type='time' value="00:00" id="start_bid_time"/>  
 
                            </div>
                            <div className="date-input"> 
                                <p>End</p>
                                <input type='date' placeholder="YYYY-MM-DD" id="end_bid"/>  
                                <input type='time' value="00:00" id="end_bid_time"/>  
                            </div>                 
                        </div>
                    </label>
                    <label className="form-section">
                        <h2>Project Proposal Deadline*</h2>
                        <p>Choose the project proposal submission deadline for this semester. While applications are accepted throughout the year, this deadline will be visible to clients on the project proposal form.</p>

                        <div className="date-input-container">
                            <div className="date-input"> 
                                <input type='date' placeholder="YYYY-MM-DD" id="proposal_deadline"/>  
                            </div>                 
                        </div>
                    </label>
                    <div className = 'semester-submission-buttons'>
                        <button className = 'main-button'id="submit" form="create-semester" type="submit" onClick={handleSubmit}>Create Semester</button>
                    </div>
                </form>}
                {showSuccessMessage && <div className="confirmation-content">
                            <div className="confirmation-header">
                                <h3>Success</h3>
                            </div>
                            <div className="confirmation-text">
                                <p>The new semester has been created.</p>
                                <p>You can view or edit the semester at any time on the Manage Semesters page.</p>
                            </div>
                            <div className="confirmation-link">
                                <Link to='/manage/semester'>
                                <span className="create-link">Go to Manage Semesters</span>
                                </Link>
                            </div>
                        </div>}
        </main>
    )
}

export default CreateSemester;