import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchSemester, fetchSemesters, fetchUsersByRole, updateSemesterDetails, fetchTeamsBySemester, downloadCSV, downloadCSVTeams, fetchProjectsBySemester } from '../../Api.js';
import downloadIcon from '../../media/download-icon.png';
import SemesterCSVUpload from '../../components/semester-csv-upload/semester-csv-upload.js';
import './manage-semester.css';
import SemesterDropdown from '../../components/semester-dropdown/semester-dropdown.js';
import uploadIcon from '../../media/upload-icon.png';


import { downloadAllocation, downloadCSVClients, processAllocation } from '../../Api.js';

// Formats semester data & edit functionality
const SemesterDetail = ({ description, data = 'None', onEdit, isEditing, onSave, onCancel }) => {

    const [value, setValue] = useState(data);
    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className='semester-detail'>
            {isEditing ? (
                <>
                    {/* Format when user is editing */}
                    <div className='semester-data-container'>
                        <div className='container-text'>
                            <p className='semester-data'>Edit {description.toLowerCase()}: {
                                <input
                                    type="text"
                                    value={value}
                                    onChange={handleInputChange}
                                    className='edit-input'
                                    style={{ width: `${value.length}ch` }}
                                />}</p>
                        </div>
                        {/* save & cancel buttons */}
                        <div className='editing-button-container'>
                            <button onClick={() => onSave(value)} className='save-edit-button'>Save Changes</button>
                            <button onClick={onCancel} className='cancel-edit-button'>Cancel</button>
                        </div>
                    </div>

                </>
            ) : (
                <>
                    {/* format when user isn't editing */}
                    <div className='semester-data-container'>
                        <div className='container-text'>
                            <p className='account-data'>{description}: {data}</p>
                        </div>
                        <button onClick={onEdit} className='edit-button'></button>
                    </div>
                </>
            )}
        </div>
    );
}


