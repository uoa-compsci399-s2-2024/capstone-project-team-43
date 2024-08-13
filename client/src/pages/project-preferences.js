import React from "react";
import '../App.css';

const ProjectPreferences = ()=>{

    const submit =() =>{
        document.getElementById('projectPreferenceselements').style.display = "none";
        document.getElementById('onsubmission').style.display = "block";
    }

    return(
        <div>
            <div className="projectPreferences" id = "projectPreferenceselements">
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
                <button onClick={submit}>Submit</button>
                </div>
                <div id="agreeon">
                <input type="checkbox" id="agreeupon" name="agreeupon" value="y/n"></input>
                <label for="agreeupon"> Do all team members agree on the order of the projects provided above?</label>
                </div>       
            </div>
            <div id = "onsubmission">
                <h2>Your project preferences have been submitted!</h2>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <div id = "return">
                <button>Return to Projects</button>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                </div>
            </div>
        </div>
    );
};

export default ProjectPreferences;