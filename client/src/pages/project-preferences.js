import React from "react";
import '../App.css';
import { Link } from "react-router-dom";
import Project from "../components/project";

const ProjectPreferences = ()=>{

    let items=['Item 1','Item 2','Item 3','Item 4','Item 5'];

    let itemList=[];

    items.forEach((item)=>{
      itemList.push(
         <Project name={item}/>
        )
    })

    const submit =() =>{
        document.getElementById('projectPreferenceselements').style.display = "none";
        document.getElementById('onsubmission').style.display = "flex";
    }

    return(
        <div className="projectPreferences">
            <div id = "projectPreferenceselements">
                <h2>Project Preferences</h2>
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
                <button onClick={submit}>Submit</button>
                </div>
                <div id="agreeon">
                <input type="checkbox" id="agreeupon" name="agreeupon" value="y/n"></input>
                <label for="agreeupon"> Do all team members agree on the order of the projects provided above?</label>
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