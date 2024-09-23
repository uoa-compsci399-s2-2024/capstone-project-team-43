import React from "react";

import '../App.css';

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
                            <td>{props.number}</td>
                            <td>{props.name}
        
                            </td>
                        </tr>
                        <tr>
                            <td>Client</td>
                            <td>client info:
                                Name <br />
                                Email <br />
                                Other details
                            </td>
                        </tr>
                        <tr>
                            <td>Project Description</td>
                            <td>{props.description}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>skills</td>
                            <td>{props.skills}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>deliverable</td>
                            <td>{props.deliverable}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>Date created</td>
                            <td>{props.created}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>expiry</td>
                            <td>{props.expiry}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>Max Teams</td>
                            <td>{props.teams}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>Special requirements</td>
                            <td>{props.requirements}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>Resources Available</td>
                            <td>{props.resources}
                            
                            </td>
                        </tr>
                    </table> 

                    <br></br><br></br><br></br>
                    </div>
    )
}

export default adminPop;

