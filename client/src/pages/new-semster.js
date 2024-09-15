import React from "react";

import '../App.css';

const NewSemster = () =>{
    return(
        <div id="newsemster" className="newsemsterpage">
            <div id="newsemsterpage-heading">
                <p>Create a Semester</p>
                <h1>New Semester</h1>
            </div>
                <form className="newsemsterpage-semster1">
                    <p className = "leftside">Semster One</p>
                    <p className = "rightside">Semester Two</p>
                    <br></br>
                    <br></br>
                    <p>1. Semster Dates</p>
                    <p className = "leftside">semster begins:</p>
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
                <form className="newsemsterpage-semster2">
                <p>2. Project Bidding Timeframe</p>
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
            </div>
    )
}

export default NewSemster;