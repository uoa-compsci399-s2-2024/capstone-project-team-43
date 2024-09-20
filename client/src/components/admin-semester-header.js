import React from "react";

import '../App.css';


function Header(props){
    const drop = () =>{
        
        if(document.getElementById('dropdown').style.display == "block"){
            document.getElementById('dropdown').style.display = "none";
        }else{
            document.getElementById('dropdown').style.display = "block";
        }

    };

    let semesters = ["sem1", "sem2", "sem3", "sem4", "sem5"];

    return(
        <div className="head"> 

        <div id="title">
        {/* <h3>2024 - Semester 2</h3> */}

        <h3>{props.semester}</h3>
        <button id="button" onClick={drop}>^</button>
        </div>
        
        <div id="dropdown">
            <ul>
            <li>
                    <a href="/pages/projects-admin"> {props.current}</a>
                    </li>
            {
                semesters.map(semester => (
                    <li>
                    <a href="/pages/projects-archive"> {semester}</a>
                    </li>
                ))
            }
            </ul>

        </div>

        </div>
    )
}



export default Header;