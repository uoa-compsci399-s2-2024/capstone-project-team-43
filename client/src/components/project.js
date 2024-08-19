import React from "react";

import '../App.css';



function Projects(props){
    return(
        <div className="project">
            <div id="projectNum">
            <h2>17</h2>
            </div>

            <div id="projectName">
            {props.name}
            </div>

            <div id="projectDescription">
                {props.description}
            {/* a paragraph of information on the project and its basic deliverables
            a paragraph of information on the project and its basic deliverables
            a paragraph of information on the project and its basic deliverables */}
            </div>

        </div>
    )
}



export default Projects;