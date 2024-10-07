import React from "react";

import '../App.css';
import { deleteProject } from '../Api.js'
import { useNavigate } from "react-router-dom";


export let projectinfoP = null;

function AdminPop(props){

const Navigate = useNavigate();
    
    const edit = () =>{
        console.log(props.project)
        projectinfoP = (props.project);
        Navigate('/pages/project-proposal');

      };

      const withdraw= () =>{
        document.getElementById('deleteConfirm').style.display = "block";
      };

      const cancel= () =>{
        document.getElementById('deleteConfirm').style.display = "none";
      };
      const confirm= () =>{
        deleteProject(props.id);
      };

    return(
        <div id="popup">    
        <div id = 'deleteConfirm'>
            <button onClick={confirm}>Confirm</button>
            <button onClick={cancel}>Cancel</button>
        </div>
             
                    <br></br><br></br>
                    {/* <button id="close" onClick={submit}>&times;</button> */}
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
                    <button id="edit" onClick={edit}>Edit</button>
                    <button id="delete" onClick={withdraw}>Withdraw</button>

                    <br></br><br></br><br></br>
                    </div>
    )
}

export default AdminPop;

