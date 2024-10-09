import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './header.css'

const Header = ({toggleSidebar, showDropdown, hideDropdown, showingDropdown, setDropdownButtonHover}) => {

    const handleDropdown = () => {
        setDropdownButtonHover(true);
        showDropdown(); 
    }

    const handleDropdownButtonLeave = () => {
        setDropdownButtonHover(false);
    }

    // check if dropdown should be hidden
    useEffect(() => {
        // delays function call 
        const timeout = setTimeout(() => {
            hideDropdown();
        }, 0);

        // clear timer when header no longer visible
        return () => clearTimeout(timeout); 
    });

    return (
        <header>
            {/* sidebar button */}
            <div className='sidebar-container'>
                <div className='sidebar-button-container'>
                    <button className='sidebar-button'>
                        <img src={require("../../media/hamburger-menu-icon.png")} onClick={toggleSidebar} />
                    </button>
                </div>
            </div>

            {/* logo linking to home page */}
            <div className='header-logo-container'>
                <Link className = 'header-logo' to="/dashboard">
                    <img src={require('../../media/logo-small.png')} alt="Link to home page" />
                </Link>
            </div>


            {/* account Settings dropdown */}
            <div className='account-dropdown-container' onMouseLeave={showingDropdown ? handleDropdownButtonLeave : null}>
                <div className='account-dropdown-button-container'>
                    <button className = 'account-dropdown-button' 
                        onMouseEnter={handleDropdown}>
                        <img src={require('../../media/account-icon.png')} alt="Account Dropdown" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
