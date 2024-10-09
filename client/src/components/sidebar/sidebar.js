import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import { ReactComponent as CapitaliseLogo } from '../../media/capitalise.svg';

const Sidebar = ({ userRole, showSidebar }) => {

    console.log('user role for sidebar:',userRole);

    const primaryLinks = [
        // { name: "Home", path: "/dashboard" }
    ]

    const footerLinks = [
        { name: "FAQ", path: "/faq"},
        { name: "About", path: "/about"},
        { name: 'Contact', path: "/contact"}

    ]

    const linksByRole = {
        student : [
            { name: "Available Projects", path: "/projects/available"},
            { name: "Project Preference Form", path: "/project/preferences/submit" },
        ],
        
        client : [
            { name: "Your Projects", path: "/projects/view" },
            { name: "Propose a Project", path: "/projects/submit" },

        ],
        
        admin: [
            { name: "Current Projects", path: "/projects/published" },
            { name: "Projects", path: "/projects/manage" },
            { name: "Project Archive", path: "/projects/archive" },
            { name: "Manage Semesters", path: "/manage/semester/" },
            { name: "Your Projects", path: "/projects/view" },
            { name: "Propose a Project", path: "/projects/submit" },
        ]
    }

    const roleLinks = linksByRole[userRole] || [];

    return (
        <nav className={`sidebar-menu ${showSidebar ? 'visible':'hiding'}`}>
            <ul className='sidebar-menu-items'>
                <div className='primary-links'>
                    {primaryLinks.map((item, index) => {
                            return (
                                <li key={index} className = 'sidebar-menu-item main-link' id = {item.name.replace(" ","")}>
                                    <Link to={item.path}>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                            })}
                </div>
                <div className='role-links'>
                    {roleLinks.map((item, index) => {
                        return (
                            <li key={index} className = 'sidebar-menu-item role-link' id = {item.name.replace(" ","")}>
                                <Link to={item.path}>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        );
                        })}
                </div>
                <div className='footer-links'>
                    {footerLinks.map((item, index) => {
                        return (
                            <li key={index} className = 'sidebar-menu-item main-link' id = {item.name.replace(" ","")}>
                                <Link to={item.path}>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        );
                        })}
                    <li className='sidebar-menu-item sidebar-capitalise-link main-link'>
                        <Link onClick={() => window.open('https://www.capitalise.space/', '')}>
                            <span>Visit <CapitaliseLogo className='sidebar-capitalise-logo'/></span>
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
}

export default Sidebar;

