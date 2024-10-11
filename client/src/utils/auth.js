import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

// This gets the user's ID from the token but does not validate the token **Should not be used to validate tokens use getUserRole() instead**
export const getUserID = () => {
    try {
        const token = Cookies.get('authToken');
        if (!token) {
            console.log("User not logged in");
            return null;
        } else {
            const decoded = jwtDecode(token);
            console.log(decoded);
            return decoded.userId;
        }
    } catch (err) {
        console.log('Error getting user ID:', err);
        return null;
    }
};

/**
 *  This is the main authentication function, it gets the cookie containing the authentication token, then sends it to the backend to ensure it's valid.
 *  Once the backend is satisfied that the token is valid, a status code 200 will be returned in the response, any other status code means that the token is invalid
 *  After that the function checks that the path the user accessing is valid.
 */
export const getUserRole = async () => {
    try {
        console.log("GETTING ROLE");
        const token = Cookies.get('authToken');

        if (!token) {
            await checkPath();
            return null;
        }

        let res = await fetch("http://localhost:3001/api/auth/role", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authToken": `${token}`,

            }
        });

        const resJson = await res.json();

        if (res.status !== 200) {
            // Clears authToken cookie as its invalid
            Cookies.remove("authToken");
            console.log("An error occurred during token authentication or user isnt logged in");
            window.location.reload();
            return null;

        }

        const role = resJson.role;

        console.log('role:', role);

        await checkPath();

        return role;
    } catch (err) {
        console.log('Error getting user role');
        return null;
    }
};

// Logs the user out by clearing the cookie and blacklisting the token in the backend.
export const Logout = async (e) => {
    e.preventDefault();
    try {
        const token = Cookies.get('authToken');
        console.log("BLACKLISTING TOKEN: ", token);
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
        Cookies.remove("authToken");
        console.log("Successfully Logged out!");
        window.location.href = '/';
    } catch (err) {
        console.log("Error logging out: ", err);
    }

};

// This funtion checks that the user isnt accessing a page that they are unauthorized to access
export const checkPath = async () => {
    console.log("CHECKING PATH");
    try {
        const token = Cookies.get('authToken');

        if (!token) {
            const currentPath = window.location.pathname;
            const paths = ["/", "/about", "/contact", "/faq"];
            if (!paths.includes(currentPath)) {
                window.location.pathname = '/';
            }
        } else {
            const decoded = jwtDecode(token);
            const role = decoded.role;
            const defaultPaths = ["/contact", "/about", "/faq", "/dashboard", "/account/settings"];

            if (role === "student") {
                const authorizedPaths = ["/projects/available", "/project/preferences/submit"];

                if (!authorizedPaths.includes(window.location.pathname) && !defaultPaths.includes(window.location.pathname)) {
                    window.location.pathname = '/projects/available';

                }

            } else if (role === "client") {

                const authorizedPaths = ["/projects/view", "/projects/submit"];
                if (!authorizedPaths.includes(window.location.pathname) && !defaultPaths.includes(window.location.pathname)) {
                    window.location.pathname = '/projects/view';
                }
            }

        }
    } catch (err) {}
};

export const isLoggedIn = async () => {
    try {
    const token = Cookies.get("authToken");
    console.log("COOKIE TOKEN: ", token);
    let status = false;
    
    if (!token || token === 'null') {
        console.log("User isnt logged in");
        status = false;
    } else {
        console.log("User logged in");
        status = true;
    }

    await checkPath();

    return status;
} catch (err) {
    return false;
}

}