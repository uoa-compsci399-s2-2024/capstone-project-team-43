import React, {useEffect, useState} from "react";
import { fetchSemesters } from "../Api";
import '../App.css';

const SemesterDropdown = ({ pathway }) => {
    const [semesters, setSemesters] = useState([]);

    const archiveLink = "/pages/projects-archive/"
    const manageLink = "/pages/manage-semester/"

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
                console.log('Fetched semester data:', data);  
            } catch (error) {
                console.error('Failed to load semester:', error);
            }
        }
        getSemesters();
    }, []);

    return(
        <div className="semester-dropdown">
            <button onClick={drop} className="dropdown-button"></button>
            <ul className = 'dropdown-menu' id="dropdown"  style={{ display: 'none' }}>
                {semesters.map((semester, index) => (
                    <li key={index}>
                        <a className = 'dropdown-menu-button' href = {pathway === 'archive' ? `${archiveLink}${semester.id}` : `${manageLink}${semester.id}`}>
                            {semester.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default SemesterDropdown;