import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import '../App.css';


const Login = () => {

    // Hides login form, shows register form
    const sign_up = () => {
        document.getElementById('loginright').style.display = "none";
        document.getElementById('createacc').style.display = "block";
    }

    // Constants to store form data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handles the login form submission, stores the response auth token in local storage
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Email: ", email);
        console.log("Password: ", password);
        try {
            let res = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const resJson = await res.json();

            // Stores the resulting Auth Token
            localStorage.setItem("authToken", resJson.token);
            console.log("Token stored:", resJson.token);

            if (res.status === 200) {

                //If login is successful, clears the text in form
                setEmail("");
                setPassword("");

            } else {
                console.log("An error occurred during login")
            }
        } catch (err) {
            console.log(err);
        }
        window.location.reload();
    };

    // Handles the register form submission, stores the response auth token in local storage
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:3001/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    company: "null",
                }),
            });
            const resJson = await res.json();

            // Stores the resulting Auth Token
            localStorage.setItem("authToken", resJson.token);
            console.log("Token stored:", resJson.token);

            if (res.status === 200) {

                //If registration is successful, clears the text in form
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
            } else {
                console.log("An error occurred during login");
            }
        } catch (err) {
            console.log(err);
        }
        window.location.reload();
    };

    // Hides register form, shows register form
    const login_form = () => {
    document.getElementById('loginright').style.display = "block";
    document.getElementById('createacc').style.display = "none";
}

    useEffect(() => {
        try {
            const token = localStorage.getItem("authToken");
            if (token === "" || token === null || token === "null") {
                login_form();
            } else {
                const decoded = jwtDecode(token);
                const role = decoded.role;
    
                if (role === null) {
                    login_form();
                }
            }
    
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
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
                    <div className='login-form-container'>
                        <div className='login-header'>
                            <h1>Client Login</h1>
                        </div>
                        <div className='login-button-container'>
                            <form className="login-form" onSubmit={handleSubmit}>
                                <label>
                                    <input type="email" placeholder="Email Address*" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </label>
                                <label>
                                    <input type="password" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </label>
                                <button type="submit">SIGN IN</button>

                            </form>
                            <br></br>
                            <div className='login-google-container'>
                                <button type="new" className = 'login-google-button' onClick={() => window.location.href = "http://localhost:3001/api/auth/google/role/student"}>Google Sign in as Student</button><br></br>
                                <button type="new" className = 'login-google-button' onClick={() => window.location.href = "http://localhost:3001/api/auth/google/role/client"}>Google Sign in as Client</button><br></br>
                                <button type="new" className = 'login-google-button' onClick={() => window.location.href = "http://localhost:3001/api/auth/google/role/admin"}>Google Sign in as Admin</button><br></br>
                            </div>
                        
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <button type="new" href="#" onClick={sign_up}>
                                CREATE AN ACCOUNT
                            </button>
                        </div>
                    </div>
                </div>

                <div id="createacc" className="login-right">
                    <h1> Create an Account </h1>
                    <form className="login-form" onSubmit={handleRegister}>
                        <label>
                            <input type="text" placeholder="First Name*" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </label>
                        <label>
                            <input type="text" placeholder="Last Name*" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </label>
                        <label>
                            <input type="email" placeholder="Email Address*" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </label>
                        <label>
                            <input type="password" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </label>
                        <button type="submit">
                            CREATE AN ACCOUNT
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;