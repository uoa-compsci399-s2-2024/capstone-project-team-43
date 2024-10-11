import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSemester, fetchUsersByRole, updateSemesterDetails, fetchTeamsBySemester, downloadCSV, downloadCSVTeams } from '../../Api.js';
import downloadIcon from '../../media/download-icon.png';
import SemesterCSVUpload from '../../components/semester-csv-upload/semester-csv-upload.js';
import './manage-semester.css';
import SemesterDropdown from '../../components/semester-dropdown/semester-dropdown.js';
import uploadIcon from '../../media/upload-icon.png';

import { downloadAllocation, fetchSemesters } from '../../Api.js';

// Formats semester data & edit functionality
const SemesterDetail = ({ description, data='None', onEdit, isEditing, onSave, onCancel }) => {

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
                                style = {{width: `${value.length}ch`}}
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

    // gets semesterID from URL or from previous dropdown selection
    const { semesterID: semesterIDFromURL } = useParams();
    const navigate = useNavigate(); 
    const [semesterID, setSemesterID] = useState(semesterIDFromURL || null);

    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);
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

    // Helper function for date formatting the semester start/end dates, validDate is a true/false flag that returns a valid date that the mySQL database can read
    const formatSemesterDate = (dateString, validDate=false) => {
        let date = new Date(dateString);
        let dateData = null;
        if (isNaN(date.getTime())) {
            const data = dateString.split("/");
            date = new Date(parseInt("20"+data[2]), parseInt(data[1]) - 1, parseInt(data[0]));

            //Converts to a readable format for the mySQL database
            dateData = `${"20"+data[2].padStart(2, '0')}-${data[1].padStart(2, '0')}-${data[0].padStart(2, '0')}`;
        }

        if(validDate) {

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
    const formatBiddingDate = (biddingDate, validDate=false) => {
        console.log(typeof biddingDate, biddingDate);

        let date = new Date(biddingDate);
        let dateStringResult;

        // if date is invalid, need to manually format it
        if (isNaN(date.getTime())) {
            const data = biddingDate.split(" ");

            let hours =  data[0].split(":")[0] % 12;

            if (data[0].slice(-2) === "pm") {
                hours += 12;

            } else if (data[0].slice(-2) !== "am") {
                // Not valid time
                return null;
            }

            let minutes = parseInt(data[0].split(":")[1].slice(0, -2));

            // If time given is not valid, return
            if (minutes >= 60  || minutes < 0 || hours < 0 || hours > 23) {
                return null;
            }

            let dateData = data[1].split("/");
            date = new Date(parseInt("20"+dateData[2]), parseInt(dateData[1]) - 1, parseInt(dateData[0]), hours, minutes);

            //Converts to a readable format for the mySQL database
            dateStringResult = `${"20"+dateData[2].padStart(2, '0')}-${dateData[1].padStart(2, '0')}-${dateData[0].padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
            
        }

        if(validDate) {

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
        async function getSemester() {
            // only fetch if semesterID is set
            if (!semesterID) return; 
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
    }, [semesterID]); // refetch when semesterID changes (i.e. on drop down click)

    // Get semester's students 
    useEffect(() => {
        async function getStudents() {
            try {
                const data = await fetchUsersByRole('student');
                setStudents(data);
                // setNumStudents(data.length); 
                console.log('Fetched students:', data);  
            } catch (error) {
                console.error('Failed to load students:', error);
            }
        }
        getStudents();
    }, []);

    // Get semester's teams
    useEffect(() => {
        async function getTeams() {
            try {
                const data = await fetchTeamsBySemester(semesterID);
                setTeams(data);
                console.log('Fetched teams:', data);  
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

        if(formattedDate) {

            console.log("DATE IS INVALID");
        
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



    return (
        <main className='manage-semester-page'>
            {semester && <div className='content'>
                <div className='page-heading'>
                    <div className='semester-heading'>
                        {semester && <h1>Manage {semester.status.charAt(0).toUpperCase()}{semester.status.slice(1)} Semester</h1>}
                        {/* update semesterID when dropdown button is selected */}
                        <SemesterDropdown onSelectSemester={handleSemesterSelect} hideSemesters={['retired']} />
                    </div>
                    <h2 className='page-subheading'>{semester.name}</h2>
                </div>
                <div className='page-content'>
                <div className='content-section'>
                    <h2>Semester Timeframe</h2>
                    <p className='text-detail'>View and edit the semester dates</p>
                    <SemesterDetail 
                        description="Start date" 
                        data={formatSemesterDate(updatedSemester.start_date)} 
                        onEdit={() => handleEdit('start_date')} 
                        isEditing={editingField === 'start_date'} 
                        onSave={handleSave} 
                        onCancel={handleCancel}
                    />
                    <SemesterDetail 
                        description="End date" 
                        data={formatSemesterDate(updatedSemester.end_date)} 
                        onEdit={() => handleEdit('end_date')} 
                        isEditing={editingField === 'end_date'} 
                        onSave={handleSave} 
                        onCancel={handleCancel}
                    />
                </div>
                <div className='content-section'>
                    <h2>Project Bidding Timeframe</h2>
                    <p className='text-detail'>View and edit when teams are able to submit their project preferences</p>
                    <SemesterDetail 
                        description="Start date" 
                        data={formatBiddingDate(updatedSemester.start_bidding_date)} 
                        onEdit={() => handleEdit('start_bidding_date')} 
                        isEditing={editingField === 'start_bidding_date'} 
                        onSave={handleSave} 
                        onCancel={handleCancel}
                    />
                    <SemesterDetail 
                        description="End date" 
                        data={formatBiddingDate(updatedSemester.end_bidding_date)} 
                        onEdit={() => handleEdit('end_bidding_date')} 
                        isEditing={editingField === 'end_bidding_date'} 
                        onSave={handleSave} 
                        onCancel={handleCancel}
                    />
                </div>
                {/* Semester Student/Team Data */}
                <div className='content-section'>
                    <h2>Students and Teams</h2>
                    <p className='text-detail'>View, edit, and download the semester's students and teams</p>
                    {/* Displays student count & gives upload option */}
                    <div className='semester-data-container'>
                        <div className='container-text'>
                            <p> {students.length} student{students.length !== 1 ? 's are' : ' is'} currently registered for this semester</p>
                        </div>
                        {!showStudentUpload && <div className='container-button'>
                            <button className = 'upload-button' onClick ={openStudentUpload}> 
                                <img src= {uploadIcon} alt ='icon' className='upload-icon'></img> 
                                {students.length >= 1 ? 'Reupload' : 'Upload'} student data
                            </button>
                            <button className = 'upload-button' onClick ={studentDownload}> 
                                <img src= {downloadIcon} alt ='icon' className='download-icon'></img> 
                                Download Student data
                            </button>
                        </div>}
                    </div>
                    { showStudentUpload && (
                        <div className='pop-up'>
                            <div className='pop-up-header'>
                                <h3>Upload Student Data</h3>
                                <button className = 'quit-button' onClick={closeStudentUpload}></button>
                            </div>
                            <div className='pop-up-text'>
                                <p>File must be a CSV with headers {studentHeaders.join(', ')}</p>
                                <p className='warning'>Warning: Reuploading student data will remove the already existing students from the system. This cannot be undone.</p>
                            </div>
                            <SemesterCSVUpload semesterID={semesterID} fileContent='students' />
                        </div>                
                    )}
                    {/* Displays team count & gives upload option */}
                    <div className='semester-data-container'> 
                        <div className='container-text'>
                            <p>{teams.length} team{teams.length !== 1 ? 's are' : ' is'} currently registered for this semester</p>
                        </div>
                        {!showTeamUpload && <div className='container-button'>
                            <button className = 'upload-button' onClick={openTeamUpload}>
                                <img src={uploadIcon} alt ='icon' className='upload-icon'></img> 
                                {teams.length >= 1 ? 'Reupload' : 'Upload'} team data
                            </button>

                            <button className = 'upload-button' onClick={teamDownload}>
                                <img src={downloadIcon} alt ='icon' className='download-icon'></img> 
                                Download Team data
                            </button>
                        </div>}
                    </div>
                    <button className = 'upload-button' onClick ={downloadAllocation}> 
                                <img src= {downloadIcon} alt ='icon' className='download-icon'></img> 
                                Download Allocation Results
                            </button>
                    { showTeamUpload && (
                        <div className='pop-up'>
                            <div className='pop-up-header'>
                                <h3>Upload Team Data</h3>
                                <button className = 'quit-button' onClick={closeTeamUpload}></button>
                            </div>
                            <div className='pop-up-text'>
                                <p>File must be a CSV with headers {teamHeaders.join(', ')}</p>
                                <p className='warning'>Warning: Reuploading team data will remove the already existing teams from the system. This cannot be undone.</p>
                            </div>
                            <SemesterCSVUpload semesterID={semesterID} fileContent='teams' />
                            </div>
                        )}
                </div>
                </div>
            </div>}
        </main>
    );
}

export default ManageSemester;
