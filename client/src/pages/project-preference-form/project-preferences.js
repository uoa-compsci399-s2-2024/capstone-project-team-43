import React, { Component, useRef } from "react";
import './project-preferences.css';
import { Link } from "react-router-dom";
import Project from "../../components/project/project.js";
import { useState, useEffect } from "react";
import { fetchProjects, fetchSemesters, updatePreferences, fetchUser, fetchPreferences, deletePreferences } from '../../Api.js'
import { useParams, useNavigate } from 'react-router-dom';
import { getUserID } from "../../utils/auth.js";
import { formatDatetime } from "../../utils/format-date.js";
import Container from "../../components/container.js";
import { ReactComponent as QuitIcon } from '../../media/quit.svg';

const ProjectPreferences = ()=>{
    const [currentSemester, setCurrentSemester] = useState(null);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectableProjects, setSelectableProjects] = useState([]);

    const [checkedConfirmation, setCheckedConfirmation] = useState(null);

    // const [chosenProjects, setChosenProjects] = useState([]);
    const [existingPreferences, setExistingPreferences] = useState([]);


    const [biddingStarted, setBiddingStarted] = useState(false);
    const [biddingEnded, setBiddingEnded] = useState(false);
    const [biddingOpen, setBiddingOpen] = useState(false); // if biddingStarted and !biddingEnded

    const [showForm, setShowForm] = useState(true);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    const [selectingProject, setSelectingProject] = useState(1); // tracks which preference (1 to 5) user is selecting
    const [selectedProjects, setSelectedProjects] = useState([null, null, null, null, null]); // user's preferences

    const allPreferencesSelected = selectedProjects.every(pref => pref !== null);

    const MINUTE_MS = 60000;

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
    };

    const handleSuccess = () => {
        setShowSuccessMessage(true)
    };

    // get user's id
    useEffect(() => {
        setLoading(true);
        const fetchUserId = async () => {
            console.log("getting user id");
            const id = await getUserID(); 
            console.log("user id:", id);
            setUserId(id);
        };
        fetchUserId(); 
        setLoading(false);
    }, []);

    // Get user data
    useEffect(() => {
        setLoading(true);
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
        setLoading(false);
    }, [userId]);

    
    // Get team's preferences
    useEffect(() => {
        setLoading(true);
        if (user) {
            async function getPreferences() {
                try {
                    const data = await fetchPreferences();
                    const teamData = data.filter(preference => preference.team_id === user.team_id)
                    console.log('Fetched existing preferences:', teamData); 
                    setExistingPreferences(teamData);
                } catch (error) {
                    console.error('Failed to load existing preferences:', error);
                }
            }
            getPreferences();
        }
        setLoading(false);
    }, [userId]);
        
    // get all published projects 
    useEffect(() => {
        setLoading(true);
        async function getProjects() {
            try {
                console.log('getting projects')
                const data = await fetchProjects();
                const publishedProjects = data.filter(project => project.published === 'true');
                setProjects(publishedProjects);
                console.log('showing projects:',publishedProjects);

            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjects();
        setLoading(false);
    }, []);

    // get current semester 
    useEffect(() => {
        setLoading(true);
        console.log('FETCHING SEMESTERS')
        async function getSemesters() {
            try {
                const data = await fetchSemesters();
                console.log('Fetched semester data', data);  
                setCurrentSemester(data.find(data => data.status === 'current'));                       
            } catch (error) {
                console.error('Failed to load semester:', error);
                return; 
            }
        }
        getSemesters();
        setLoading(false);
    }, []);


    // ensure form only available if bidding is open
    useEffect(() => {
        setLoading(true);
            if (currentSemester) {
                async function checkFormAvailability () {
                
                console.log('checking if bidding open');
                // recheck availability every minute
                const interval = setInterval(() => {
                    console.log('Logging every minute');
                }, MINUTE_MS);
        
                const currentDatetime = formatDatetime(new Date()); //current date
                console.log('current:',currentDatetime);
                console.log('start',formatDatetime(currentSemester.start_bidding_date));
                console.log('end',formatDatetime(currentSemester.end_bidding_date))
                const hasStarted = currentDatetime >= formatDatetime(currentSemester.start_bidding_date);
                const hasEnded = !formatDatetime(currentSemester.end_bidding_date) >= currentDatetime;
                setBiddingStarted(hasStarted);
                setBiddingEnded(hasEnded);

                setBiddingOpen(hasStarted && !hasEnded);
                console.log('BIDDING STARTED ? ',hasStarted);
                console.log('BIDDING ENDED ? ',hasEnded);
                console.log('BIDDING OPEN ? ',hasStarted && !hasEnded);

                // clear interval on unmount
                setLoading(false);
                return () => clearInterval(interval); 
            }
            checkFormAvailability();
        }
    }, [currentSemester]);

    // handles form submission 
    const handleConfirmation =() =>{
        // update preferences in database if user's checked the confirmation
        if (document.getElementById("agreeupon").checked) {
            let team = user.team_id;

            // delete any pre-existing preferences for the user's team
            for (let i = 0; i < existingPreferences.length; i++){
                console.log("deleting existing preference ",i);
                deletePreferences(existingPreferences[i].id);
            };
            console.log('finished deleting existing prefs');

            // save new preferences into database
            console.log('saving new preferences to db');
            for (let i = 0; i < selectedProjects.length; i++){
                let proj = selectedProjects[i].id;
                let pref = i+1;
                updatePreferences(team, proj, pref);
            };
            console.log('finished');
            setShowForm(false);
            setShowSuccessMessage(true);
            // setShowConfirmation(false);

        }
        else {
            // currently doesn't do anything - should pop up with reminder to check confirmation 
            setShowConfirmationPopUp(true);
        }
    }

    const handleSubmit = () =>{
        // only continue if all 5 preference containers have been filled
        if (selectedProjects.every(value => value !== null)){
            // setShowForm(false);
            setShowConfirmation(true);
            console.log('chosen:',selectedProjects);
        }
        return; 
    }

    const checkConfirmation = () => {
        if (document.getElementById("agreeupon").checked) {
            setShowConfirmationPopUp(false);    
            setCheckedConfirmation(true);    
        }
        else {
            // setShowConfirmationPopUp(true);
            setCheckedConfirmation(false);  
        }   
    };

    // handles new project selected for a specific preference number
    const handleSelect = (project) => {
        // add to user's selected projects
        const updatedSelectedProjects = [...selectedProjects]; 
        updatedSelectedProjects[(selectingProject - 1)] = project; 
        setSelectedProjects(updatedSelectedProjects); 

        // go to next project to select
        const nextProject = updatedSelectedProjects.findIndex(selectedProjects => selectedProjects === null);
        setSelectingProject(nextProject+1);
    }

    const handleDeselect = (index) => {
        // remove from user's selected projects
        const updatedSelectedProjects = [...selectedProjects];
        updatedSelectedProjects[index] = null;
        setSelectedProjects(updatedSelectedProjects);


        // go to next preference selection
        const nextProject = updatedSelectedProjects.findIndex(selectedProjects => selectedProjects === null);
        setSelectingProject(nextProject+1);
    }


    return(
        <main className="project-preferences-page">
            {(!loading && currentSemester) && <div className="content">
                <div className="page-heading">
                    <h1>Project Preferences Form</h1>
                </div>
                {(showForm && !biddingStarted)&& 
                    <div className="page-content text-page">
                        <p>The Project Preferences form is currently locked.<br></br>Come back when the form opens on {formatDatetime(currentSemester.start_bidding_date)}.</p>
                        <Link to='/projects'>
                            <span className="create-link">View Available Projects</span>
                        </Link>
                    </div>}
                {(showForm && biddingEnded) && 
                <div className="page-content text-page">
                    <p>The Project Preferences form is no longer open.<br></br>You can view your team's submission on your dashboard.</p>
                    <Link to='/dashboard'>
                        <span className="create-link">Go to Dashboard</span>
                    </Link>
                </div>}
                {/* display form if bidding open */}
                {(showForm && biddingOpen) && <div className="page-content">
                    {!showConfirmation && <div className="pref-container">

                        <div className={`projects-display-wrapper`}>
                        <h2 className="preferences-tooltip">{tooltipFormat[selectingProject] ? `Select your ${tooltipFormat[selectingProject]} preference`:(null)}</h2>

                            <div className="pref-projects-container">
                                {/* display published projects */}
                                {projects.map(project => {
                                    const isSelected = selectedProjects.includes(project);
                                    const selectable = !isSelected && !allPreferencesSelected;
                            
                                    return (<div 
                                    className= {`full-project-wrapper ${selectable ? 'selectable':'unselectable'}`} 
                                    key={project.id} 
                                    onClick={selectable ? () => handleSelect(project): null} id="proj">
                                        <Project 
                                        projectId={project.id} 
                                        view = 'preferences'
                                        expanded={false} 
                                        />   
                                    </div>)})}
                            </div>
                        </div>
                        {/* preference number containers */}
                        <div className={`preferences-display-wrapper ${allPreferencesSelected ? 'all-selected':''}`} >
                            
                                {selectedProjects.map((selectedProjectsNum, index) =>(
                                    <div className= {`pref-button-wrapper 
                                                    ${selectedProjectsNum ? 'selected':'not-selected'}  
                                                    ${selectingProject===(index+1) ? 'selecting':'not-selecting'} 
                                                    ${selectedProjects.every(value => value !== null) ? 'all-selected':''}`} 
                                        id="sidebuttons">
                                        <div className="pref-number">
                                            <p>{buttonFormat[index+1]}</p>
                                        </div>

                                        <button className={`pref-button`}>
                                        
                                            {selectedProjectsNum && <p className="choice-title">{`${selectedProjectsNum.project_number}. ${selectedProjectsNum.title}`}</p>}

                                        </button>
                                        <div className="cancel-button-wrapper">
                                            <button onClick={()=>{handleDeselect(index)}} className="cancel-button">
                                                <QuitIcon className="quit-icon" />
                                            </button>
                                        </div>
                                        {/* <div className="cancel-button-wrapper">
                                            <button onClick={()=>{handleDeselect(index)}} className="cancel-button">
                                               <img src={require('../../media/cancel-icon.png')} alt="Remove Selection" />
                                            </button>
                                        </div> */}
                                        
                                    </div>
                                ))}
                            <button className={`submit-pref-button ${selectedProjects.every(value => value !== null) ? 'ready':'not-ready'}`} onClick={handleSubmit}>Submit Preferences</button>  
                        </div>
                    </div>}
                    {(showConfirmation && selectedProjects) && <div className="pref-container">
                        <div className="success-message confirmation-window">
                            <div className="confirmation-content projects">
                                <div className="confirmation-header">
                                    <p>Confirm Your Preferences</p>
                                </div>
                                <div className="confirmation-projects">
                                    {selectedProjects.map((project, index) => (
                                        (<div className="confirmation-project">
                                            <p className="proj-number">{buttonFormat[index+1]}</p>
                                            <div className="full-project-wrapper chosen-project" key={project.id} id="proj">
                                                <Project 
                                                projectId={project.id} 
                                                view = 'chosen'
                                                expanded={false} 
                                                />   
                                            </div>
                                        </div>)))}
                                </div>
                                <div className="confirmation-text">
                                    <span>Please note that this submission will count for your entire team and cause any previous submissions for your team to be deleted.</span>
                                </div>
                                <div className="confirmation-popup-wrapper">
                                    <div className="confirmation-checks">
                                            <input
                                                onChange={checkConfirmation}
                                                type="checkbox"
                                                id="agreeupon"
                                                name="agreeupon"
                                                value="y/n"
                                                required
                                            />
                                                                               
                                        <label htmlFor="agreeupon"> I confirm that all team members agree on the order of the projects provided above</label>
                                    </div>
                                </div>
                                <div className="confirmation-buttons">
                                    <div className= {`check-popup ${showConfirmationPopUp ? 'visible':'hidden'}`}>
                                        <p>Please check the confirmation before submitting your team preferences</p>
                                    </div>
                                    <button className={`confirm-button ${checkedConfirmation ? 'ready':'not-ready'}`} onClick={handleConfirmation}>Submit Team Preferences</button>
                                    <button className = 'redirect-button' onClick={handleGoBack}>Go Back</button>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>}
               
                {showSuccessMessage && <div className="page-content text-page">
                    <div className="success-message confirmation-window">
                        <div className="confirmation-content success">
                            <div className="confirmation-header">
                                <p>Success</p>
                            </div>
                            <div className="confirmation-text">
                                <p>Your team's project preferences have been submitted and will be considered during the project allocation process. </p> 
                            </div>
                            <Link to='/projects'>
                                    <span className="create-link">View Available Projects</span>
                            </Link>
                        </div>
                    </div>
                </div>}                
            </div>}
        </main>
    )
};

 export default ProjectPreferences;
