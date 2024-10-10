import React from "react";

// import '../App.css';
import './project-pop-up-admin.css';
import { deleteProject } from '../../Api.js'
import { useNavigate } from "react-router-dom";

export let projectinfo = null;
function AdminPop(props){
    console.log(props);

    // const submit =() =>{
    //     document.getElementById('confirm').style.display = "none";
    //     document.getElementById('close').style.display = "none";
    //     document.getElementById('edit').style.display = "none";
    // }

    // const close =() =>{
    //     document.getElementById('popup').style.display = "none";
    // }
    const Navigate = useNavigate();
    
    const edit = () =>{
        console.log(props.project)
        projectinfo = (props.project);
        Navigate('/projects/submit');
    }

    const withdraw= () =>{
        document.getElementById('deleteConfirm').style.display = "block";
      };
      const cancel= () =>{
        document.getElementById('deleteConfirm').style.display = "none";
      };
      const confirm= () =>{
        deleteProject(props.id);
      };

// console.log(props);
    return(
        <div id="popup">    
         <div id = 'deleteConfirm'>
            <button onClick={confirm}>Confirm</button>
            <button onClick={cancel}>Cancel</button>
        </div>
             
                    <br></br><br></br>
                    {/* <button id="close" onClick={close}>&times;</button> */}
                    <table>
                        <tr id="top">
                            <td>{props.project.project_number}</td>
                            <td>{props.project.title}
        
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
                            <td>Date created</td>
                            <td>{props.project.created}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>expiry</td>
                            <td>{props.project.expiry}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>Max Teams</td>
                            <td>{props.project.max_teams}
                            
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
                    <button id="edit" onClick={edit}>Edit</button>
                    <button id="delete" onClick={withdraw}>Withdraw</button>

                    <br></br><br></br><br></br>
                    </div>
    )
};
export default AdminPop;

