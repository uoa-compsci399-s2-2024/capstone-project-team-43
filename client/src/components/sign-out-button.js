import Cookies from 'js-cookie';

export const handleSignOut = async () => {
    try {
        const token = localStorage.getItem('authToken');
        console.log("TAKING TOKEN: ", token);
        let res = await fetch("http://localhost:3001/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken": `${token}`,
            },
        });

        if (res.status !== 200) {
            throw new Error('Logout was Unsuccessful');
        }

        // Clears local storage
        localStorage.setItem('authToken', "");
        Cookies.remove('authToken');
        console.log("Successfully Logged out!");
        window.location.href = '/';
    } catch (err) {
        console.log(err);
    }
};

// shows sign out button and handles sign out
const SignOutButton = () => {
    return (
        <button className='main-button sign-out-button' onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOutButton;
