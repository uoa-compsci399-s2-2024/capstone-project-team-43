import React from "react";

import '../App.css';

const Contact = () =>{
    return(
        <div id="contact" className="contactpage">
            <br></br>
            <h2>Contact</h2>
                <p>COMPSCI399 course coordinators
                    <br></br>Asma Shakil
                    <br></br>asma.shakil@auckland.ac.nz
                    <br></br>
                    <br></br>Anna Trofimova
                    <br></br>anna.trofimova@auckland.ac.nz</p>
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

export default Contact;