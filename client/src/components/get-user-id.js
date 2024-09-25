import React, { useState, useRef } from 'react';
import { jwtDecode } from "jwt-decode";

// A Helper function to get the current user's ID
// Add the following code to your program to set the userID: 
//
// const [userId, setUserId] = useState(null);
// useEffect(() => {
//     const id = getUserID();
//     setUserId(id);
// }, []);
//
const getUserID = () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.log("User not logged in");
            return null;
        } else {
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded.userId;
    }
    } catch (err) {
        console.log('Error getting user ID:',err);
        return null;
    } 
}

export default getUserID;