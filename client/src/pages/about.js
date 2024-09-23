import React from "react";

import '../App.css';

const About = () =>{
    return(
        <div id="aboutus" className="aboutuspage">
            <br></br>
            <h1>About Us</h1>
                <p>Team Error 404 built Cornerstone to support the staff, students and clients of 
                <br></br>the COMPSCI399 capstone course by simplifying and streamlining the processes of 
                <br></br>project proposal, bidding and allocation.
                <br></br>
                <br></br>Team Error 404 was formed by Aleks Cheifetz, Eyal Blumental Erez, Isabella Woolley, 
                <br></br>Jade Li, Jenny Lu and Melissa Cowie.</p>
                <br></br>
                <div id="viewprevious">
                    <p>
                    Want to view previous
                    <br></br>
                    Computer Science Capstone projects?
                    </p>
                    <button><a href="https://www.capitalise.space/">VISIT CAPITALISE</a></button>
                </div>
        </div>
    )
}

export default About;