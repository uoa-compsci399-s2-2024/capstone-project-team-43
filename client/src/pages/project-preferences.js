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
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
            </div>
            <div id = "preferencesubmit">
            <button>Submit</button>
            </div>
            <div id="agreeon">
            <input type="checkbox" id="agreeupon" name="agreeupon" value="y/n"></input>
            <label for="agreeupon"> Do all team members agree on the order of the projects provided above?</label>
            </div>
        </div>
    );
};

export default ProjectPreferences;