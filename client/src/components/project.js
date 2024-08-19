import React from "react";

import '../App.css';



function Projects(props){
    return(
        <div className="project">
            <div id="projectNum">
            {props.id}
            </div>

            <div id="projectName">
            {props.name}
            </div>

            <div id="projectDescription">
                {props.description}
            </div>

        </div>
    )
}



export default Projects;