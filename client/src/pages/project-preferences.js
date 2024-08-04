import React from "react";
import '../App.css';

const ProjectPreferences = ()=>{
    return(
        <div className="projectPreferences">
            <h2>Project Preferences</h2>
            <br></br>
            <div className="preferenceProjects">
            </div>
            <div id="sidebuttons">
                <button>1</button>
                <br></br><br></br><br></br>
                <button>2</button>
                <br></br><br></br><br></br>
                <button>3</button>
                <br></br><br></br><br></br>
                <button>4</button>
                <br></br><br></br><br></br>
                <button>5</button>
            </div>
            {/*<button>Submit</button>*/}
        </div>
    );
};

export default ProjectPreferences;