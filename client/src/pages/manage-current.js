import React from "react";

import '../App.css';

const ManageCurrent = () =>{

    const retire = () =>{
        alert("you clicked retire");
    }

    const save = () =>{
        alert("you clicked save");
    }

    const uploadteams = () =>{
        alert("you clicked upload files");
    }

    const uploadstudents = () =>{
        alert("you clicked upload files");
    }


    return(
        <div id="managecurrent" className="managecurrentpage">
            <div id="managecurrentpage-heading">
                <p>Manage Current Semester</p>
                <h1>Semester Two, 2024</h1>
            </div>
                <form className="managecurrentpage-semster1">
                    <p>1. Semester Dates</p>
                    <p className = "leftside">semester begins:</p>
                    <p className = "rightside">semester ends:</p>
                    <br></br>
                    <br></br>
                    <div className="begin">
                    <label>
                    <input type="short" placeholder="DD"/>
                    </label>
                    /
                    <label>
                    <input type="short" placeholder="MM"/>
                    </label>
                    /
                    <label>
                    <input type="long" placeholder="YYYY"/>
                    </label>
                    </div>
                    <div className="end">
                    <label>
                    <input type="short" placeholder="DD"/>
                    </label>
                    /
                    <label>
                    <input type="short" placeholder="MM"/>
                    </label>
                    /
                    <label>
                    <input type="long" placeholder="YYYY"/>
                    </label>
                    </div>
                    <br></br>
                </form>
                <form>
                <p>2. Capstone students list</p>
                Please upload a .csv file of the list of this semester’s students for the COMPSCI 399 Capstone course.

                <button id="uploadstudent" className = "upload" onClick={uploadstudents}>Upload File</button>
                </form>

                <form>
                <p>3. Capstone teams list</p>
                Please upload a .csv file of the list of this semester’s teams for the COMPSCI 399 Capstone course.
                <button id="uploadteam" className = "upload" onClick = {uploadteams}>Upload File</button>
                </form>

                <form className="managecurrentpage-semster2">
                <p>4. Project Bidding Timeframe</p>
                    <p className = "leftside">project bidding begins:</p>
                    <p className = "rightside">project bidding ends:</p>
                    <br></br>
                    <div className="begin">
                    <label>
                    <input type="short" placeholder="DD"/>
                    </label>
                    /
                    <label>
                    <input type="short" placeholder="MM"/>
                    </label>
                    /
                    <label>
                    <input type="long" placeholder="YYYY"/>
                    </label>
                    </div>
                    <div className="end">
                    <label>
                    <input type="short" placeholder="DD"/>
                    </label>
                    /
                    <label>
                    <input type="short" placeholder="MM"/>
                    </label>
                    /
                    <label>
                    <input type="long" placeholder="YYYY"/>
                    </label>
                    </div>
                </form>
                <br></br>
                <div className="managecurrentpage-buttons">
                <button className="retire" onClick = {retire}>RETIRE</button>
                <br></br>
                <button className="save" onClick = {save}>SAVE</button>
                </div>
            </div>
    )
}

export default ManageCurrent;