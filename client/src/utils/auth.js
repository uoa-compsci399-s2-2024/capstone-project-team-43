import React, { useState, useRef } from 'react';
import { jwtDecode } from "jwt-decode";

export const getUserId = () => {
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

export const getUserRole = () => {
    try {
        const token = localStorage.getItem("authToken");
        console.log('token:',token);

        const decoded = jwtDecode(token);
        const role = decoded.role;
        console.log('role:',role);
        return role;
    } catch (err) {
        console.log('Error getting user role');
        return null;
    }
}

export const isLoggedIn = () => {
    return !!localStorage.getItem('authToken');
};


