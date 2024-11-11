import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchSemester, deleteSemester, fetchSemesters, fetchUsersByRole, updateSemesterDetails, fetchTeamsBySemester, downloadCSV, downloadCSVTeams, fetchProjectsBySemester, fetchPreferences } from '../../Api.js';
import SemesterCSVUpload from '../../components/semester-csv-upload/semester-csv-upload.js';
import './manage-semester.css';
import SemesterDropdown from '../../components/semester-dropdown/semester-dropdown.js';

import { formatDate, formatDatetime, formatDateForInput, formatTimeForInput } from '../../utils/format-date.js';
import { downloadAllocation, downloadCSVClients, processAllocation, fetchAllocationData } from '../../Api.js';

const ManageSemester = () => {

    // gets semesterID from URL or from previous dropdown selection
    const { semesterID: semesterIDFromURL } = useParams();
    const navigate = useNavigate();
    // // defaults to current semester if no sem ID passed in 
    const [semesterID, setSemesterID] = useState(semesterIDFromURL || null);

    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);
    const [projects, setProjects] = useState([]);
    const [semester, setSemester] = useState(null);
    const [updatedSemester, setUpdatedSemester] = useState(null);

    // Control visibility of student/teams upload functionality
    const [showStudentUpload, setShowStudentUpload] = useState(false);
    const [showTeamUpload, setShowTeamUpload] = useState(false);
    const openStudentUpload = () => setShowStudentUpload(true);
    const openTeamUpload = () => setShowTeamUpload(true);
    const closeStudentUpload = () => setShowStudentUpload(false);
    const closeTeamUpload = () => setShowTeamUpload(false); 

    const [allocationComplete, setAllocationComplete] = useState(false);
    const [hours, setHours] = useState('');

    const [studentsUploadSuccess, setStudentsUploadSuccess] = useState(false);
    const [teamsUploadSuccess, setTeamsUploadSuccess] = useState(false);

    // Required headers for csv uploads
    const studentHeaders = ['Student name', 'Student ID', 'Student SIS ID', 'Email', 'Section name'];
    const teamHeaders = ['name', 'canvas_user_id', 'user_id', 'login_id', 'sections', 'group_name', 'canvas_group_id', 'group_id'];

    const [isEditingSemesterDates, setIsEditingSemesterDates] = useState(false);
    const [isEditingProposalDeadline, setIsEditingProposalDeadline] = useState(false);
    const [isEditingBiddingDates, setIsEditingBiddingDates] = useState(false);


    const [hasEditedSemesterDates, setHasEditedSemesterDates] = useState(false);
    const [hasEditedProposalDeadline, setHasEditedProposalDeadline] = useState(false);
    const [hasEditedBiddingDates, setHasEditedBiddingDates] = useState(false);

    const [showProcess, setShowProcess] = useState(false);
    
    const [biddingStarted, setBiddingStarted] = useState(false);
    const [biddingEnded, setBiddingEnded] = useState(false);
    const [biddingOpen, setBiddingOpen] = useState(false); 

    const [bidsSubmitted, setBidsSubmitted] = useState(null); 

    const MINUTE_MS = 60000;

    const [isCurrent, setIsCurrent] = useState(null);
    const [isRetired, setIsRetired] = useState(null);
    const [isUpcoming, setIsUpcoming] = useState(null);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const deletePopupRef = useRef(null);

    // if needed, scroll delete confirmation window into view
    useEffect(() => {
        if (showDeleteConfirmation && deletePopupRef.current) {
            deletePopupRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showDeleteConfirmation]);

    // Function calls backend API to create a CSV structure of all students in database and downloads in browser
    const studentDownload = () => {
        downloadCSV();
    }


    const teamDownload = () => {
        console.log("Fetching teams from semester with ID: ", semesterID);
        downloadCSVTeams(semesterID);
    }

    const allocationDownload = () => {
        console.log("Fetching allocation results");
        downloadAllocation();
    }

    const handleProcessAllocation = (e) => {
        e.preventDefault();
        processAllocation(hours);
        setAllocationComplete(true);
    }

    const CSVclients = () => {
        console.log("downloading client data");
        downloadCSVClients(semester.id);
    }

    const handleHoursChange = (event) => {
        setHours(event.target.value);
      };
      

    // ensure form only available if bidding is open
    useEffect(() => {
            if (semester) {
                async function checkFormAvailability () {
                
                const interval = setInterval(() => {
                }, MINUTE_MS);
        
                const currentDatetime = formatDatetime(new Date()); 
                const hasStarted = currentDatetime >= formatDatetime(semester.start_bidding_date);
                const hasEnded = !formatDatetime(semester.end_bidding_date) >= currentDatetime;

                setBiddingStarted(hasStarted);
                setBiddingEnded(hasEnded);

                setBiddingOpen(hasStarted && !hasEnded);
                return () => clearInterval(interval); 
            }
            checkFormAvailability();
        }
    }, [semester]);

    // get number of teams that have submitted preferences
    useEffect(() => {
        // setLoading(true);
            if (biddingOpen || biddingEnded) {
                const getPreferences = async () => {
                    try {
                        console.log('getting preferences');
                        const data = await fetchPreferences();

                        const teamIds = data.map(preference => preference.teamid);
                        const uniqueTeamIds = new Set(teamIds);
                        const uniqueCount = uniqueTeamIds.size;
                        setBidsSubmitted(uniqueCount);
                        

                    } catch (error) {
                        console.error('Failed to load projects:', error);
                    }
                }
                getPreferences();
        }
    }, [biddingOpen, biddingEnded]);

    // Get semester data from server
    useEffect(() => {
        console.log('getting semester data');
    
        const getSemester = async () => {
            try {
                const semesters = await fetchSemesters();
                console.log('Fetched all semesters:', semesters);
    
                let defaultSemester = null;
    
                // Try to find the current semester
                const currentSemester = semesters.find(semester => semester.status === 'current');
    
                if (currentSemester) {
                    defaultSemester = currentSemester;
                    console.log('Found current semester:', currentSemester);
                } else {
                    // Otherwise try to find the soonest upcoming semester
                    const upcomingSemesters = semesters.filter(semester => new Date(semester.start_date) > new Date());
                    
                    if (upcomingSemesters.length > 0) {
                        defaultSemester = upcomingSemesters.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))[0];
                        console.log('No current semester, found upcoming semester:', defaultSemester);
                    } else {
                        // Otherwise find the most recent retired semester
                        const retiredSemesters = semesters.filter(semester => new Date(semester.end_date) < new Date());
                        
                        if (retiredSemesters.length > 0) {
                            defaultSemester = retiredSemesters.sort((a, b) => new Date(b.end_date) - new Date(a.end_date))[0];
                            console.log('No current or upcoming semester, using most recent past semester:', defaultSemester);
                        }
                    }
                }
    
                if (defaultSemester) {
                    setSemester(defaultSemester);
                    setUpdatedSemester(defaultSemester);
                    setSemesterID(defaultSemester.id);
                    setIsCurrent(defaultSemester.status==='current');
                    setIsRetired(defaultSemester.status==='retired');
                    setIsUpcoming(defaultSemester.status==='upcoming');
                    console.log('Default semester set with ID:', defaultSemester.id);
                }
    
            } catch (error) {
                console.error('Failed to load semesters:', error);
            }
        };
    
        // If semesterID is provided, fetch the specific semester, otherwise, fetch the default semester
        if (semesterID) {
            const fetchSpecificSemester = async () => {
                try {
                    const data = await fetchSemester(semesterID);
                    setUpdatedSemester(data);
                    setSemester(data);
                    setIsCurrent(data.status==='current');
                    setIsRetired(data.status==='retired');
                    setIsUpcoming(data.status==='upcoming');
                    console.log('Fetched specific semester data:', data);
                } catch (error) {
                    console.error('Failed to load specific semester:', error);
                }
            };
            fetchSpecificSemester();
        } else {
            getSemester();
        }
    }, [semesterID]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const data = await fetchProjectsBySemester(semesterID);
                setProjects(data);
                console.log('fetched projects:',data);
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjects();
    },[semesterID]);


    // Get semester's students 
    useEffect(() => {
            async function getStudents() {
                try {
                    const data = await fetchUsersByRole('student');
                    setStudents(data);
                    console.log('Fetched students:', data);
                    setStudentsUploadSuccess(false);
                } catch (error) {
                    console.error('Failed to load students:', error);
                }
            }
            getStudents();
    }, [studentsUploadSuccess]);

    // Get semester's teams
    useEffect(() => {
        async function getTeams() {
            try {
                const data = await fetchTeamsBySemester(semesterID);
                setTeams(data);
                setTeamsUploadSuccess(false);
            } catch (error) {
                console.error('Failed to load teams:', error);
            }
        }
        getTeams();
    }, [teamsUploadSuccess]);

    // handles semester selection in dropdown menu
    const handleSemesterSelect = (selectedSemesterID) => {
        // set new semester to manage
        setSemesterID(selectedSemesterID);
        // update URL without reloading page
        navigate(`/manage/semester/${selectedSemesterID}`, { replace: true });
    };

    // handle semester deletion
