
import React from "react";

import '../App.css';


const Login = () => {
    return(
    <div className="login">
        <div className="login-left">
            
        </div>

        <div className="login-right">
            <h1> Login </h1>
            <form className="login-form">
            <label>
                <input type="text" placeholder="Email Address*"/>
            </label>
            <label>
                <input type="text" placeholder="Password*"/>
            </label>
            <button type="submit">
            SIGN IN
            </button>
    </form>

            <button type="new" href="#">
            CREATE AN ACCOUNT
            </button>
        </div>
       

    </div>

    );
};

export default Login;