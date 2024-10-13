import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './sidebar.css';
import { ReactComponent as CapitaliseLogo } from '../../media/capitalise.svg';
import { fetchSemesters } from '../../Api';

const Sidebar = ({ userRole, showSidebar }) => {

    console.log('user role for sidebar:',userRole);

    
    const [currentSemester, setCurrentSemester] = useState(null);

        // check if dropdown should be hidden
        useEffect(() => {
            const semester = localStorage.getItem('currentSemester');
                const getSemesters = async () => {
                    const semesters = await fetchSemesters();
                    setCurrentSemester(semesters.find(semester => semester.status === 'current'));
                }
                getSemesters();
        }, []);

        //Prevents page rendering until the current semester is fetched
        if (!currentSemester) {
            return <div>Loading...</div>;
        }

    //currentSemester = semesters.find(semester => semester.status === 'current');

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
            { name: "Projects", path: "" },
            { name: "Manage Projects", path: "/projects/manage" },
            { name: "View as Student", path: "/projects/available" },
            { name: "Project Archive", path: `/projects/archive/${currentSemester.id}` },
            { name: "Semesters", path: "" },
            { name: "Manage Semesters", path: `/manage/semester/${currentSemester.id}` },
            { name: "Create Semester", path: "/create/semester "},
            { name: "Your Projects", path: "" },
            { name: "View All", path: "/projects/view" },
            { name: "Propose a Project", path: "/projects/submit" },
        ]
    }

    const roleLinks = linksByRole[userRole] || [];

    return (
        <nav className={`sidebar-menu ${showSidebar ? 'visible':'hiding'}`}>
            <ul className='sidebar-menu-items'>
                <div className='primary-links'>
                    {primaryLinks.map((item, index) => {
                        return(
                            <React.Fragment key={index}>
                            {item.path ? (
                                <li className = 'sidebar-menu-item main-link' id = {item.name.replace(" ","")}>
                                    <Link to={item.path}>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ):(
                                <li key={index} className = 'sidebar-menu-header' id = {item.name.replace(" ","")}>
                                    <span>{item.name}</span>
                                </li>
                            )}
                        </React.Fragment>
                        );
                    })}
                </div>
                <div className='role-links'>
                    {roleLinks.map((item, index) => {
                        return(
                            <React.Fragment key={index}>
                            {item.path ? (
                                <li className = 'sidebar-menu-item role-link' id = {item.name.replace(" ","")}>
                                    <Link to={item.path}>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ):(
                                <li key={index} className = 'sidebar-menu-header' id = {item.name.replace(" ","")}>
                                    <span>{item.name}</span>
                                </li>
                            )}
                        </React.Fragment>
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

