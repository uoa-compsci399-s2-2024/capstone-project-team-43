import React from "react";

import '../App.css';



function Projects(props){


    // if(props.status == 'Accepted'){
    //     document.getElementById('next').style.backgroundColor  = "#00BB07";
    // }else{
    //     document.getElementById('next').style.backgroundColor  = "#FF0000"
    // }

    return(
        <div className="project">
            <div id="projectNum">
            {props.id}
            </div>
            <div id="projectClient">
            Client Name <br />
            ClientEmail@email.com
            </div>
            <div id="projectName">
            {props.name}
            </div>
            <div id="projectDescription">
                {props.description}
                
            </div>
            <div id="projectStatus">
                Rejected
            </div>

            <div id="projectAvailable">
                Available
            </div>
            
        </div>
        
    )
    
    
}



export default Projects;