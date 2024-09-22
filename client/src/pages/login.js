import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


import '../App.css';


const Login = () => {

    // Hides login form, shows register form
    const sign_up = () => {
        document.getElementById('loginright').style.display = "none";
        document.getElementById('createacc').style.display = "block";

    }

        // Hides register form, shows register form
        const login_form = () => {
            document.getElementById('loginright').style.display = "block";
            document.getElementById('createacc').style.display = "none";
    
        }

    // Hides both register and login forms
    const form_close = () => {
        document.getElementById('loginright').style.display = "none";
        document.getElementById('createacc').style.display = "none";
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

    useEffect(() => {

        
    const client_view = () => {
        form_close();
        document.getElementById('adminSideBar').style.display = "none";
        document.getElementById('clientSideBar').style.display = "block";
        document.getElementById('studentSideBar').style.display = "none";
    }

    const student_view = () => {
        form_close();
        document.getElementById('adminSideBar').style.display = "none";
        document.getElementById('clientSideBar').style.display = "none";
        document.getElementById('studentSideBar').style.display = "block";
    }

    const admin_view = () => {
        form_close();
        document.getElementById('adminSideBar').style.display = "block";
        document.getElementById('clientSideBar').style.display = "none";
        document.getElementById('studentSideBar').style.display = "none";
    }

    const not_logged_in = () => {
        document.getElementById('adminSideBar').style.display = "none";
        document.getElementById('clientSideBar').style.display = "none";
        document.getElementById('studentSideBar').style.display = "none";
    }

        // Gets the token from the cookie sent from the google callback
        const getToken = async () => {
            const token = Cookies.get('authToken');
            if (token) {

                // Stores the resulting Auth Token
                localStorage.setItem("authToken", token);
                console.log("Token stored:", token);

            }

            const stored_token = localStorage.getItem("authToken");

            console.log("token: ", stored_token);
            
            if(stored_token !== "") {

            try {
                let res = await fetch("http://localhost:3001/api/auth/role", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authToken": `${stored_token}`,

                    },
                });
                const resJson = await res.json();

                const role = resJson.role;

                if (res.status === 200) {

                    if (role === "client") {
                        console.log("user is a client");
                        client_view();
                    } else if (role === "student") {
                        console.log("user is a student");
                        student_view();
                    } else if (role === "admin") {
                        console.log("user is an admin");
                        admin_view();
                    }

                } else {
                    console.log("An error occurred during login");
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            login_form();
            not_logged_in();
        }


        };

        getToken(); // This function gets called every time the page is rendered, (page refresh or redirects)
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
                    <h1> Login </h1>
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
                    <a href="http://localhost:3001/api/auth/google/role/client" id="googleSignInLink">Sign in with Google</a>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <button type="new" href="#" onClick={sign_up}>
                        CREATE AN ACCOUNT
                    </button>
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