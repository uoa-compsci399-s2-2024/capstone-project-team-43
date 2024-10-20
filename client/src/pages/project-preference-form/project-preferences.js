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
    
    const [selectingProject, setSelectingProject] = useState(1);

    const [choice, setChoice] = useState([null, null, null, null, null]);

    const tooltipFormat = {
        1: 'first',
        2: 'second',
        3: 'third',
        4: 'fourth',
        5: 'fifth',
    };

    const buttonFormat = {
        1: '1st',
        2: '2nd',
        3: '3rd',
        4: '4th',
        5: '5th',
    };

    
    const handleGoBack = () => {
        setShowForm(true)
        setShowConfirmation(false)
        setChosenProjects([]);
    };

    const handleSuccess = () => {
        setShowSuccessMessage(true)
    };

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
                const currentData = data.filter(project => project.semester_id === 2);
                console.log('current data:',currentData);

                const availableData = currentData.filter(project => project.status === 'accepted');
                console.log('available data:', availableData);

                setProjects(availableData);
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



    // handles form submission 
    const handleConfirmation =() =>{
        if(document.getElementById("agreeupon").checked === true) {

        
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

    const handleSubmit = () =>{
        // only continue if all 5 preference containers have been filled
        if (choice.every(value => value !== null)){
            setShowForm(false);
            setShowHelp(false);
            setShowConfirmation(true);
            console.log('chosen:',choice);
        }
        return; 

        // move to confirmation page
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


    const handleSelect = (project) => {
        const updatedChoice = [...choice];
        updatedChoice[(selectingProject - 1)] = project;
        setChoice(updatedChoice);
        const nextProject = updatedChoice.findIndex(choice => choice === null);
        setSelectingProject(nextProject+1);
    }

    const handleDeselect = (index) => {
        const updatedChoice = [...choice];
        updatedChoice[index] = null;
        setChoice(updatedChoice);
        const nextProject = updatedChoice.findIndex(choice => choice === null);
        setSelectingProject(nextProject+1);
    }


    return(
        <main className="project-preferences-page">
            {projects && <div className="content">
                <div className="page-heading">
                    <h1>Project Preferences Form</h1>
                </div>

                {/* display form if bidding open */}
                {(showForm && biddingOpen) && <div className="page-content">
                    <div className="pref-container">

                        <div className={`projects-display-wrapper ${choice.every(value => value !== null) ? 'all-selected':''}`}>
                        <h2 className="preferences-tooltip">{tooltipFormat[selectingProject] ? `Select your ${tooltipFormat[selectingProject]} choice`:(null)}</h2>

                            <div className="pref-projects-container">
                                {/* display published projects */}
                                {projects
                                // .filter(project => project.published === 'true')
                                .map(project => (
                                    (<div className= {`full-project-wrapper ${choice.every(value => value !== null) ? 'all-selected':''}`} key={project.id} onClick={() => handleSelect(project)} id="proj">
                                        <Project 
                                        projectId={project.id} 
                                        view = 'preferences'
                                        expanded={false} 
                                        />   
                                    </div>)))}
                            </div>
                        </div>
                        {/* preference number containers */}
                        <div className={`preferences-display-wrapper ${choice.every(value => value !== null) ? 'all-selected':''}`} >
                            
                                {choice.map((choiceNum, index) =>(
                                    <div className= {`pref-button-wrapper 
                                                    ${choiceNum ? 'selected':'not-selected'}  
                                                    ${selectingProject===(index+1) ? 'selecting':'not-selecting'} 
                                                    ${choice.every(value => value !== null) ? 'all-selected':''}`} 
                                        id="sidebuttons">
                                        <div className="pref-number">
                                            <p>{buttonFormat[index+1]}</p>
                                        </div>

                                        <button className={`pref-button`}>
                                            {choiceNum && <p className="choice-title">{`${choiceNum.project_number}. ${choiceNum.title}`}</p>}
                                        </button>
                                        <div className="cancel-button-wrapper">
                                            <button onClick={()=>{handleDeselect(index)}} className="cancel-button">
                                               <img src={require('../../media/cancel-icon.png')} alt="Remove Selection" />
                                            </button>
                                        </div>

                                    </div>
                                ))}
                            <button className={`submit-pref-button ${choice.every(value => value !== null) ? 'ready':'not-ready'}`} onClick={handleSubmit}>Submit Preferences</button>  
                                {/* Submit form button */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>}
                {(showConfirmation && !showSuccessMessage) && <div className="page-content">
                    <div className="success-message confirmation-window">
                        <div className="confirmation-content first">
                            <div className="confirmation-header">
                                <p>Confirm Your Preferences</p>
                            </div>
                            <div className="confirmation-projects">
                                {choice.map(project => (
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
                        </div>
                    </div>
                </div>}
                {showSuccessMessage && <div className="page-content">
                    <div className="success-message confirmation-window ">
                    <div className="confirmation-content final">
                    <div className="confirmation-header">
                        <p>Success</p>
                    </div>
                    <div className="confirmation-text">
                        <p>Your team's project preferences have been submitted and will be considered during the project allocation process. </p>
                    </div>
                </div>
                </div>
                </div>}

                {/* help window */}
                {/* {showHelp && <div className="help-window">
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
                </div>} */}
                
            </div>}
        </main>
    )};

 export default ProjectPreferences;
