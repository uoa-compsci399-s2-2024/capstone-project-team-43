import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchSemester, fetchSemesters, fetchUsersByRole, updateSemesterDetails, fetchTeamsBySemester, downloadCSV, downloadCSVTeams, fetchProjectsBySemester } from '../../Api.js';
import downloadIcon from '../../media/download-icon.png';
import SemesterCSVUpload from '../../components/semester-csv-upload/semester-csv-upload.js';
import './manage-semester.css';
import SemesterDropdown from '../../components/semester-dropdown/semester-dropdown.js';
import uploadIcon from '../../media/upload-icon.png';

import { formatDate, formatDatetime, formatDateForInput, formatTimeForInput } from '../../utils/format-date.js';

import { downloadAllocation, downloadCSVClients, processAllocation } from '../../Api.js';

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
    // const [editingField, setEditingField] = useState(null);

    // Control visibility of student/teams upload functionality
    const [showStudentUpload, setShowStudentUpload] = useState(false);
    const [showTeamUpload, setShowTeamUpload] = useState(false);
    const openStudentUpload = () => setShowStudentUpload(true);
    const openTeamUpload = () => setShowTeamUpload(true);
    const closeStudentUpload = () => setShowStudentUpload(false);
    const closeTeamUpload = () => setShowTeamUpload(false);

    const dateFields = ['start_date', 'end_date', 'proposal_deadline'];
    const datetimeFileds = ['start_bidding_date', 'end_bidding_date'];
    

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
      

    // Helper function for date formatting the semester start/end dates, validDate is a true/false flag that returns a valid date that the mySQL database can read
    // const formatSemesterDate = (dateString, validDate = false) => {
    //     let date = new Date(dateString);
    //     let dateData = null;
    //     if (isNaN(date.getTime())) {
    //         const data = dateString.split("/");
    //         date = new Date(parseInt("20" + data[2]), parseInt(data[1]) - 1, parseInt(data[0]));

    //         //Converts to a readable format for the mySQL database
    //         dateData = `${"20" + data[2].padStart(2, '0')}-${data[1].padStart(2, '0')}-${data[0].padStart(2, '0')}`;
    //     }

    //     if (validDate) {

    //         // User wants readable format for database
    //         return dateData;

    //     } else {
    //         const day = date.getDate().toString().padStart(2, '0');
    //         const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //         const year = date.getFullYear().toString().slice(-2);
    //         return `${day}/${month}/${year}`;
    //     }
    // };

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
                console.log('getting semesters projects');
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
                // ignore demo user -- delete after demo
                const demoData = data.filter(student => (student.email !== 'iwoo708@aucklanduni.ac.nz' && student.email !== 'student@gmail.com'))
                setStudents(demoData);
                console.log('Fetched students:', demoData);
                setStudentsUploadSuccess(false);
            } catch (error) {
                console.error('Failed to load students:', error);
            }
        }
        getStudents();
    }, [semesterID, semester, studentsUploadSuccess]);

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
    }, [semesterID, semester, teamsUploadSuccess]);

    // handles semester selection in dropdown menu
    const handleSemesterSelect = (selectedSemesterID) => {
        // set new semester to manage
        setSemesterID(selectedSemesterID);
        // update URL without reloading page
        navigate(`/manage/semester/${selectedSemesterID}`, { replace: true });
    };


    // Handle saving edit changes
    const handleSaveChanges = async (editingFields, setIsEditingFalse) => {
        console.log(`Saving ${editingFields} changes`);
    
        for (let i = 0; i < editingFields.length; i++) {
            let field = editingFields[i];
            console.log('editing field:',field);

            let newValue = null; 

            // concatenate date and time inputs if editing bidding timeframe
            if (field === 'start_bidding_date' ||  field === 'end_bidding_date') {
                console.log('editing bidding timeframe')


                let newDate = document.getElementById(`${field}_date`).value;
                console.log('new date:',newDate);

                let newTime = document.getElementById(`${field}_time`).value;
                console.log('new time:',newTime);

                newValue = `${newDate}T${newTime}`;
                console.log('new value:', newValue);

                if (newValue !== (semester[field])) {
                    console.log('value has been changed, updating to be', newValue);
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
                console.log('not editing bidding timeframe')
                newValue = document.getElementById(field).value;
                console.log('new value:', newValue);
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
        console.log('done looping through fields')
        setIsEditingFalse();
    } 

    const pendingProjects = projects.filter(project => project.status === 'pending');
    const acceptedProjects = projects.filter(project => project.status === 'accepted');
    const rejectedProjects = projects.filter(project => project.status === 'rejected');
    const publishedProjects = projects.filter(project => project.status === 'published');

    return (
        <main className='manage-semester-page'>
            {semester && <div className='content'>
                <div className='page-heading'>
                        <h1>Manage Semesters</h1>
                    <div className='page-subheading semester-subheading'>
                        <h2 className='page-subheading'>{semester.name}</h2>
                        <SemesterDropdown onSelectSemester={handleSemesterSelect}/>
                    </div>
                </div>
                {semester.status !== 'retired' && <div className='page-content'>
                    <div className='content-sections-container students'>
                        <h3>Students and Teams</h3>
                        {/* Semester Student/Team Data */}
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Students</h4>
                            </div>
                            {/* Displays student count & gives upload option */}
                            <div className='content-section-text'>
                                        {students.length > 0 ? (
                                            <p>Student data has been uploaded. <br></br>{students.length} student{students.length !== 1 ? 's are' : ' is'} registered for this semester.</p>)
                                        :(<p>Student data has not been uploaded.</p>)}
                            </div>
                                {!showStudentUpload && <div className='button-container'>
                                    <button className='upload-button' onClick={openStudentUpload}>
                                        {students.length >= 1 ? 'Reupload' : 'Upload'} Student Data
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
                                        {teams.length > 0 ? (
                                            <p>Team data has been uploaded. <br></br>{teams.length} team{teams.length !== 1 ? 's are' : ' is'} currently registered for this semester</p>
                                        ):(
                                            <p>Team data has not been uploaded.</p>
                                        )}
                                        
                                </div>
                                {!showTeamUpload && <div className='button-container'>
                                    <button className='upload-button' onClick={openTeamUpload}>
                                        {teams.length >= 1 ? 'Reupload' : 'Upload'} Team Data
                                    </button>

                                    {teams.length >= 1 && <button className='upload-button' onClick={teamDownload}>
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
                    <div className='content-sections-container'>
                        <h3>Projects</h3>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Proposals</h4>
                            </div>
                            {projects.length > 0 ? (<div className='content-section-text'> 
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
                                <button className='upload-button' onClick={() => {navigate('/projects/manage')}}>
                                    Go to Manage Projects 
                                </button>
                            </div>
                            
                        </div>

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
                            {showProcess ? (
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
                                </div>
                                ) : (
                                <div className='content-button-container'>
                                    <button className='upload-button' onClick={() => setShowProcess(true)}>
                                        Process Project Allocation
                                    </button>
                                </div>
                                )}
                        </div>
                    </div>
                    <div className='content-sections-container dates'>
                        <h3>Dates and Deadlines</h3>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Semester Dates</h4>
                            </div>
                                   
                            {isEditingSemesterDates ? (
                                <div className='content-section-text'>
                                    <p> 
                                        The semester starts on 
                                        <input className={`edit-input ${hasEditedProposalDeadline ? 'edited':'not-edited'}`}
                                            type="date"
                                            id='start_date'
                                            onChange={() => setHasEditedSemesterDates(true)}
                                            // defaultValue={updatedSemester.start_date.substring(0, 10)}
                                            defaultValue={formatDateForInput(updatedSemester.start_date)}
                                        /> 
                                        and ends 
                                        <input className={`edit-input ${hasEditedProposalDeadline ? 'edited':'not-edited'}`}
                                            type="date"
                                            id='end_date'
                                            onChange={() => setHasEditedSemesterDates(true)}
                                            defaultValue={formatDateForInput(updatedSemester.end_date)}
                                        /> 
                                    </p>
                                </div>
                                ) : (
                                <div className='content-section-text'>
                                    <p>The semester starts on {formatDate(updatedSemester.start_date)} and ends {formatDate(updatedSemester.end_date)}</p>
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
                                        The Project Proposal Form notifies clients that any submissions after
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
                                    <p>The Project Proposal Form currently notifies clients that any submissions after {formatDate(updatedSemester.proposal_deadline)} will only be considered for future semesters.</p>
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
                                        Students can access and submit the project preferences form from 
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
                                        /> 
                                    </p>
                                </div>
                                ) : (
                                <div className='content-section-text'>
                                    <p>Students can access and submit the project preferences form from {formatDatetime(updatedSemester.start_bidding_date)} to {formatDatetime(updatedSemester.end_bidding_date)}</p>
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
                </div>}
                {semester.status=== 'retired' && <div className='page-content'>
                    <p>This semester has been retired.</p>
                    <Link to='/projects/archive'>
                        <span>View in Project Archive</span>
                    </Link>
                </div>}
            </div>}
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
        </main>
    );
}

export default ManageSemester;
