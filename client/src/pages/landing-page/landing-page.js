import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../../utils/auth';
import './landing-page.css';
import { ReactComponent as CapitaliseLogo } from './../../media/capitalise.svg';
import googleIcon from './../../media/google.webp';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLogin, setIsLogin] = useState(false);

    const [userType, setUserType] = useState('');

    const navigate = useNavigate();

    // redirect to dashboard if user not signed in
    useEffect(() => {
        async function checkLoggedIn() {
            try {
                if (await isLoggedIn()) {
                    console.log('logged in!')
                    navigate("/dashboard");
                }
                console.log('not logged in!');
                navigate("/");
            } catch (error) {
                console.error('Failed to login:', error);
            }
        }
        checkLoggedIn();
    }, [navigate]);

    // handles subheading change when hovering over user type buttons
    const [noHover, setNoHover] = useState(true);
    const [studentHover, setStudentHover] = useState(false);
    const [clientHover, setClientHover] = useState(false);
    const [adminHover, setAdminHover] = useState(false);

    // show relevant tooltip during button hover 
    const handleMouseEnter = (buttonId) => {
        if (buttonId === 'hoverableStudent') {
            setStudentHover(true); //'Currently enrolled in CS399?');
        } else if (buttonId === 'hoverableClient') {
            setClientHover(true); //'Submitting a project for Capstone Students?');
        } else if (buttonId === 'hoverableAdmin') {
            setAdminHover(true); //'Capstone course coordinator?');
        }
        // hide general tool tip
        setNoHover(false);
    };

    // hide relevant tooltip after button hover 
    const handleMouseLeave = (buttonId) => {

        if (studentHover) {
            setStudentHover(false); //'Currently enrolled in CS399?');
        } else if (clientHover) {
            setClientHover(false); //);
        } else if (adminHover) {
            setAdminHover(false); //'Capstone course coordinator?');
        }
        // show general tooltip again
        setNoHover(true);
    };

    // Handles the login form submission, stores the response auth token in local storage
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                credentials: 'include',
            });

            if (res.status === 200) {
                // If login is successful, clears the text in form
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
    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    company: null,
                }),
                credentials: 'include',
            });

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

    const switchForm = () => {
        console.log('showing login form', isLogin);
        setIsLogin(!isLogin);
        console.log('showing login form', isLogin);
    }


    const handleGoBack = () => {
        // reset user type to none
        setUserType('');

        // force delay any hover-activated tooltips
        setNoHover(true);
        setClientHover(false);
        setAdminHover(false);
        setStudentHover(false);

        setTimeout(() => {
            setNoHover(true);
            setClientHover(false);
            setAdminHover(false);
            setStudentHover(false);
        }, 5000);
    }

    // Only used for console debugging
    const checkLogin = async () => {
        console.log('Logged in: ', await isLoggedIn());
    }
    checkLogin();

    return (
        <div className="landing-page" id="fill">
            <div className='landing-header'>
                <img className='logo' src={require('../../media/logo.png')}></img>
                <h1>Cornerstone</h1>
                <h2>Connecting Computer Science Students with Innovative Projects</h2>
            </div>
            {!userType && <div className='content-container'>
                <div className='select-user-form-container'>
                    <div className='tooltip-container'>
                        {/* default tool tip */}
                        <p className={`default-tooltip ${noHover ? 'visible' : ''}`}>
                            Select User Type
                        </p>
                        {/* specific tooltips shown when button is hovered over */}
                        <p className={`tooltip ${studentHover ? 'visible' : ''}`} style={{ opacity: studentHover ? 1 : 0 }}>
                            Currently enrolled in CS399?
                        </p>
                        <p className={`tooltip ${clientHover ? 'visible' : ''}`} style={{ opacity: clientHover ? 1 : 0 }}>
                            Wanting to propose a project and become a client?
                        </p>
                        <p className={`tooltip ${adminHover ? 'visible' : ''}`} style={{ opacity: adminHover ? 1 : 0 }}>
                            Teaching CS399?
                        </p>
                    </div>
                    <button className='main-button student-button' id='hoverableStudent'
                        onMouseEnter={() => handleMouseEnter('hoverableStudent')}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => setUserType('student')}>
                        Student
                    </button>
                    <button className='main-button client-button' id='hoverableClient'
                        onMouseEnter={() => handleMouseEnter('hoverableClient')}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => setUserType('client')}>
                        Client
                    </button>
                    <button className='main-button admin-button' id='hoverableAdmin'
                        onMouseEnter={() => handleMouseEnter('hoverableAdmin')}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => setUserType('admin')}>
                        Administrator
                    </button>
                </div>
                {/* link to capitalise */}
                <div className='capitalise-container'>
                    <p>Want to view previous Capstone projects?</p>
                    <button className='capitalise-button'
                        onClick={() => window.open('https://www.capitalise.space/', '')}>
                        Visit <CapitaliseLogo className='capitalise-logo' />
                        {/* <img src = {require('./../../media/capitalise.svg')}></img> */}
                    </button>
                </div>
            </div>}
            {/*  Redirect Students to google sign in   */}
            {(userType === 'student') && (
                <div className='content-container student-admin-login'>
                    <div className='form'>
                        <p className='form-head'>Sign in</p>
                        <button className='main-button' onClick={() => window.location.href = "/api/auth/google/role/student"}>
                            <img src={googleIcon} alt='icon' className='upload-icon'></img>
                            Sign in with your UoA Google account
                        </button>
                        <button onClick={handleGoBack} className='main-button form-button'>
                            Go Back
                        </button>
                    </div>
                    <div className='capitalise-container'>
                        <p>Want to view previous Capstone projects?</p>
                        <button className='capitalise-button'
                            onClick={() => window.open('https://www.capitalise.space/', '')}>
                            Visit <CapitaliseLogo className='capitalise-logo' />
                            {/* <img src = {require('./../../media/capitalise.svg')}></img> */}
                        </button>
                    </div>
                </div>
            )}
            {/*  Redirect Admins to google sign in   */}
            {(userType === 'admin') && (
                <div className='content-container student-admin-login'>
                    <div className='form'>
                        <p className='form-head'>Sign in</p>
                        <button className='main-button' onClick={() => window.location.href = "/api/auth/google/role/admin"}>
                            <img src={googleIcon} alt='icon' className='upload-icon'></img>
                            Sign in with your UoA Google account
                        </button>
                        <button onClick={handleGoBack} className='main-button form-button'>
                            Go Back
                        </button>
                    </div>
                    <div className='capitalise-container'>
                        <p>Want to view previous Capstone projects?</p>
                        <button className='capitalise-button'
                            onClick={() => window.open('https://www.capitalise.space/', '')}>
                            Visit <CapitaliseLogo className='capitalise-logo' />
                            {/* <img src = {require('./../../media/capitalise.svg')}></img> */}
                        </button>
                    </div>
                </div>
            )}
            {/* Redirect Clients to create an account or sign in with google */}
            {(userType === 'client' && isLogin) && (
                <div className='content-container login'>
                    <form className="form login" onSubmit={handleSubmitLogin} method="POST">
                        <p className='form-head'>Sign in</p>
                        <label>
                            <input type="email" placeholder="Email Address*" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </label>
                        <label>
                            <input type="password" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </label>
                        <div className='form-button-container'>
                            <button type="button" onClick={handleGoBack} className='main-button form-button'>
                                Go Back
                            </button>
                            <button type="submit" className='main-button form-button'>
                                Sign In
                            </button>
                        </div>
                        <div className='google-container login'>
                            <p>Or</p>
                            <button className='main-button' onClick={() => window.location.href = "/api/auth/google/role/client"}>
                                <img src={googleIcon} alt='icon' className='upload-icon'></img>
                                Sign in with Google
                            </button>
                        </div>
                    </form>
                    <div className='redirect-container'>
                        <p className='redirect-text'>Don't have an account yet?</p>
                        <a className='redirect-text link' onClick={switchForm}> Sign Up</a>
                    </div>
                </div>)}
            {(userType === 'client' && !isLogin) && (
                <div className='content-container register'>
                    <form className="form register" onSubmit={handleSubmitRegister} method="POST">
                        <p className='form-head'>Create an Account</p>
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
                        <div className='form-button-container'>
                            <button onClick={handleGoBack} className='main-button form-button'>
                                Go Back
                            </button>
                            <button type="submit" className='main-button form-button'>
                                Create Account
                            </button>
                        </div>
                        <div className='google-container register'>
                            <p>Or</p>
                            <button className='main-button' onClick={() => window.location.href = "/api/auth/google/role/client"}>
                                <img src={googleIcon} alt='icon' className='upload-icon'></img>
                                Sign in with Google
                            </button>
                        </div>
                    </form>
                    <div className='redirect-container'>
                        <p className='redirect-text'>Already Registered?</p>
                        <a className='redirect-text link' onClick={switchForm}>Sign in</a>
                    </div>
                </div>)}
        </div>
    )
};
export default LandingPage;