import React, { useState } from 'react';
import '../App.css';
import SemesterCSVUpload from './semester-csv-upload';

const ManageSemester = ({ semesterID }) => {

    return (
        <div className='ManageSemester'>
        {/* Add other page content here  */}
        
        {/* CSV File Upload Forms for Semester Student/Team Data */}
            <div className='semester-uploads-container'>
                {/* Upload Students CSV */}
                <SemesterCSVUpload semesterID={semesterID} fileContent='students' />
                
                {/* Upload Teams CSV */}
                <SemesterCSVUpload semesterID={semesterID} fileContent='teams' />
            </div>
        </div>
    );
}

export default ManageSemester;
