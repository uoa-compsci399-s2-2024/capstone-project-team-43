import React, { Component } from "react";
import '../App.css';
import { Link } from "react-router-dom";
import Project from "../components/project";
import { useState, useEffect } from "react";
import { fetchProjects, fetchSemester, fetchSemesters, updatePreferences, fetchUser, fetchPreferences, deletePreferences } from '../Api.js'
import { useParams, useNavigate } from 'react-router-dom';
import getUserID from '../components/get-user-id.js';

const ProjectPreferences = ()=>{

    const { semesterID: semesterIDFromURL } = useParams();
    const [semesters, setSemesters] = useState([]);
    const [semester, setSemester] = useState(null);
    const [semesterID, setSemesterID] = useState(semesterIDFromURL || null);
    // const [chosenproject, setChosenProject] = useState(new Array(5).fill(<Project/>));
    const [chosenproject, setChosenProject] = useState([]);

    const [userID, setUserID] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        console.log("getting user id");
        const id = getUserID();
        console.log("user id "+id);
        setUserID(id);
        async function getUser() {
            try {
                const data = await fetchUser(userID);
                setUser(data);
                console.log('Fetched user data:', data);  
            } catch (error) {
                console.error('Failed to load user:', error);
            }
        }
        getUser();
    }, [userID]);


    // let chosenp = new Array(5).fill(<Project/>);

    const choose = (element, index) =>{
        // chosenp[index] = element;
        setChosenProject(oldArray => [...oldArray,element] );
    }

    useEffect(() => {
        async function getSemesters() {
            try {
                const data = await fetchSemesters();
                setSemesters(data);
            } catch (error) {
                console.error('Failed to load semesters:', error);
            }
        }
        getSemesters();
    }, []);


    useEffect(() => {
        async function getSemester() {
            // only fetch if semesterID is set
            if (!semesterID) return; 
            try {
                const data = await fetchSemester(semesterID);
                setSemester([...data]);
                console.log('Fetched semester data:', data);  
                // check semester is retired
                if (data.status !== 'retired') {
                    throw new Error('Semester is not retired.');
                }            
            } catch (error) {
                console.error('Failed to load semester:', error);
                return; 
            }
        }
        getSemester();
    }, [semesterID]);

    const [projects, setProjects] = useState([]);

    // get data onall accepted projects 
    useEffect(() => {
        async function getProjects() {
            try {
                const data = await fetchProjects('accepted');
                setProjects(data);
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjects();
    }, []);

    useEffect(() => {
        async function getSemester() {
            // only fetch if semesterID is set
            if (!semesters) return; 
            try {
                console.log("GETTING BIDDING DATE");
                getBiddingDate();
            } catch (error) {
                console.error('Failed to load semester:', error);
                return; 
            }
        }
        getSemester();
    }, [semesters]);

    const [preferences, setPreferences] = useState([]);

    // get data onall accepted projects 
    useEffect(() => {
        async function getPreferences() {
            try {
                const data = await fetchPreferences();
                setPreferences(data);
            } catch (error) {
                console.error('Failed to load preferences:', error);
            }
        }
        getPreferences();
    }, []);

    const handleclick = (project) =>{
        if (opt1 === true){
            //let projectdes = itemList[2].props.name;
            if (!(chosenproject.some((item) => item.title === project.title))){
                {choose(project, 0)};
            let options = document.getElementById('option1');
            options.innerHTML += "<p>";
            options.innerHTML += project.title;
            options.innerHTML += "</p>";
            opt1 = false;
            }
        }
        else if (opt2 === true){
            //let projectdes = itemList[2].props.name;
            if (!(chosenproject.some((item) => item.title === project.title))){
            {choose(project, 1)};
            let options = document.getElementById('option2');
            options.innerHTML += "<p>";
            options.innerHTML += project.title;
            options.innerHTML += "</p>";
            opt2 = false;
        }
        }
        else if (opt3 === true){
            //let projectdes = itemList[2].props.name;
            if (!(chosenproject.some((item) => item.title === project.title))){
            {choose(project, 2)};
            let options = document.getElementById('option3');
            options.innerHTML += "<p>";
            options.innerHTML += project.title;
            options.innerHTML += "</p>";
            opt3 = false;
        }
        }
        else if (opt4 === true){
            //let projectdes = itemList[2].props.name;
            if (!(chosenproject.some((item) => item.title === project.title))){
            {choose(project, 3)};
            let options = document.getElementById('option4');
            options.innerHTML += "<p>";
            options.innerHTML += project.title;
            options.innerHTML += "</p>";
            opt4 = false;
        }
        }
        else if (opt5 === true){
            //let projectdes = itemList[2].props.name;
            if (!(chosenproject.some((item) => item.title === project.title))){
            {choose(project, 4)};
            let options = document.getElementById('option5');
            options.innerHTML += "<p>";
            options.innerHTML += project.title;
            options.innerHTML += "</p>";
            opt5 = false;
        }
        }
    }

    let opt1 = false;
    let opt2 = false;
    let opt3 = false;
    let opt4 = false;
    let opt5 = false;

    const submit =() =>{
        if(document.getElementById("agreeupon").checked === true){
        document.getElementById('projectPreferenceselements').style.display = "none";
        document.getElementById('onsubmission').style.display = "block";
        document.getElementById('projectpreferenceconfirm').style.display = "none";
        let team = user.team_id;
        let exists = [];
         exists = preferences.filter(preference => preference.team_id === team);
        
        if (exists.length !== 0){
            for (let i = 0; i < exists.length; i++){
                console.log("DELETE");
                deletePreferences(exists[i].id);
            };
        }



        for (let i = 0; i < chosenproject.length; i++){
            let proj = chosenproject[i].id;
            let pref = i+1;
            updatePreferences(team, proj, pref);
        };
    }
    }

    const cancel = () =>{
        document.getElementById('projectpreferenceconfirm').style.display = "none";
        document.getElementById('projectPreferenceselements').style.background = "#2979FF";
        document.getElementById('projectPreferenceselements').style.opacity = "100%";
    }

    const confirmation = () =>{
        
        if(chosenproject.length !== 5){
            return;
        }

        if(chosenproject[0].title !== undefined && chosenproject[1].title !== undefined && chosenproject[2].title !== undefined && chosenproject[3].title !== undefined && chosenproject[4].title !== undefined){
        document.getElementById('projectpreferenceconfirm').style.display = "block";
        document.getElementById('projectPreferenceselements').style.background = "#003998";
        document.getElementById('projectPreferenceselements').style.opacity = "30%";
        }

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

    let biddingtime;
    const getBiddingDate = () => {
    try {
    const currentSemester = semesters.filter(semester => semester.status === "current");
    biddingtime = currentSemester[0].end_bidding_date
    //console.log("SET BIDDING TIME: ", biddingtime);
    } catch (err) {}
    }

    const formatBiddingDate = (biddingDate) => {
        console.log("BIDDING DATE RECEIVED: ", biddingDate);
        if(biddingDate) {
        console.log(typeof biddingDate, biddingDate);
        const date = new Date(biddingDate);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = (hours % 12) || 12;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear().toString().slice(-2); 
    
        return `${formattedHours}:${minutes}${ampm} ${day}/${month}/${year}`;
        } else {
            getBiddingDate();
            //console.log("UPDATED BIDDING DATE: ", biddingtime);
            return null;
        }
    };

    const helppopup = () =>{
        document.getElementById('help').style.display = "block";
        document.getElementById('projectPreferenceselements').style.background = "#003998";
        document.getElementById('projectPreferenceselements').style.opacity = "30%";
    }

    const helppopupclose = () =>{
        document.getElementById('help').style.display = "none";
        document.getElementById('projectPreferenceselements').style.background = "#2979FF";
        document.getElementById('projectPreferenceselements').style.opacity = "100%";
    }

    return(
        <div className="projectPreferences">
            
            <meta name = "viewport" content = "width=device-width, initial-scale=1"/>

            <div id="projectpreferenceconfirm">
            <br></br><br></br>
            <h2>Are you sure you want to submit?</h2>
            <p>Please note that this submission will count for your entire group.</p>
            <p>The most recent team submission will be the valid one.</p>
            <div id="confirmprojects">


            {/* display projects here */}
            
        {chosenproject.map((chosen) =>
            <div id="confirmingprojects">
            {chosen.project_number}
            . 
            {chosen.title}

            </div>
        )}

            

            </div>
            <input type="checkbox" id="agreeupon" name="agreeupon" value="y/n" required></input>
            <label for="agreeupon"> Do all team members agree on the order of the projects provided above?*</label>
            <br></br>
            <button onClick={cancel}>Cancel</button><button onClick={submit}>Confirm</button>
            <br></br><br></br><br></br>
            </div>

            <div id="help">
                <p>
                <br></br>
            1. On the right hand side of the page there are 5 buttons numbered from 1 to 5, with 1 at the top and 5 at the bottom.
            <br></br>
            <br></br>
            2. To select your preference click on the button that corresponds to the position you would like to rank the project.
            <br></br>
            <br></br>
            3. After clicking on the button go to the left hand side of the page and click on which project you would like to be ranked in that position.
            <br></br>
            <br></br>
            4. Repeat this process until you have five projects selected.
            <br></br>
            <br></br>
            5. Once you have selected your five ranked preferences projects scroll down to click the submit button.
            <br></br>
            <br></br>
            </p>
            <button onClick={helppopupclose}>Close</button>
            <br></br>
            <br></br>
            </div>

            <div id = "projectPreferenceselements">
                {/* <button onClick={sendPreferences}>
                    send prefs
                </button> */}
                <h2 id="">Project Preferences
                 {/* This console.log needs to stay so that it calls formatBiddingDate beforehand */}   
                {console.log(formatBiddingDate(biddingtime))}
                <br></br>
                Form Will Close On: 
                <br></br>{formatBiddingDate(biddingtime)}
                </h2>
                <div className="preferenceProjects">
                    {/* <ul> */}

                    {projects.filter(project => project.published === 'true' && project.semester_id === 1).map(project => (
                   (<div onClick={() => handleclick(project)} id="proj">
                   <Project id={project.id} name={project.title} description={project.description}/> </div>)))}

                {/* {itemList.map((project) => 
                    (<div onClick={() => handleclick(project)}>
                    {project}
                    </div>))} */}
                    {/* </ul> */}
                </div>
                <button id ="?" onClick={helppopup}>?</button>
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
                {/* {chosenproject.map((chosen, index) =>
                <div>
                {chosen ? chosen : <Project/ >}
                </div>
            )} */}
                </div>
                <div id = "return">
                <Link to="/pages/projects-available"><button>Return to Projects</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectPreferences;