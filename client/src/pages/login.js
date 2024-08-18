
import React from "react";

import '../App.css';


const login = () => {
    return(
    <div className="login">
        <div className="login-left">
            <div id="viewcap">
                <h3>Want to view previous 
                    <br></br>
                Computer Science Capstone projects?</h3>
                <button><a href="https://www.capitalise.space/">VISIT CAPITALISE</a></button>
            </div>
        </div>

        <div className="login-right">
            <h1> Login </h1>
            <form className="login-form">
            <label>
                <input type="text" placeholder="Email Address*"/>
            </label>
            <label>
                <input type="password" placeholder="Password*"/>
            </label>
            <button type="submit">
            SIGN IN
            </button>
    </form>
    <br></br>
    <hr></hr>
    <br></br>
            <button type="new" href="#">
            CREATE AN ACCOUNT
            </button>
        </div>
       

    </div>

    );
};

export default login;