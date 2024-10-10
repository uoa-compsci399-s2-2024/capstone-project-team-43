import React from "react";

import '../App.css';
import './pop-up admin/project-pop-up-admin.css';
// /api/semesters/

function adminPop(props){


    const submit =() =>{
        document.getElementById('confirm').style.display = "none";
    }

// console.log(props);
    return(
        <div id="popup">    
             
                    <br></br><br></br>
                    
                    <table>
                        <tr id="top">
                            <td>{props.project.project_number}</td>
                            <td>{props.project.title}
        
                            </td>
                        </tr>
                        <tr>
                            <td>Project Description</td>
                            <td>{props.project.description}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>skills</td>
                            <td>{props.project.preferred_skills}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>deliverable</td>
                            <td>{props.project.deliverable}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>Special requirements</td>
                            <td>{props.project.special_requirements}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>Resources Available</td>
                            <td>{props.project.available_resources}
                            
                            </td>
                        </tr>

                    </table> 

                    <br></br><br></br><br></br>
                    </div>
    )
}

export default adminPop;

