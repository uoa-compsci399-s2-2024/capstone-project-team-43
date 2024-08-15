
import React from "react";

import '../App.css';



const projectProposal = () => {

    const showinfo = () => {
        document.getElementById('info').style.display = "block";
        document.getElementById('one').style.display = "none";
        document.getElementById('four').style.display = "none";
        document.getElementById('eight').style.display = "none";
        document.getElementById('eleven').style.display = "none";

        document.getElementById('infoButton').style.backgroundColor = "lightblue";
        document.getElementById('oneButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('fourButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('eightButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('elevenButton').style.backgroundColor = "#EAEAEA";
    }
    
    const show123 = () => {
        document.getElementById('info').style.display = "none";
        document.getElementById('one').style.display = "block";
        document.getElementById('four').style.display = "none";
        document.getElementById('eight').style.display = "none";
        document.getElementById('eleven').style.display = "none";

        document.getElementById('infoButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('oneButton').style.backgroundColor = "lightblue";
        document.getElementById('fourButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('eightButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('elevenButton').style.backgroundColor = "#EAEAEA";
    }


    const show4567 = () => {
        
        document.getElementById('info').style.display = "none";
        document.getElementById('one').style.display = "none";
        document.getElementById('four').style.display = "block";
        document.getElementById('eight').style.display = "none";
        document.getElementById('eleven').style.display = "none";

        document.getElementById('infoButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('oneButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('fourButton').style.backgroundColor = "lightblue";
        document.getElementById('eightButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('elevenButton').style.backgroundColor = "#EAEAEA";
    }

    const show8910 = () => {
        
        document.getElementById('info').style.display = "none";
        document.getElementById('one').style.display = "none";
        document.getElementById('four').style.display = "none";
        document.getElementById('eight').style.display = "block";
        document.getElementById('eleven').style.display = "none";

        document.getElementById('infoButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('oneButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('fourButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('eightButton').style.backgroundColor = "lightblue";
        document.getElementById('elevenButton').style.backgroundColor = "#EAEAEA";
    }

    const show111213 = () => {
        
        document.getElementById('info').style.display = "none";
        document.getElementById('one').style.display = "none";
        document.getElementById('four').style.display = "none";
        document.getElementById('eight').style.display = "none";
        document.getElementById('eleven').style.display = "block";

        document.getElementById('infoButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('oneButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('fourButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('eightButton').style.backgroundColor = "#EAEAEA";
        document.getElementById('elevenButton').style.backgroundColor = "lightblue";

    }

    const next = () => {
        if (document.getElementById('info').style.display === 'block') 
            {
                show123();
            }
            else if(document.getElementById('one').style.display === 'block') 
                {
                    show4567();
                }
                else if(document.getElementById('four').style.display === 'block') 
                    {
                        show8910(); 
                    }
                    else if(document.getElementById('eight').style.display === 'block') 
                        {
                            show111213();
                        }
                    


    }



  
    return(
        
        <div className="projectProposal">
            <div className="proposal-left">
            
            </div>
    
            <div className="proposal-right">
                <h1> Project Proposal Form </h1>


                <form className="proposalForm">
                <div id="info">
                <h3>Deadline</h3>

                Please complete this form if you wish to propose a project for the COMPSCI 399 Capstone Course in S2 2024. The deadline for form submission is June 30, 2024, by 11:59 pm.

                <br />Note: We accept applications throughout the year, but if the deadline isn't met, we will consider the project only for the following semester.

                <h3>Project Requirements</h3>
                <br />The proposed project should be a research or software development project, suitable in size to be completed within the 12-week duration of the semester. It should present a challenge for a team consisting of 5-6 students. For example, if you are involved in an ongoing research/development project and seek assistance in developing a specific module, you can propose it as a potential project. Alternatively, if you are in a service role and require support in creating a system to facilitate or automate certain aspects of your work, you can suggest a project for consideration.

                <br />Each team is expected to allocate approximately 7-8 hours per person per week to project development. The team will produce a prototype system every fortnight, progressively enhancing its functionality.

                <h3>Supervision Requirements</h3>
                <br />Team(s) will meet with you (or your nominated representative) at least once every fortnight to ensure that the project is going in the right direction.
                <br />There will be a final project presentation session (probably in the last week of the semester) that we would expect you (or your nominated representative) to attend and provide us with feedback on your team's performance.

                <h3>Contacts & Information</h3>
                <br />You can find examples of projects created by capstone students following this link: https://www.capitalise.space/
                <br />The course overview can be found here: https://courseoutline.auckland.ac.nz/dco/course/COMPSCI/399/1243 
                <br /> If you have any questions, please feel free to contact Anna Trofimova (anna.trofimova@auckland.ac.nz) or Asma Shakil (asma.shakil@auckland.ac.nz)
                </div>
                <div id="one">
                <label>
                    1. Main client's (applicant's) name* <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                <label>
                <br />2.Main client's (applicant's) email* <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                <label>
                <br />3. Other clients' details<br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                </div>

                <div id="four">
                <label>
                4. Project title* <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                <label>
                <br />5. Project description* <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                <label>
                <br />6.Desired output* <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                <label>
                <br />7.Special equipment requirements* <br />
                <input type="radio" id="html" name="fav_language" value="HTML" /> No<br />
                <input type="radio" id="html" name="fav_language" value="HTML" /> Yes<br />
                <input type="text" placeholder="Please specify"/>
                </label>
                </div>

                <div id="eight">
                <label>
                8.Number of teams* <br />
                <input type="radio" id="html" name="fav_language" value="HTML" /> No, only 1 team<br />
                <input type="radio" id="html" name="fav_language" value="HTML" /> Yes, up to 4 teams<br />
                <input type="radio" id="html" name="fav_language" value="HTML" />
                    <input type="text" placeholder="Other"/>
                </label>
                <label>
                <br />9.Desired team skills <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                <label>
                <br />10.Available resources <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                </div>
                
                <div id="eleven">
                <label>
                11.Future consideration <br />
                <input type="radio" id="html" name="fav_language" value="HTML" /> Yes<br />
                <input type="radio" id="html" name="fav_language" value="HTML" /> No<br />
                </label>
                <label>
                <br />12.Meeting attendance:* <br />
                <input type="checkbox" id="check" value="check" />
                I confirm that I will be able to attend 6 meetings with students, scheduled 2-3 weeks apart.<br />

                </label>
                <label>
                <br />13.Final presentation attendance:* <br />
                <input type="checkbox" id="check" value="check" />
                I confirm that I will be able to attend final presentation in-person.<br />
             
                </label>
                </div>

                </form>


                <div id="buttons">
                    <div id="infoButton">
                <button onClick={showinfo} id="button">I</button></div>
                <div id="oneButton">
                <button onClick={show123} id="button">1</button>
                <button onClick={show123} id="button">2</button>
                <button onClick={show123} id="button">3</button></div>
                <div id="fourButton">
                <button onClick={show4567} id="button">4</button>
                <button onClick={show4567} id="button">5</button>
                <button onClick={show4567} id="button">6</button>
                <button onClick={show4567} id="button">7</button></div>
                <div id="eightButton">
                <button onClick={show8910} id="button">8</button>
                <button onClick={show8910} id="button">9</button>
                <button onClick={show8910} id="button">10</button> </div>
                <div id="elevenButton">
                <button onClick={show111213} id="button">11</button>
                <button onClick={show111213} id="button">12</button>
                <button onClick={show111213} id="button">13</button></div>
                

                <button onClick={next} id="nextButton">Next</button>
                
                </div>

        </div>


       <script>

       </script>
       

        </div>
        
    )

}




export default projectProposal;