import React from "react";

import '../App.css';

const ManageFuture = () =>{

    const save = () =>{
        alert("you clicked save");
    }

    return(
        <div id="managefuture" className="managefuturepage">
            <div id="managefuturepage-heading">
                <p>Manage Future Semsters</p>
                <h1>Semster One, 2025</h1>
            </div>
                <form className="managefuturepage-semster1">
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
                <form className="managefuturepage-semster2">
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
                <div className="managefuturepage-buttons">
                <button className="save" onClick = {save}>SAVE</button>
                </div>
            </div>
    )
}

export default ManageFuture;