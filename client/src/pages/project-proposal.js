
import React from "react";

import '../App.css';



const projectProposal = () => {
    
    const show123 = () => {
        document.getElementById('one').style.display = "block";
        document.getElementById('four').style.display = "none";
        document.getElementById('eight').style.display = "none";
        document.getElementById('eleven').style.display = "none";
    }


    const show4567 = () => {
        document.getElementById('four').style.display = "block";
        document.getElementById('one').style.display = "none";
        document.getElementById('eight').style.display = "none";
        document.getElementById('eleven').style.display = "none";
    }

    const show8910 = () => {
        document.getElementById('eight').style.display = "block";
        document.getElementById('one').style.display = "none";
        document.getElementById('four').style.display = "none";
        document.getElementById('eleven').style.display = "none";

    }

    const show111213 = () => {
        document.getElementById('eleven').style.display = "block";
        document.getElementById('one').style.display = "none";
        document.getElementById('four').style.display = "none";
        document.getElementById('eight').style.display = "none";

    }



    const shoot = () => {
        alert("Great Shot!");
      }
  
    return(
        
        <div className="projectProposal">
            <div className="proposal-left">
            
            </div>
    
            <div className="proposal-right">
                <h1> Project Proposal Form </h1>


                <form className="propForm1">

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
                <br />7. Special equipment requirements* <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                </div>

                <div id="eight">
                <label>
                8. Number of teams* <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                <label>
                <br />9. Desired team skills <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                <label>
                <br />10. Available resources <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                </div>
                
                <div id="eleven">
                <label>
                11. Future consideration <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                <label>
                <br />12. Meeting attendance:* <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                <label>
                <br />13. Final presentation attendance:* <br />
                    <input type="text" placeholder="Enter your answer"/>
                </label>
                </div>

                </form>
                <br /><br />
                <div id = "button-container">
                <div id="buttons">
                <button onClick={show123} id="button">1</button>
                <button onClick={show123} id="button">2</button>
                <button onClick={show123} id="button">3</button>
                <button onClick={show4567} id="button">4</button>
                <button onClick={show4567} id="button">5</button>
                <button onClick={show4567} id="button">6</button>
                <button onClick={show4567} id="button">7</button>
                <button onClick={show8910} id="button">8</button>
                <button onClick={show8910} id="button">9</button>
                <button onClick={show8910} id="button">10</button>
                <button onClick={show111213} id="button">11</button>
                <button onClick={show111213} id="button">12</button>
                <button onClick={show111213} id="button">13</button>
                </div>
                </div>


        </div>


       <script>

       </script>
       

        </div>
        
    )

}




export default projectProposal;