const ManageSemester = () => {
    // const [defaultSemester, setDefaultSemester] = useState(null);

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
    const [editingField, setEditingField] = useState(null);

    // Control visibility of student/teams upload functionality
    const [showStudentUpload, setShowStudentUpload] = useState(false);
    const [showTeamUpload, setShowTeamUpload] = useState(false);
    const openStudentUpload = () => setShowStudentUpload(true);
    const openTeamUpload = () => setShowTeamUpload(true);
    const closeStudentUpload = () => setShowStudentUpload(false);
    const closeTeamUpload = () => setShowTeamUpload(false);

    const [allocationComplete, setAllocationComplete] = useState(false);

    // Required headers for csv uploads
    const studentHeaders = ['Student name', 'Student ID', 'Student SIS ID', 'Email', 'Section name'];
    const teamHeaders = ['name', 'canvas_user_id', 'user_id', 'login_id', 'sections', 'group_name', 'canvas_group_id', 'group_id'];

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

    const handleProcessAllocation = () => {
        processAllocation();
        setAllocationComplete(true);
    }

    const CSVclients = () => {
        console.log("downloading client data");
        downloadCSVClients(semester.id);
    }

    // Helper function for date formatting the semester start/end dates, validDate is a true/false flag that returns a valid date that the mySQL database can read
    const formatSemesterDate = (dateString, validDate = false) => {
        let date = new Date(dateString);
        let dateData = null;
        if (isNaN(date.getTime())) {
            const data = dateString.split("/");
            date = new Date(parseInt("20" + data[2]), parseInt(data[1]) - 1, parseInt(data[0]));

            //Converts to a readable format for the mySQL database
            dateData = `${"20" + data[2].padStart(2, '0')}-${data[1].padStart(2, '0')}-${data[0].padStart(2, '0')}`;
        }

        if (validDate) {

            //User wants readable format for database
            return dateData;

        } else {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);
            return `${day}/${month}/${year}`;
        }
    };

    /** 
     * Helper function to format the bidding start/end dates, validDate is a true/false flag, if set to true the function will return a valid date that the database can read, if false, will return a readable version of the date
     */
    const formatBiddingDate = (biddingDate, validDate = false) => {
        console.log(typeof biddingDate, biddingDate);

        let date = new Date(biddingDate);
        let dateStringResult;

        // if date is invalid, need to manually format it
        if (isNaN(date.getTime())) {
            const data = biddingDate.split(" ");

            let hours = data[0].split(":")[0] % 12;

            if (data[0].slice(-2) === "pm") {
                hours += 12;

            } else if (data[0].slice(-2) !== "am") {
                // Not valid time
                return null;
            }

            let minutes = parseInt(data[0].split(":")[1].slice(0, -2));

            // If time given is not valid, return
            if (minutes >= 60 || minutes < 0 || hours < 0 || hours > 23) {
                return null;
            }

            let dateData = data[1].split("/");
            date = new Date(parseInt("20" + dateData[2]), parseInt(dateData[1]) - 1, parseInt(dateData[0]), hours, minutes);

            //Converts to a readable format for the mySQL database
            dateStringResult = `${"20" + dateData[2].padStart(2, '0')}-${dateData[1].padStart(2, '0')}-${dateData[0].padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;

        }

        if (validDate) {

            //User wants readable format for database
            return dateStringResult;

        } else {

            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'pm' : 'am';
            const formattedHours = (hours % 12) || 12;
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);

            return `${formattedHours}:${minutes}${ampm} ${day}/${month}/${year}`;
        }
    };

    // Get semester data from server
    useEffect(() => {
        console.log('geting semester data');
        if (semesterID) {
            const getSemester = async () => {
                try {
                    const data = await fetchSemester(semesterID);
                    setUpdatedSemester(data);
                    setSemester(data);
                    console.log('Fetched semester data:', data);
                } catch (error) {
                    console.error('Failed to load semester:', error);
                }
            }
            getSemester();
        }
        else {
            const getSemester = async () => {
                try {
                    console.log('getting default semester');
                    const semesters = await fetchSemesters();
                    const current = semesters.find(semester => semester.status === 'current');
                    setSemester(current);
                    setUpdatedSemester(current);

                } catch (error) {
                    console.error('Failed to load semester:', error);
                }
                
            }
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
                const demoData = data.filter(student => student.email !== 'student@gmail.com')
                setStudents(demoData);
                console.log('Fetched students:', data);
            } catch (error) {
                console.error('Failed to load students:', error);
            }
        }
        getStudents();
    }, [semesterID]);

    // Get semester's teams
    useEffect(() => {
        async function getTeams() {
            try {
                const data = await fetchTeamsBySemester(semesterID);
                setTeams(data);
            } catch (error) {
                console.error('Failed to load teams:', error);
            }
        }
        getTeams();
    }, [semesterID]);

    // handles semester selection in dropdown menu
    const handleSemesterSelect = (selectedSemesterID) => {
        // set new semester to manage
        setSemesterID(selectedSemesterID);
        // update URL without reloading page
        navigate(`/manage/semester/${selectedSemesterID}`, { replace: true });
    };

    // Handle entering edit mode
    const handleEdit = (field) => {
        setEditingField(field);
    };

    // Handle saving edit changes
    const handleSave = async (newValue) => {
        console.log(`Saving ${editingField} with value: ${newValue}`);

        let formattedDate;

        if (editingField === "start_date" || editingField === "end_date") {
            formattedDate = formatSemesterDate(newValue, true);
        } else {
            formattedDate = formatBiddingDate(newValue, true);
        }

        if (formattedDate) {

            // update details in database
            await updateSemesterDetails(semesterID, editingField, formattedDate);

            // update details on page immediately
            setUpdatedSemester((prevSemester) => ({
                ...prevSemester,
                [editingField]: newValue,
            }));

            setEditingField(null); // Exit edit mode
        }
    };

    // Handle cancelling edit
    const handleCancel = () => {
        setEditingField(null); // Exit edit mode without saving
    };


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
                            <div className='semester-data-container content-section-data'>
                                    <div className='container-text'>
                                        {students.length > 0 ? (
                                            <p>Student data has been uploaded. <br></br>{students.length} student{students.length !== 1 ? 's are' : ' is'} registered for this semester.</p>)
                                        :(<p>Student data has not been uploaded.</p>)}
                                    </div>
                                    {!showStudentUpload && <div className='container-button'>
                                        <button className='upload-button' onClick={openStudentUpload}>
                                            {/* <img src={uploadIcon} alt='icon' className='upload-icon'></img> */}
                                            {students.length >= 1 ? 'Reupload' : 'Upload'} Student Data
                                        </button>
                                        {/*{students.length >= 1 && <button className='upload-button' onClick={studentDownload}>
                                            Download Student Data
                                        </button>}*/}
                                    </div>}
                            </div>
                            {showStudentUpload && (
                                <div className='pop-up'>
                                    <div className='pop-up-header'>
                                        <h3>Upload Student Data</h3>
                                        <button className='quit-button' onClick={closeStudentUpload}></button>
                                    </div>
                                    <div className='pop-up-text'>
                                        <p>File must be a CSV with headers {studentHeaders.join(', ')}</p>
                                        <p className='warning'>Warning: Reuploading student data will remove the already existing students from the system. This cannot be undone.</p>
                                    </div>
                                    <SemesterCSVUpload semesterID={semesterID} fileContent='students' />
                                </div>
                            )}
                        </div>
                        <div className='content-section'>
                                <div className='content-section-heading'>
                                    <h4>Teams</h4>
                                </div>
                            <div className='content-section-data'>
                                <div className='container-text'>
                                    {teams.length > 0 ? (
                                        <p>Team data has been uploaded. {teams.length} team{teams.length !== 1 ? 's are' : ' is'} currently registered for this semester</p>
                                    ):(
                                        <p>Team data has not been uploaded.</p>
                                    )}
                                    
                                </div>
                                {!showTeamUpload && <div className='container-button'>
                                    <button className='upload-button' onClick={openTeamUpload}>
                                        {teams.length >= 1 ? 'Reupload' : 'Upload'} Team Data
                                    </button>

                                    {teams.length >= 1 && <button className='upload-button' onClick={teamDownload}>
                                        Download Team Data
                                    </button>}
                                </div>}
                            </div>
                        </div>
                            
                    </div>
                    <div className='content-sections-container'>
                        <h3>Projects</h3>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Proposals</h4>
                            </div>
                            <div className='semester-data-container content-section-data'>
                                {projects.length > 0 ? (<div className='container-text'> 
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
                                <div className='container-text'> 
                                    <p>No project proposals have been submitted for this semester yet.</p>
                                </div>)}
                                <div className='container-button'>
                                    <button className='upload-button' onClick={allocationDownload}>
                                        Go to Manage Projects 
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Project Allocation</h4>
                            </div>
                            <div className='content-section-data'>
                                <div className='container-text'>
                                <p>All teams have submitted their project preferences.</p>
                                </div>
                                <div className='container-button'>
                                    
                                <button className='upload-button' onClick={handleProcessAllocation}>
                                        Process Project Allocation
                                    </button>
                                   {allocationComplete && <button className='upload-button' onClick={allocationDownload}>
                                        Download Allocation Results
                                    </button>}
                                </div>
                            </div>
                        </div>
                        {showTeamUpload && (
                            <div className='pop-up'>
                                <div className='pop-up-header'>
                                    <h3>Upload Team Data</h3>
                                    <button className='quit-button' onClick={closeTeamUpload}></button>
                                </div>
                                <div className='pop-up-text'>
                                    <p>File must be a CSV with headers {teamHeaders.join(', ')}</p>
                                    <p className='warning'>Warning: Reuploading team data will remove the already existing teams from the system. This cannot be undone.</p>
                                </div>
                                <SemesterCSVUpload semesterID={semesterID} fileContent='teams' />
                            </div>
                        )}   
                    </div>
                    <div className='content-sections-container dates'>
                        <h3>Dates and Deadlines</h3>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Semester Dates</h4>
                                <p className='text-detail'></p>
                            </div>
                            <div className='content-section-data'>
                                <div className='container-text'>
                                <p>The semester starts on {formatSemesterDate(updatedSemester.start_date)} and ends {formatSemesterDate(updatedSemester.end_date)}.</p>
                                </div>
                                <div className='container-button'>
                                    {/* MAKE THIS TRIGGER EDIT */}
                                    <button className='upload-button'>
                                        Edit Semester Dates
                                    </button>
                                </div>
                            {/* <SemesterDetail
                                description="Semester starts"
                                data={formatSemesterDate(updatedSemester.start_date)}
                                onEdit={() => handleEdit('start_date')}
                                isEditing={editingField === 'start_date'}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            />
                            <SemesterDetail
                                description="Semester ends"
                                data={formatSemesterDate(updatedSemester.end_date)}
                                onEdit={() => handleEdit('end_date')}
                                isEditing={editingField === 'end_date'}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            /> */}
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                                <h4>Project Proposal Deadline</h4>
                                <p className='text-detail'></p>
                            </div>
                            <div className='content-section-data'>
                                <div className='container-text'>
                                <p>The Project Proposal Form currently notifies clients that any submissions after {semester.proposal_deadline} will only be considered for future semesters.</p>
                                </div>
                                <div className='container-button'>
                                    {/* MAKE THIS TRIGGER EDIT */}
                                    <button className='upload-button'>
                                        Edit Project Proposal Deadline
                                    </button>
                                </div>
                            {/* <SemesterDetail
                                description="Semester starts"
                                data={formatSemesterDate(updatedSemester.start_date)}
                                onEdit={() => handleEdit('start_date')}
                                isEditing={editingField === 'start_date'}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            />
                            <SemesterDetail
                                description="Semester ends"
                                data={formatSemesterDate(updatedSemester.end_date)}
                                onEdit={() => handleEdit('end_date')}
                                isEditing={editingField === 'end_date'}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            /> */}
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className='content-section-heading'>
                            <h4>Project Bidding Timeframe</h4>
                            <p className='text-detail'></p>
                            </div>
                            <div className='content-section-data'>
                                <div className='container-text'>
                                <p>Teams are able to submit their project preferences from {formatBiddingDate(updatedSemester.start_bidding_date)} to {formatBiddingDate(updatedSemester.end_bidding_date)}.</p>
                                </div>
                                <div className='container-button'>
                                    {/* MAKE THIS TRIGGER EDIT */}
                                    <button className='upload-button'>
                                        Edit Project Bidding Timeframe
                                    </button>
                                </div>
                            {/* <SemesterDetail
                                description="Opens"
                                data={formatBiddingDate(updatedSemester.start_bidding_date)}
                                onEdit={() => handleEdit('start_bidding_date')}
                                isEditing={editingField === 'start_bidding_date'}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            />
                            <SemesterDetail
                                description="Closes"
                                data={formatBiddingDate(updatedSemester.end_bidding_date)}
                                onEdit={() => handleEdit('end_bidding_date')}
                                isEditing={editingField === 'end_bidding_date'}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            /> */}
                            </div>
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
