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


                    </table> 

                    <br></br><br></br><br></br>
                    </div>
    )
}

export default adminPop;

