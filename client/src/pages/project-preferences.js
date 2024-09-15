import React from "react";
import '../App.css';
import { Link } from "react-router-dom";
import Project from "../components/project";

const ProjectPreferences = ()=>{

    const handleclick = (name) =>{
        if (opt1 == true){
            //let projectdes = itemList[2].props.name;
            let projectdes = name;
            let options = document.getElementById('option1');
            options.innerHTML += "<p>";
            options.innerHTML += projectdes;
            options.innerHTML += "</p>";
            opt1 = false;
        }
        else if (opt2 == true){
            //let projectdes = itemList[2].props.name;
            let projectdes = name;
            let options = document.getElementById('option2');
            options.innerHTML += "<p>";
            options.innerHTML += projectdes;
            options.innerHTML += "</p>";
            opt2 = false;
        }
        else if (opt3 == true){
            //let projectdes = itemList[2].props.name;
            let projectdes = name;
            let options = document.getElementById('option3');
            options.innerHTML += "<p>";
            options.innerHTML += projectdes;
            options.innerHTML += "</p>";
            opt3 = false;
        }
        else if (opt4 == true){
            //let projectdes = itemList[2].props.name;
            let projectdes = name;
            let options = document.getElementById('option4');
            options.innerHTML += "<p>";
            options.innerHTML += projectdes;
            options.innerHTML += "</p>";
            opt4 = false;
        }
        else if (opt5 == true){
            //let projectdes = itemList[2].props.name;
            let projectdes = name;
            let options = document.getElementById('option5');
            options.innerHTML += "<p>";
            options.innerHTML += projectdes;
            options.innerHTML += "</p>";
            opt5 = false;
        }
    }

    let opt1 = false;
    let opt2 = false;
    let opt3 = false;
    let opt4 = false;
    let opt5 = false;

    <div id="agreeon">
                <input type="checkbox" id="agreeupon" name="agreeupon" value="y/n"></input>
                <label for="agreeupon"> Do all team members agree on the order of the projects provided above?</label>
                </div>  

    let items=['Item 1','Item 2','Item 3','Item 4','Item 5'];

    let itemList=[];

    items.forEach((item)=>{
      itemList.push(
        <div id = {item} onClick={() => handleclick(item)}>
         <Project name={item}/>
         </div>
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

    const selecting = (option) =>{
        if (option === "option1"){
            opt1 = true;
            let options = document.getElementById('option1');
            options.innerHTML = "1";
        }

        else if (option === "option2"){
            opt2 = true;
            let options = document.getElementById('option2');
            options.innerHTML = "2";
        }

        else if (option === "option3"){
            opt3 = true;
            let options = document.getElementById('option3');
            options.innerHTML = "3";
        }

        else if (option === "option4"){
            opt4 = true;
            let options = document.getElementById('option4');
            options.innerHTML = "4";
        }

        else if (option === "option5"){
            opt5 = true;
            let options = document.getElementById('option5');
            options.innerHTML = "5";
        }
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
                    <button id="option1" onClick={()=>{selecting("option1")}}>1</button>
                    <button id="option2" onClick={()=>{selecting("option2")}}>2</button>
                    <button id="option3" onClick={()=>{selecting("option3")}}>3</button>
                    <button id="option4" onClick={()=>{selecting("option4")}}>4</button>
                    <button id="option5" onClick={()=>{selecting("option5")}}>5</button>
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