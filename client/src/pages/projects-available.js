
import React from "react";

import '../App.css';

import Project from "../components/project";


const projectsAvailable = () => {
    let items=['Item 1','Item 2','Item 3','Item 4','Item 5'];

    let itemList=[];

    items.forEach((item)=>{
      itemList.push(
         <Project name={item}/>
        )
    })

    return(
        <div className="projectsAvailable">

        {itemList}

        </div>

        
    );
};

export default projectsAvailable;