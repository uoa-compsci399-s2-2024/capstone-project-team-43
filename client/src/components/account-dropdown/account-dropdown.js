import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './account-dropdown.css';
import { handleSignOut } from '../sign-out-button';

const AccountDropdown = ({hidingDropdown, showingDropdown, hideDropdown, setDropdownHover }) => {

    const accountLinks = [
        { name: "Manage Account", path: "/account/settings" }
    ]

    const handleMouseEnter = () => {
        setDropdownHover(true);
    };
    
    const handleMouseLeave = () => {
        setDropdownHover(false); 
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

    return (<nav className = {`account-dropdown-menu ${showingDropdown ? ('visible'): (hidingDropdown ? 'hiding':'')}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>

                <ul className='account-dropdown-menu-items'>
                    {accountLinks.map((item, index) => {
                        return (
                            <li key={index} className= 'account-dropdown-menu-item'>
                                <Link to={item.path}>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                    <li className='account-dropdown-menu-item' onClick={handleSignOut}>
                        <Link>
                            <span>Sign Out</span>
                        </Link>
                    </li>
                </ul>
            </nav>);
}

export default AccountDropdown;

