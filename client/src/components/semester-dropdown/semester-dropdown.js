import React, {useEffect, useState} from "react";
import { fetchSemesters } from "../../Api";
import './semester-dropdown.css';


const SemesterDropdown = ({ onSelectSemester, hideSemesters = [] }) => {
    const [semesters, setSemesters] = useState([]);

    const drop = () =>{
        const dropdown = document.getElementById('dropdown');
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    };

    // Get all semester data from server
    useEffect(() => {
        async function getSemesters() {
            try {
                const data = await fetchSemesters();
                setSemesters(data);
                console.log('Fetched semester data for dropdown:', data);  
            } catch (error) {
                console.error('Failed to load semester for dropdown:', error);
            }
        }
        getSemesters();
    }, []);

    const handleSelectSemester = (semesterID) => {
        // Send the semester ID to the parent or use it within the component
        if (onSelectSemester) {
            onSelectSemester(semesterID);  // sends the ID back to the parent component
        }
        console.log('Selected dropdown semester ID:', semesterID); // You can log the ID here or do other operations
    };

    return(
        <div className="semester-dropdown">
            <button onClick={drop} className="dropdown-button"></button>
            <ul className = 'dropdown-menu' id="dropdown"  style={{ display: 'none' }}>
                {semesters.map((semester, index) => (
                    !hideSemesters.includes(semester.status) ? (
                    <li key={index}>
                        <button className = 'dropdown-menu-button' onClick = {() => handleSelectSemester(semester.id) }>
                            {semester.name}
                        </button>
                    </li>) : (null)
                ))}
            </ul>
        </div>
    );
}


export default SemesterDropdown;