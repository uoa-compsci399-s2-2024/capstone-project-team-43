import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './sidebar.css';
import { ReactComponent as CapitaliseLogo } from '../../media/visit-capitalise.svg';
import { fetchSemesters, getStatusSemesters } from '../../Api';

const Sidebar = ({ userRole, showSidebar }) => {

    console.log('user role for sidebar:',userRole);

    
    // const [currentSemester, setCurrentSemester] = useState(null);
    // const [upcomingSemesters, setUpcomingSemesters] = useState([]);
    // const [loadPage, setLoadPage] = useState(false);

    // // Gets current and upcoming semesters
    // useEffect(() => {
    //     const semester = localStorage.getItem('currentSemester');
    //         const getSemesters = async () => {
    //             const semesters = await fetchSemesters();
    //             setCurrentSemester(semesters.find(semester => semester.status === 'current'));
    //             if(!currentSemester) {
    //                 setUpcomingSemesters(await getStatusSemesters("upcoming"));
    //                 console.log("No current semester, showing upcoming semesters: ", upcomingSemesters);
    //             }
    //             setLoadPage(true);
    //         }
    //         getSemesters();
    // }, []);

    // if (!loadPage) {
    //     return <div>Loading...</div>;
    // }

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
            { name: "Available Projects", path: "/projects"},
            { name: "Project Preference Form", path: "/project/preferences/submit" },
        ],
        
        client : [
            { name: "Your Projects", path: "/projects/view" },
            { name: "Propose a Project", path: "/projects/submit" },

        ],

        
        admin: [
            { name: "Semesters", path: "" },
            { name: "Your Semesters", path: "/dashboard" },
            { name: "Manage Semesters", path: `/manage/semester/`},
            { name: "Create Semester", path: "/create/semester "},
            { name: "Projects", path: "" },
            { name: "Manage Projects", path: "/projects/manage" },
            { name: "View as Student", path: "/projects" },
            { name: "Project Archive", path: `/projects/archive/`}, 
            { name: "Your Projects", path: "" },
            { name: "View All", path: "/projects/view" },
            { name: "Propose a Project", path: "/projects/submit" },
        ]
    }

            // /  ${currentSemester ? currentSemester.id : (upcomingSemesters.length > 0 ? upcomingSemesters[0].id : 1)}` },


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
                                        <p>{item.name}</p>
                                    </Link>
                                </li>
                            ):(
                                <li key={index} className = 'sidebar-menu-header' id = {item.name.replace(" ","")}>
                                    <p>{item.name}</p>
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
                    <li className='sidebar-menu-item capitalise-button main-link'>
                        <Link onClick={() => window.open('https://www.capitalise.space/', '')}>
                            <CapitaliseLogo className='capitalise-logo'/>
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
}

export default Sidebar;

