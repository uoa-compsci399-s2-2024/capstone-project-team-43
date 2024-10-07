import React from "react";
import './create-semester.css';
import { createSemester } from '../../Api.js';

const CreateSemester = () =>{

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

        console.log('creating semester...');
        console.log(start_date);
        console.log(end_date);
        console.log(start_bidding_datetime);
        console.log(end_bidding_datetime);
        console.log(is_semester_one);

        createSemester(start_date, end_date, start_bidding_datetime, end_bidding_datetime, is_semester_one);

    } catch (err) {
        console.log("Error", err);
        }
    }

    return(
        <main id="create-semester-page" className="create-semester-page">
            <h1>Create a New Semester</h1>
            <form className="content-section form-content form-fill" id="proposalForm">
                    <label className="form-section">
                        <h2>1. Semester Dates</h2>
                        <p>Enter the start and end date of the semester </p>
                        <div className="date-input-container">
                            <div className="date-input">
                                <p>Start</p>
                                <input type='date' placeholder="YYYY-MM-DD" id="start"/>  
                            </div>
                            <div className="date-input"> 
                                <p>End</p>
                                <input type='date' placeholder="YYYY-MM-DD" id="end"/>       
                            </div> 
                            <div className="date-input">
                                <p>Type</p>
                                <select id="is_sem_1" required>
                                    <option value="" disabled selected>Select</option>
                                    <option value="true">1</option>
                                    <option value="false">2</option>
                                </select>
                            </div>
                        </div> 
                    </label>
                    <label className="form-section">
                        <h2>2. Project Bidding Timeframe </h2>
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
                    <div className = 'semester-submission-buttons'>
                        <button className = 'main-button'id="submit" form="create-semester" type="submit" onClick={handleSubmit}>Create Semester</button>
                    </div>
                </form>
        </main>
    )
}

export default CreateSemester;