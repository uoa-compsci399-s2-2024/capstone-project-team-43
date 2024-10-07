import React, { useState, useEffect } from 'react';
import Header from '../header/header.js';
import Sidebar from '../sidebar/sidebar.js';
import GetUserRole from '../get-user-role.js';
import AccountDropdown from '../account-dropdown/account-dropdown.js';

const Layout = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    const [showSidebar, setShowSidebar]  = useState(false);

    const [showingDropdown, setShowingDropdown] = useState(false);
    const [hidingDropdown, setHidingDropdown] = useState(false);
    const [dropdownButtonHover, setDropdownButtonHover] = useState(false);
    const [dropdownHover, setDropdownHover] = useState(false);

    // get user role (student, admin etc.)
    useEffect(() => {
        const role = GetUserRole();
        console.log('role header:',role);
        setUserRole(role);
    }, []);

    const toggleSidebar = () => {
        if (!showSidebar){
            setShowingDropdown(false);
        }
        setShowSidebar(!showSidebar);
    };

    const showDropdown = () => {
        setShowingDropdown(true);
    };

    const hideDropdown = () => {
        if (!dropdownButtonHover && !dropdownHover){
            setShowingDropdown(false);
            setHidingDropdown(true);
        }
    };


    return (
        <div className="layout-container">
            <Header 
                toggleSidebar={toggleSidebar} 
                showDropdown={showDropdown}
                hideDropdown={hideDropdown}
                showingDropdown = {showingDropdown}
                setDropdownButtonHover = {setDropdownButtonHover} 
            />
            <div className='layout-body'>
                <Sidebar userRole={userRole} showSidebar = {showSidebar}/>
                {children}
                <AccountDropdown 
                    hidingDropdown={hidingDropdown} 
                    hideDropdown={hideDropdown}
                    showingDropdown = {showingDropdown}
                    setDropdownHover = {setDropdownHover}
                />
            </div>
        </div>
    );
};

export default Layout;