const handleDeleteSemester = async () => {
    try {
        const response = await deleteSemester(semesterID);
        setShowDeleteSuccess(true);
        setSemesterID(null);
    } catch (error) {
        console.error('Failed to delete semester:', error);
    } finally {
        setShowDeleteConfirmation(false);
    }
};
    
    // Handle saving edit changes
    const handleSaveChanges = async (editingFields, setIsEditingFalse) => {    
        for (let i = 0; i < editingFields.length; i++) {
            let field = editingFields[i];
            let newValue = null; 

            // concatenate date and time inputs if editing bidding timeframe
            if (field === 'start_bidding_date' ||  field === 'end_bidding_date') {
                let newDate = document.getElementById(`${field}_date`).value;
                let newTime = document.getElementById(`${field}_time`).value;

                newValue = `${newDate}T${newTime}`;

                if (newValue !== (semester[field])) {
                    await updateSemesterDetails(semesterID, field, newValue);

                    // update details on page immediately
                    setUpdatedSemester((prevSemester) => {
                        const updatedSemester = { ...prevSemester };
                        updatedSemester[field] = newValue;
                        return updatedSemester;
                    });
                }

            }
            // otherwise update using single input value
            else {
                newValue = document.getElementById(field).value;
                if (newValue !== semester[field]) {
                    await updateSemesterDetails(semesterID, field, newValue);

                     // update details on page immediately
                    setUpdatedSemester((prevSemester) => {
                        const updatedSemester = { ...prevSemester };
                        updatedSemester[field] = newValue;
                        return updatedSemester; 
                    });
                }
                
            }
        }
        setIsEditingFalse();
    } 
    const pendingProjects = projects.filter(project => project.status === 'pending');
    const acceptedProjects = projects.filter(project => project.status === 'accepted');
    const rejectedProjects = projects.filter(project => project.status === 'rejected');
    const publishedProjects = projects.filter(project => project.status === 'published');

    return (
        <main className='manage-semester-page'>
            {/* display semester page content */}
            {(semester && !showDeleteSuccess) && <div className='content'>
                <div className='page-heading'>
                        <h1>Manage Semesters</h1>
                    <div className='page-subheading semester-subheading'>
                        <h2 className='page-subheading'>{semester.name}</h2>
                        <SemesterDropdown onSelectSemester={handleSemesterSelect}/>
                    </div>
                </div>
                <div className={`page-content ${isCurrent ? 'active':'inactive'}`}>
                    {semester.status=== 'retired' && <div className='disclaimer-wrapper'>
                        <p className='disclaimer'>This semester has ended, so it has been retired and management options are limited.<br></br>You can still update the semester's end date if you wish to recover it.</p>
                    </div>}
                    {semester.status=== 'upcoming' && <div className='disclaimer-wrapper'>
                        <p className='disclaimer'>This semester hasn't started yet, so management options are limited.</p>
                    </div>}
                    <div className='content-sections-container dates'>
                        <h3>Dates and Deadlines</h3>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Semester Dates</h4>
                            </div>
                                   
                            {isEditingSemesterDates ? (
                                <div className='content-section-text'>
                                    <p> 
                                        The semester {isRetired ? 'started' : 'starts'} on 
                                        <input className={`edit-input ${hasEditedProposalDeadline ? 'edited':'not-edited'}`}
                                            type="date"
                                            id='start_date'
                                            onChange={() => setHasEditedSemesterDates(true)}
                                            // defaultValue={updatedSemester.start_date.substring(0, 10)}
                                            defaultValue={formatDateForInput(updatedSemester.start_date)}
                                        /> 
                                        and {isRetired ? 'ended' : 'ends'} on
                                        <input className={`edit-input ${hasEditedProposalDeadline ? 'edited':'not-edited'}`}
                                            type="date"
                                            id='end_date'
                                            onChange={() => setHasEditedSemesterDates(true)}
                                            defaultValue={formatDateForInput(updatedSemester.end_date)}
                                        />.
                                    </p>
                                </div>
                                ) : (
                                <div className='content-section-text'>
                                    <p>The semester  {isRetired ? 'started' : 'starts'} on {formatDate(updatedSemester.start_date)} and {isRetired ? 'ended' : 'ends'}  on {formatDate(updatedSemester.end_date)}.</p>
                                </div>
                                )}
                            {isEditingSemesterDates ? (
                                <div className='content-button-container'>
                                    <button onClick = {() => handleSaveChanges(['start_date','end_date'], () => setIsEditingSemesterDates(false))} className={`upload-button save ${hasEditedSemesterDates ? 'ready':'not-ready'}`}>
                                        Save Changes 
                                    </button>
                                    <button onClick = {() => {setIsEditingSemesterDates(false); setHasEditedSemesterDates(false)}} className='upload-button'>
                                        Cancel
                                    </button>
                                </div>
                                ) : (
                                <div className='content-button-container'>
                                    <button onClick = {() => setIsEditingSemesterDates(true)} className='upload-button'>
                                    Edit Semester Dates
                                    </button>
                                </div>

                                )}
                        </div>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Project Proposal Deadline</h4>
                            </div>
                            {isEditingProposalDeadline ? (
                                <div className='content-section-text'>
                                    <p> 
                                        The Project Proposal Form {isRetired ? 'notified clients': (!isUpcoming ? 'notifies clients' : 'will notify clients')} that any submissions after
                                        <input className={`edit-input ${hasEditedProposalDeadline ? 'edited':'not-edited'}`}
                                            type="date"
                                            id='proposal_deadline'
                                            onChange={() => setHasEditedProposalDeadline(true)}
                                            defaultValue={formatDateForInput(updatedSemester.proposal_deadline)}
                                        /> 
                                        will only be considered for future semesters.
                                    </p>
                                </div>
                                ) : (
                                <div className='content-section-text'>
                                    <p>The Project Proposal Form {isRetired ? 'notified clients': (!isUpcoming ? 'notifies clients' : 'will notify clients')} that any submissions after {formatDate(updatedSemester.proposal_deadline)} will only be considered for future semesters.</p>
                                </div>
                                )}
                            {isEditingProposalDeadline ? (
                                <div className='content-button-container'>
                                    <button onClick = {() => handleSaveChanges(['proposal_deadline'], () => setIsEditingProposalDeadline(false))} className={`upload-button save ${hasEditedProposalDeadline ? 'ready':'not-ready'}`}>
                                        Save Changes 
                                    </button>
                                    <button onClick = {() => {setIsEditingProposalDeadline(false); setHasEditedProposalDeadline(false)}} className='upload-button'>
                                        Cancel
                                    </button>
                                </div>
                                ) : (
                                <div className='content-button-container'>
                                    <button onClick = {() => setIsEditingProposalDeadline(true)} className='upload-button'>
                                    Edit Project Proposal Deadline
                                    </button>
                                </div>

                                )}
                        </div>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Project Bidding Timeframe</h4>
                            </div>
                            {isEditingBiddingDates ? (
                                <div className='content-section-text'>
                                    <p> 
                                        Students can access and submit their project preferences from 
                                        <input className='edit-input'
                                            type="date"
                                            id='start_bidding_date_date'
                                            onChange={() => setHasEditedBiddingDates(true)}
                                            defaultValue={formatDateForInput(updatedSemester.start_bidding_date)} 
                                        /> 
                                        <input className='edit-input'
                                            type="time"
                                            id='start_bidding_date_time'
                                            onChange={() => setHasEditedBiddingDates(true)}
                                            defaultValue={formatTimeForInput(updatedSemester.start_bidding_date)}
                                        /> 
                                        to
                                        <input className='edit-input'
                                            type="date"
                                            id='end_bidding_date_date'
                                            onChange={() => setHasEditedBiddingDates(true)}
                                            defaultValue={formatDateForInput(updatedSemester.end_bidding_date)}
                                        /> 
                                        <input className='edit-input'
                                            type="time"
                                            id='end_bidding_date_time'
                                            onChange={() => setHasEditedBiddingDates(true)}
                                            defaultValue={formatTimeForInput(updatedSemester.end_bidding_date)}
                                        />.
                                    </p>
                                </div>
                                ) : (
                                <div className='content-section-text'>
                                    <p>Students can access and submit their project preferences from {formatDatetime(updatedSemester.start_bidding_date)} to {formatDatetime(updatedSemester.end_bidding_date)}.</p>
                                </div>
                                )}
                            {isEditingBiddingDates? (
                                <div className='content-button-container'>
                                    <button onClick = {() => handleSaveChanges(['start_bidding_date','end_bidding_date'], () => setIsEditingBiddingDates(false))} className={`upload-button save ${hasEditedBiddingDates ? 'ready':'not-ready'}`}>
                                        Save Changes 
                                    </button>
                                    <button onClick = {() => {setIsEditingBiddingDates(false); setHasEditedBiddingDates(false)}} className='upload-button'>
                                        Cancel
                                    </button>
                                </div>
                                ) : (
                                <div className='content-button-container'>
                                    <button onClick = {() => setIsEditingBiddingDates(true)} className='upload-button'>
                                    Edit Project Bidding Timeframe
                                    </button>
                                </div>

                                )}
                        </div>
                    </div>
                    <div className='content-sections-container students'>
                        <h3>Students and Teams</h3>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Students</h4>
                            </div>
                            <div className='content-section-text'>
                                        {(isCurrent && students.length > 0) ? (
                                            <p>Student data has been uploaded. <br></br>{students.length} student{students.length !== 1 ? 's are' : ' is'} registered for this semester.</p>)
                                        :(<p>Student data has not been uploaded.</p>)}
                            </div>
                            {!showStudentUpload && <div className='button-container'>
                                <button className='upload-button' onClick={isCurrent ? openStudentUpload:null}>
                                    {isCurrent && students.length >= 1 ? 'Reupload' : 'Upload'} Student Data
                                </button>
                            </div>}
                            {showStudentUpload && (
                                <div className='pop-up'>
                                    <div className='pop-up-header'>
                                        <h3>Upload Student Data</h3>
                                    </div>
                                    <div className='pop-up-text'>
                                        <p>File must be a CSV with headers {studentHeaders.join(', ')}</p>
                                        <p className='warning'>Warning: Reuploading student data will remove the already existing students from the system. This cannot be undone.</p>
                                    </div>
                                    <SemesterCSVUpload semesterID={semesterID} fileContent='students' onSuccess={() => {setStudentsUploadSuccess(true)}} />
                                </div>
                            )}
                        </div>
                        <div className='content-section'>
                                <div className='content-section-heading'>
                                    <h4>Teams</h4>
                                </div>
                                <div className='content-section-text'>
                                        {(isCurrent && teams.length > 0) ? (
                                            <p>Team data has been uploaded. <br></br>{teams.length} team{teams.length !== 1 ? 's are' : ' is'} currently registered for this semester</p>
                                        ):(
                                            <p>Team data has not been uploaded.</p>
                                        )}
                                        
                                </div>
                                {!showTeamUpload && <div className='button-container'>
                                    <button className='upload-button' onClick={isCurrent ? openTeamUpload:null}>
                                        {(isCurrent && teams.length >= 1) ? 'Reupload' : 'Upload'} Team Data
                                    </button>

                                    {(isCurrent && teams.length >= 1) && <button className='upload-button' onClick={teamDownload}>
                                        Download Team Data
                                    </button>}
                                </div>}
                                {showTeamUpload && (
                                <div className='pop-up'>
                                    <div className='pop-up-header'>
                                        <h3>Upload Team Data</h3>
                                        {/* <button className='quit-button' onClick={closeTeamUpload}></button> */}
                                    </div>
                                    <div className='pop-up-text'>
                                        <p>File must be a CSV with headers {teamHeaders.join(', ')}</p>
                                        <p className='warning'>Warning: Reuploading team data will remove the already existing teams from the system. This cannot be undone.</p>
                                    </div>
                                    <SemesterCSVUpload semesterID={semesterID} fileContent='teams'  onSuccess={() => {setTeamsUploadSuccess(true)}}/>
                                </div>
                                )}   
                        </div>
                    </div>
                    <div className='content-sections-container projects'>
                        <h3>Projects</h3>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Proposals</h4>
                            </div>
                            {(isCurrent && projects.length > 0) ? (<div className='content-section-text'> 
                                {pendingProjects.length > 0 ? (
                                    <p>{pendingProjects.length} project proposal{pendingProjects.length > 1 ? 's' : ''} awaiting approval.</p>
                                ) : (
                                    <p>All project proposals have been sorted.</p>
                                )}

                                {acceptedProjects.length > 0 ? (
                                    <p>
                                        {acceptedProjects.length} project proposal
                                        {acceptedProjects.length > 1 ? 's have' : ' has'} been approved
                                        {rejectedProjects.length > 0 ? `, and ${rejectedProjects.length} project proposal${rejectedProjects.length > 1 ? 's have' : ' has'} been rejected.` : ', and none have been rejected.'}
                                    </p>
                                ) : (
                                    <p>No project proposals have been approved.</p>
                                )}
                                
                                <p>{publishedProjects[0]}</p>

                                {publishedProjects.length > 0 ? (
                                    <p>Approved projects have been published and are visible to students.</p>
                                ) : (
                                    <p>Approved projects have not been published yet so are not visible to students.</p>
                                )}
                            </div>
                            ) : (
                            <div className='content-section-text'> 
                                <p>No project proposals have been submitted for this semester yet.</p>
                            </div>)}
                            <div className='content-button-container'>
                                <button className='upload-button' onClick={isCurrent ? () => navigate('/projects/manage'):null}>
                                    Go to Manage Projects 
                                </button>
                            </div>
                        </div>
                        {/* <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Team Preferences</h4>
                            </div>
                            {biddingOpen ? (
                                <div className='content-section-text processing'>
                                    <p>{`Teams are not able to submit their project preferences yet.`}<br></br>
                                    
                                        {`${bidsSubmitted === 0 
                                            ? 'No teams have' 
                                            : `${bidsSubmitted} ${bidsSubmitted === 1 ? 'team has' : 'teams have'}`} already submitted their preferences.`}
                                    </p>
                                </div>
                                ) : (
                                <div className='content-section-text processing'>
                                    {biddingEnded ? (
                                    <p>{`Teams are no longer able to submit their project preferences.`}<br></br>
                                    {`${bidsSubmitted === 0 
                                        ? 'No teams' 
                                        : `${bidsSubmitted} ${bidsSubmitted === 1 ? 'team' : 'teams'}`} submitted their preferences.`}
                                    </p>
                                    ):(
                                        <p>Teams are not able to submit their project preferences yet.</p>
                                    )}
                                </div>)}
                            {showProcess ? (
                                 <div className='content-button-container'>
                                    <button className={`upload-button process ${0 > 0 ? 'available' : 'unavailable'}}`} onClick={handleProcessAllocation} >
                                        View Submitted Preferences
                                    </button>
                                    <button type="submit" onClick={()=>setShowProcess(false)} className='upload-button' >
                                         Cancel
                                    </button>
                                    
                                    {allocationComplete && 
                                    <button className='upload-button' onClick={allocationDownload}>
                                            Download Results
                                    </button>}
                                </div>
                                ) : (
                                <div className='content-button-container'>
                                    <button 
                                        className={`upload-button ${bidsSubmitted > 0 ? 'available' : 'unavailable'}`} 
                                        onClick={() => bidsSubmitted > 0 ? setShowProcess(true):null}>
                                        View Submitted Preferences
                                    </button>
                                </div>
                                )}
                        </div> */}
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Project Allocation</h4>
                            </div>
                            {showProcess ? (
                                <div className='content-section-text processing'>
                                    <p>Enter maximum number of available hours per week:</p><input className='edit-input max' type="number" onChange={handleHoursChange} defaultValue={10}></input>
                                </div>
                                ) : (
                                <div className='content-section-text'>
                                    
                                </div>)}
                            {(isCurrent && showProcess) ? (
                                 <div className='content-button-container'>
                                    <button className='upload-button process' onClick={handleProcessAllocation} >
                                         Process Allocation
                                    </button>
                                    <button type="submit" onClick={()=>setShowProcess(false)} className='upload-button' >
                                         Cancel
                                    </button>
                                    
                                    {allocationComplete && 
                                    <button className='upload-button' onClick={allocationDownload}>
                                            Download Results
                                    </button>}
                                    {/* {allocationComplete && 
                                    <button className='upload-button' onClick={handleViewAllocation}>
                                            View Results
                                    </button>} */}
                                </div>
                                ) : (
                                <div className='content-button-container'>
                                    <button className='upload-button' onClick={isCurrent ? () => setShowProcess(true):null}>
                                        Process Project Allocation
                                    </button>
                                    
                                </div>
                                )}
                        </div>
                    </div>
                    {/* display option to delete semester */}
                    <div className='delete-wrapper'>
                        {showDeleteConfirmation && 
                            <div className='delete-warning-popup' ref={deletePopupRef}>
                                <p className='warning-heading'>
                                    Are you sure you want to delete this semester?
                                </p>
                                <p className='warning-text'>
                                    Deleting this semester means you will no longer be able to view it through the Your Semesters, Project Archive, or Manage Semester pages. This cannot be undone.
                                    <br></br><br></br>
                                    Any projects associated with this semester will remain visible through the project archive.
                                </p>
                                <div className='delete-button-wrapper'>
                                    <button className='confirm-delete' onClick={handleDeleteSemester}>
                                        Confirm Delete Semester
                                    </button>
                                    <button className='cancel-delete' onClick={() => setShowDeleteConfirmation(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>}
                        {!showDeleteConfirmation &&
                        <div className='delete-button-wrapper'>
                            <button onClick={() => setShowDeleteConfirmation(true)}>
                                Delete Semester
                            </button>
                        </div>}
                    </div>
                </div>
            </div>}

            {/* display link to create a semester if none in database */}
            {!semester && <div className='content'>
                <div className='page-heading'>
                        <h1>Manage Semesters</h1>
                </div>
                <div className='page-content'>
                    <p>No current or upcoming semesters.</p>
                    <Link to='/create/semester'>
                        <span className='create-link'>Create New Semester</span>
                    </Link>
                </div>
            </div>}

            {/* display link to semester menu if the semester has just been deleted */}
            {(semester && showDeleteSuccess) && <div className='content'>
                <div className='page-heading'>
                        <h1>Manage Semesters</h1>
                </div>
                <div className='page-content'>
                    <p>Semester Deleted</p>
                    <Link to='/dashboard'>
                        <span className='create-link'>Go to Your Semesters</span>
                    </Link>
                </div>
            </div>}
        </main>
    );
}

export default ManageSemester;
