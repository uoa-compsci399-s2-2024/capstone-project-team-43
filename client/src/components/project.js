import React from "react";

import '../App.css';



function Projects(props){



        let today = new Date();
        let formatDate = today.toISOString();

        let available = "Unavailable"

        if(formatDate < props.expiry){
            available = "Available"
        }

        // if (available = "Unavailable"){
        //     document.getElementById("projectAvailable").style.backgroundColor  = "#FF0000"
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
                {props.status}
            </div>

            <div id="projectAvailable">
            {available}
            </div>
            
        </div>
        
    )
    

}



export default Projects;