
import React, { useState, useRef } from 'react';
import { jwtDecode }  from "jwt-decode";

// A Helper function to get the current user's ID
// Add the following code to your program to set the userID: 
//
// const [userRole, setUserRole] = useState(null);
// useEffect(() => {
//     const role = GetUserRole();
//     setUserRole(role);
// }, []);
const GetUserRole = () => {
    try {
        const token = localStorage.getItem("authToken");
        console.log('token:',token);

        if (token) {
            const decoded = jwtDecode(token);
            const role = decoded.role;
            console.log('role:',role);
            return role;
        } else {
            localStorage.setItem("authToken", "");
            return null; 
        }
    } catch (err) {
        console.log('Error getting user role');
        return null;
    }
}

export default GetUserRole;