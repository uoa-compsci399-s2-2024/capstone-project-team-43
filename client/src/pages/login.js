
import React from "react";

import '../App.css';


const login = () => {

    const sign_up =() =>{
        document.getElementById('loginright').style.display = "none";
        document.getElementById('createacc').style.display = "none";
        document.getElementById('createacc').style.display = "block";
    }

    return(
    <div className="login+signup">
    <div className="login">
        <div className="login-left">
            <div id="viewcap">
                <h3>Want to view previous 
                    <br></br>
                Computer Science Capstone projects?</h3>
                <button><a href="https://www.capitalise.space/">VISIT CAPITALISE</a></button>
            </div>
        </div>

        <div className="login-right" id="loginright">
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
            <button type="new" href="#" onClick={sign_up}>
            CREATE AN ACCOUNT
            </button>
        </div>

       <div id="createacc" className="login-right">
       <h1> Create an Account </h1>
            <form className="login-form">
            <label>
                <input type="text" placeholder="First Name*"/>
            </label>
            <label>
                <input type="text" placeholder="Last Name*"/>
            </label>
            <label>
                <input type="text" placeholder="Email Address*"/>
            </label>
            <label>
                <input type="password" placeholder="Password*"/>
            </label>
            <button>
            CREATE AN ACCOUNT
            </button>
    </form>
       </div>

    </div>
    </div>
    );
};

export default login;