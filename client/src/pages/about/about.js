import React from "react";

import './about.css';
import { ReactComponent as CapitaliseLogo } from '../../media/visit-capitalise.svg';

const About = () =>{
    return(
        <main className="about-page">
            <div className="content">
                <div className="page-heading">
                    <h1>About</h1>
                </div>
                <div className="page-content">
                    <div className="content-section">
                        <p>Cornerstone was created to support the staff, students, and clients of 
                        the Computer Science Capstone course by simplifying and streamlining the processes of 
                        project proposal, bidding, and allocation.
                        <br></br><br></br> The website was created as the solution to a Capstone project proposed by course coordinators in 2024. 
                        The Capstone student group 'Error 404' developed Cornerstone, and was formed of members Aleks Cheifetz, Eyal Blumental Erez, Isabella Woolley, 
                        Jade Li, Jenny Lu, and Melissa Cowie.</p>
                    </div>
                    {/* link to capitalise */}
                </div>
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

export default About;