import React from "react";
import '../App.css';
import { Link } from "react-router-dom";
import Project from "../components/project";

const ProjectPreferences = ()=>{

    <div id="agreeon">
                <input type="checkbox" id="agreeupon" name="agreeupon" value="y/n"></input>
                <label for="agreeupon"> Do all team members agree on the order of the projects provided above?</label>
                </div>  

    let items=['Item 1','Item 2','Item 3','Item 4','Item 5'];

    let itemList=[];

    items.forEach((item)=>{
      itemList.push(
         <Project name={item}/>
        )
    })

    const submit =() =>{
        document.getElementById('projectPreferenceselements').style.display = "none";
        document.getElementById('onsubmission').style.display = "block";
        document.getElementById('confirm').style.display = "none";
    }

    const cancel = () =>{
        document.getElementById('confirm').style.display = "none";
        document.getElementById('projectPreferenceselements').style.background = "#2979FF";
        document.getElementById('projectPreferenceselements').style.opacity = "100%";
    }

    const confirmation = () =>{
        document.getElementById('confirm').style.display = "block";
        document.getElementById('projectPreferenceselements').style.background = "#003998";
        document.getElementById('projectPreferenceselements').style.opacity = "30%";
    }

    return(
        <div className="projectPreferences">
            
            <meta name = "viewport" content = "width=device-width, initial-scale=1"/>

            <div id="confirm">
            <br></br><br></br>
            <h2>Are you sure you want to submit?</h2>
            <p>Please note that this submission will count for your entire group.</p>
            <div id="confirmprojects">
            {itemList}
            </div>
            <input type="checkbox" id="agreeupon" name="agreeupon" value="y/n"></input>
            <label for="agreeupon"> Do all team members agree on the order of the projects provided above?*</label>
            <br></br>
            <button onClick={cancel}>Cancel</button><button onClick={submit}>Confirm</button>
            <br></br><br></br><br></br>
            </div>

            <div id = "projectPreferenceselements">
                <h2 id="">Project Preferences</h2>
                <div className="preferenceProjects">
                {itemList}
                </div>
                <div id="sidebuttons">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                </div>
                <div id = "preferencesubmit">
                <button onClick={confirmation}>Submit</button>
                </div>     
            </div>
            <div id = "onsubmission">
                <h2>Your project preferences have been submitted!</h2>
                <div id = "chosenProjects">
                {itemList}
                </div>
                <div id = "return">
                <Link to="/pages/projects-available"><button>Return to Projects</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectPreferences;