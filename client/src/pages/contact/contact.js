import React from "react";
import './contact.css';
import { ReactComponent as CapitaliseLogo } from '../../media/visit-capitalise.svg';

const Contact = () =>{
    return(
        <main className="contact-page">
            <div className="content">
                <div className="page-heading">
                    <h1>Contact</h1>
                </div>
                <div className="page-content">
                    <div className="content-section">
                        <p>For any questions or queries, please reach out to the 
                            COMPSCI 399 course coordinators:
                            <br></br><br></br>Asma Shakil
                            <br></br>asma.shakil@auckland.ac.nz
                            
                            <br></br><br></br>Anna Trofimova
                            <br></br>anna.trofimova@auckland.ac.nz</p>
                    </div>
                </div>
                {/* link to capitalise */}
                <div className='capitalise-container'>
                    <p>Want to view previous Capstone projects?</p>
                    <button className='capitalise-button'
                        onClick={() => window.open('https://www.capitalise.space/', '')}>
                            <CapitaliseLogo className='capitalise-logo'/>
                            {/* <img src = {require('./../../media/capitalise.svg')}></img> */}
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Contact;