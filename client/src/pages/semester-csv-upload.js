import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

const SemesterCSVUpload = ({ semesterID, fileContent }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 

    // Initialise required headers for the CSV depending on the file content type
    let requiredHeaders; 
    if (fileContent === 'students') {
        requiredHeaders = ['Student name', 'Student ID', 'Student SIS ID', 'Email', 'Section name'];
    } else if (fileContent === 'teams') {
        requiredHeaders = ['name', 'canvas_user_id', 'user_id', 'login_id', 'sections', 'group_name', 'canvas_group_id', 'group_id'];
    } else {
        // Return if fileContent is not 'students' or 'teams'
        requiredHeaders = [];
        return <p>Invalid upload type. Must be "students" or "teams".</p>;
    }

    // Handles File Selection 
    const onFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);
            console.log('file set');
            setError('');
        } else {
            // return error if file is not a CSV
            setError('Please upload a CSV file');
            setSelectedFile(null);  
        }
    };

    // Handles File Upload
    const onFileUpload = () => {

        // Return error if no file selected
        if (!selectedFile) {
            setError('No file selected');
            return;
        }

        // Parse CSV 
        const csvReader = new FileReader();

        csvReader.onload = (e) => {
            const content = e.target.result;
            const rows = content.split('\n');        
            const header = rows[0].split(',');

            // Check file has required headers
            const valid = header.length === requiredHeaders.length &&
                header.every((headerItem, index) => headerItem.trim() === requiredHeaders[index]);

            if (valid) {
                const formData = new FormData();
                formData.append("myFile", selectedFile, selectedFile.name);

                // send CSV content to server
                axios.post(`http://localhost:3001/api/semesters/${semesterID}/upload/${fileContent}`, formData, {
                        headers: {
                        'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        setSuccessMessage(`Upload successful! ${fileContent.charAt(0).toUpperCase() + fileContent.slice(1,-1)} data has been added.`);
                        setSelectedFile(null); 
                    })
                    .catch(error => {
                        console.error('Error uploading file', error);
                    })

            } else {
                setError('Invalid CSV format.');
            }
        };
        csvReader.readAsText(selectedFile);
    };

    return (
        <div className='SemesterCSVUpload'>
            <div className='admin-form-container'>
                <div className='file-upload-form'>
                    <input type="file" accept=".csv" onChange={onFileSelect} />
                    <button onClick={onFileUpload}>Upload {fileContent === 'students' ? 'Student' : 'Team'} Data</button>
                    {error && <p>{error}</p>}  
                    {successMessage && <p>{successMessage}</p>} 
                </div>
            </div>
        </div>
    );
}

export default SemesterCSVUpload;
