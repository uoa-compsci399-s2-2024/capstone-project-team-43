import React, { Component, useRef } from "react";
import './project-preferences.css';
import { Link } from "react-router-dom";
import Project from "../../components/project/project.js";
import { useState, useEffect } from "react";
import { fetchProjects, fetchSemesters, updatePreferences, fetchUser, fetchPreferences, deletePreferences } from '../../Api.js'
import { useParams, useNavigate } from 'react-router-dom';
import { getUserID } from "../../utils/auth.js";
import Container from "../../components/container.js";




const ProjectPreferences = ()=>{
    const [currentSemester, setCurrentSemester] = useState(null);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);

    const [chosenProjects, setChosenProjects] = useState([]);
    const [preferences, setPreferences] = useState([]);

    // below set to true, must be set to false in deployment
    const [biddingOpen, setBiddingOpen] = useState(true);

    const [showForm, setShowForm] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showHelp, setShowHelp] = useState(false); 

    
    const handleGoBack = () => {
        setShowForm(true)
        setShowConfirmation(false)
        setChosenProjects([]);
    };

    const handleSuccess = () => {
        setShowSuccessMessage(true)
    };

    const choose = (element, index) =>{
        setChosenProjects(oldArray => [...oldArray,element] );
    }


    // get user's id
    useEffect(() => {
        const fetchUserId = async () => {
            console.log("getting user id");
            const id = await getUserID(); 
            console.log("user id:", id);
            setUserId(id);
        };
        fetchUserId(); 
    }, []);

    // Get user data
    useEffect(() => {
        if (userId) {
            async function getUser() {
                try {
                    const data = await fetchUser(userId);
                    setUser(data);
                    console.log('Fetched user data:', data);  
                } catch (error) {
                    console.error('Failed to load user:', error);
                }
            }
            getUser();
        }
    }, [userId]);

        
    // get all projects 
    useEffect(() => {
        async function getProjects() {
            try {
                console.log('getting projects')
                // const data = await fetchProjects('accepted');
                const data = await fetchProjects();
                setProjects(data);
                console.log('projects:',data);
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjects();
    }, []);

    // get current semester 
    useEffect(() => {
        async function getSemesters() {
            try {
                const data = await fetchSemesters();
                console.log('Fetched semester datas', data);  
                setCurrentSemester(data.find(data => data.status === 'current'));                       
            } catch (error) {
                console.error('Failed to load semester:', error);
                return; 
            }
        }
        getSemesters();
    }, []);


    useEffect(() => {
        async function getPreferences() {
            try {
                const data = await fetchPreferences();
                setPreferences(data);
            } catch (error) {
                console.error('Failed to load preferences:', error);
            }
        }
        getPreferences();
    }, []);


    // UNCOMMENT WHEN TESTING

    // ensure form only displays if bidding is open
    // useEffect(() => {
    //     if (currentSemester) {
    //         let today = new Date().toISOString();
            

    //         let isOpen = (today >= currentSemester.start_bidding_date
    //             && currentSemester.end_bidding_date >= today)

    //         console.log('isOpen?',isOpen);

    //         setBiddingOpen(isOpen)
    //     }
    // }, [currentSemester]);


    // handles user clicking project after already clicking a preference button
    const handleclick = (project) =>{
        if (opt1 === true){
            if (!(chosenProjects.some((item) => item.title === project.title))){
                {choose(project, 0)};
            let options = document.getElementById('option1');
            options.innerHTML += `<p className = 'opt-project-title'>${project.title}</p>`;
            // options.innerHTML += project.title;
            // options.innerHTML += "</p>";
            opt1 = false;
            }
        }
        else if (opt2 === true){
            if (!(chosenProjects.some((item) => item.title === project.title))){
            {choose(project, 1)};
            let options = document.getElementById('option2');
            options.innerHTML += `<p className = 'opt-project-title'>${project.title}</p>`;
            opt2 = false;
        }
        }
        else if (opt3 === true){
            if (!(chosenProjects.some((item) => item.title === project.title))){
            {choose(project, 2)};
            let options = document.getElementById('option3');
            options.innerHTML += `<p className = 'opt-project-title'>${project.title}</p>`;
            opt3 = false;
        }
        }
        else if (opt4 === true){
            if (!(chosenProjects.some((item) => item.title === project.title))){
            {choose(project, 3)};
            let options = document.getElementById('option4');
            options.innerHTML += `<p className = 'opt-project-title'>${project.title}</p>`;

            opt4 = false;
        }
        }
        else if (opt5 === true){
            if (!(chosenProjects.some((item) => item.title === project.title))){
            {choose(project, 4)};
            let options = document.getElementById('option5');
            options.innerHTML += `<p className = 'opt-project-title'>${project.title}</p>`;

            opt5 = false;
        }
        }
    }

    let opt1 = false;
    let opt2 = false;
    let opt3 = false;
    let opt4 = false;
    let opt5 = false;

    // handles form submission 
    const handleConfirmation =() =>{
        if(document.getElementById("agreeupon").checked === true) {
        // document.getElementById('projectPreferenceselements').style.display = "none";
        // document.getElementById('onsubmission').style.display = "block";
        // document.getElementById('projectpreferenceconfirm').style.display = "none";
        
            let team = user.team_id;

            // delete any pre-existing preferences for the user's team
            let exists = [];
            exists = preferences.filter(preference => preference.team_id === team);
            if (exists.length !== 0){
                for (let i = 0; i < exists.length; i++){
                    console.log("DELETE");
                    deletePreferences(exists[i].id);
                };
            }

            // load preferences into database
            for (let i = 0; i < chosenProjects.length; i++){
                let proj = chosenProjects[i].id;
                let pref = i+1;
                updatePreferences(team, proj, pref);
            };
            setShowSuccessMessage(true);
        }
        else {
            // currently doesn't do anything - should pop up with reminder to check confirmation 
            setShowConfirmationPopUp(true);
        }
    }

    // const cancel = () =>{
    //     document.getElementById('projectpreferenceconfirm').style.display = "none";
    //     document.getElementById('projectPreferenceselements').style.background = "#2979FF";
    //     document.getElementById('projectPreferenceselements').style.opacity = "100%";
    // }

    const handleSubmit = () =>{
        // only continue if all 5 preference containers have been filled
        if(chosenProjects.length < 5){
            return;
        }
        console.log('chosen:',chosenProjects);

        // if(chosenProjects[0].title !== undefined && chosenProjects[1].title !== undefined && chosenProjects[2].title !== undefined && chosenProjects[3].title !== undefined && chosenProjects[4].title !== undefined){
        // document.getElementById('projectpreferenceconfirm').style.display = "block";
        // document.getElementById('projectPreferenceselements').style.background = "#003998";
        // document.getElementById('projectPreferenceselements').style.opacity = "30%";
        // }

        // move to confirmation page
        setShowForm(false);
        setShowHelp(false);
        setShowConfirmation(true);
    }

    const selecting = (option) =>{
        if (option === "option1"){
            opt1 = true;
            let options = document.getElementById('option1');
            options.innerHTML = "1";
        }

        else if (option === "option2"){
            opt2 = true;
            let options = document.getElementById('option2');
            options.innerHTML = "2";
        }

        else if (option === "option3"){
            opt3 = true;
            let options = document.getElementById('option3');
            options.innerHTML = "3";
        }

        else if (option === "option4"){
            opt4 = true;
            let options = document.getElementById('option4');
            options.innerHTML = "4";
        }

        else if (option === "option5"){
            opt5 = true;
            let options = document.getElementById('option5');
            options.innerHTML = "5";
        }
    }
    
    let biddingtime;
    const getBiddingDate = () => {
    try {
    // const currentSemester = semesters.filter(semester => semester.status === "current");
    biddingtime = currentSemester.end_bidding_date
    } catch (err) {}
    }

    const formatBiddingDate = (biddingDate) => {
        console.log("BIDDING DATE RECEIVED: ", biddingDate);
        if(biddingDate) {
        console.log(typeof biddingDate, biddingDate);
        const date = new Date(biddingDate);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = (hours % 12) || 12;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear().toString().slice(-2); 
            
        return `${formattedHours}:${minutes}${ampm} ${day}/${month}/${year}`;
        } else {
            getBiddingDate();
            // console.log("UPDATED BIDDING DATE: ", biddingtime);
            return null;
        }
    };

    // const helppopup = () =>{
    //     document.getElementById('help').style.display = "block";
    //     document.getElementById('projectPreferenceselements').style.background = "#003998";
    //     document.getElementById('projectPreferenceselements').style.opacity = "30%";
    // }

    // const helppopupclose = () =>{
    //     document.getElementById('help').style.display = "none";
    //     document.getElementById('projectPreferenceselements').style.background = "#2979FF";
    //     document.getElementById('projectPreferenceselements').style.opacity = "100%";
    // }


    // if todays date out of valid range - display locked page, else display preferences page
    // if(showForm === false){
    //     return(
    //         <div className="preferenceHide">
    //         Project preference submission currently locked.
    //         </div>
    //     )
    // };
    

    return(
        <main className="project-preferences-page">
            {projects && <div className="content">
                <div className="page-heading">
                    <h1>Project Preferences Form</h1>
                </div>

                {/* display form if bidding open */}
                {(showForm && biddingOpen) && <div className="page-content">
                    <div className="pref-container">
                        <div className="projects-display-wrapper">
                            <div className="pref-projects-container">
                                {/* display published projects */}
                                {projects
                                // .filter(project => project.published === 'true')
                                .map(project => (
                                    (<div className="full-project-wrapper" key={project.id} onClick={() => handleclick(project)} id="proj">
                                        <Project 
                                        projectId={project.id} 
                                        view = 'preferences'
                                        expanded={false} 
                                        />   
                                    </div>)))}
                            </div>
                        </div>
                        {/* preference number containers */}
                        <div className="preferences-display-wrapper">
                            <div className='pref-button-wrapper' id="sidebuttons">
                                <button className='pref-button' id="option1" onClick={()=>{selecting("option1")}}>1</button>
                                <button className='pref-button' id="option2" onClick={()=>{selecting("option2")}}>2</button>
                                <button className='pref-button' id="option3" onClick={()=>{selecting("option3")}}>3</button>
                                <button className='pref-button' id="option4" onClick={()=>{selecting("option4")}}>4</button>
                                <button className='pref-button' id="option5" onClick={()=>{selecting("option5")}}>5</button>
                                
                                {/* Submit form button */}
                                <button className='submit-pref-button' onClick={handleSubmit}>Submit Preferences</button>
                            </div>
                        </div>
                    </div>
                </div>}
                {showConfirmation && <div className="page-content">
                    <div className="success-message confirmation-window">
                        {!showSuccessMessage && <div className="confirmation-content">
                            <div className="confirmation-header">
                                <p>Confirm Your Preferences</p>
                            </div>
                            <div className="confirmation-projects">
                                {chosenProjects
                                // .filter(project => project.published === 'true')
                                .map(project => (
                                    (<div className="full-project-wrapper chosen-project" key={project.id} id="proj">
                                        <Project 
                                        projectId={project.id} 
                                        view = 'chosen'
                                        expanded={false} 
                                        />   
                                    </div>)))}
                            </div>
                            <div className="confirmation-text">
                                <span>Please note that this submission will count for your entire team and cause any previous submissions for your team to be deleted.</span>
                            </div>
                            <div className="confirmation-checks">
                                <input type="checkbox" id="agreeupon" name="agreeupon" value="y/n" required></input>
                                <label htmlFor="agreeupon"> I confirm that all team members agree on the order of the projects provided above</label>
                            </div>
                            <div className="confirmation-buttons">
                                <button className='confirm-button'onClick={handleConfirmation}>Submit Team Preferences</button>
                                <button className = 'redirect-button' onClick={handleGoBack}>Go Back</button>
                            </div>
                        </div>}
                        {showSuccessMessage && <div className="confirmation-content">
                            <div className="confirmation-header">
                                <h3>Preferences Submitted Successfully</h3>
                            </div>
                            <div className="confirmation-text">
                                <p>Your team's project preferences have been submitted and will be considered during the project allocation process. </p>
                                <p>All team members can now view this submission through their Cornerstone account.</p>
                            </div>
                        </div>}

                    </div>
                </div>}

                {/* help window */}
                {showHelp && <div className="help-window">
                    <div className="help-content">
                        <div className="help-header">
                            <h1>How to Select Your Preferences</h1>
                        </div>
                        <div className="help-text">
                            <p>1. On the right hand side of the page there are 5 buttons numbid_endred from 1 to 5, with 1 at the top and 5 at the bottom.</p>
                            <p>2. To select your preference click on the button that corresponds to the position you would like to rank the project.</p>
                            <p>3. After clicking on the button go to the left hand side of the page and click on which project you would like to bid_end ranked in that position.</p>
                            <p>4. Repeat this process until you have five projects selected.</p>
                            <p>5. Once you have selected your five ranked preferences projects scroll down to click the submit button.</p>
                        </div>
                    </div>
                </div>}
                
            </div>}
        </main>
    )};

 export default ProjectPreferences;
