import React, {useEffect, useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import { getUserID, getUserRole, isLoggedIn } from '../../utils/auth';
import { fetchSemesters } from "../../Api";
import './dashboard.css'

const Dashboard = () => {
    const [semesters, setSemesters] = useState([]);

    const navigate = useNavigate(); 

    let userId;
    let userRole;
    const loggedin = isLoggedIn();

    // if user is client 
    // redirect to  project proposal form
    useEffect(() => {
        async function checkLoggedIn() {
            userId = await getUserID();
            userRole = await getUserRole();
            if(await isLoggedIn() && userRole === 'client') {
                navigate("/projects/submit");
            }
        }

        checkLoggedIn();

    }, [navigate]);

    // Get semester data from server
    useEffect(() => {
        console.log('getting semesters data');
        const getSemesters = async () => {
                try {
                    const data = await fetchSemesters();
                    setSemesters(data);
                } catch (error) {
                    console.error('Failed to load semester:', error);
                }
            }
        getSemesters();
    }, []); 

    const currentSemesters = semesters.filter(semester => semester.status === 'current')
        .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    const upcomingSemesters = semesters.filter(semester => semester.status === 'upcoming')
        .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    const retiredSemesters = semesters.filter(semester => semester.status === 'retired')
        .sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

    return(
        <main className="dashboard-page">
            {semesters.filter(semester => (semester.status !== 'retired')).length > 0 && <div className='content'>
                <div className='page-heading'>
                    <h1>Your Semesters</h1>
                    <h2 className="page-subheading"></h2>
                </div>
                <div className="dashboard-semesters-container">
                        {upcomingSemesters.length > 0 && upcomingSemesters
                            .sort((a, b) => new Date(a.start_date) - new Date(b.start_date)) 
                            .reverse()
                            .map((semester,index) => ( 
                                <div 
                                key={semester.id} 
                                className={`semester-container current ${index===0 ? 'first':''}`} 
                                onClick={() => {navigate(`/manage/semester/${semester.id}`)}}>
                                    <div className="head">
                                        <p className="name">{semester.name}</p>
                                        <p className="status">{semester.status}</p>
                                    </div>
                                </div>
                            ))}

                        {currentSemesters.length > 0 && currentSemesters
                            .sort((a, b) => new Date(a.start_date) - new Date(b.start_date)) 
                            .reverse()
                            .map((semester,index) => ( 
                                <div 
                                key={semester.id} 
                                className={`semester-container current`} 
                                onClick={() => {navigate(`/manage/semester/${semester.id}`)}}>
                                    <div className="head">
                                        <p className="name">{semester.name}</p>
                                        <p className="status">{semester.status}</p>
                                    </div>
                                </div>
                            ))}
                        {retiredSemesters.length > 0 && retiredSemesters
                            .sort((a, b) => new Date(a.start_date) - new Date(b.start_date)) 
                            .reverse()
                            .map((semester,index) => ( 
                                <div 
                                key={semester.id} 
                                className={`semester-container current`} 
                                onClick={() => {navigate(`/manage/semester/${semester.id}`)}}>
                                    <div className="head">
                                        <p className="name">{semester.name}</p>
                                        <p className="status">{semester.status}</p>
                                    </div>
                                </div>
                            ))}
                </div>
                <div className='redirect-to-create'>
                    <Link to='/create/semester'>
                        <p>Create a New Semester</p>
                    </Link>
                </div>
            </div>}
            {/* if user has no upcoming or current semesters */}
            {semesters.filter(semester => (semester.status !== 'retired')).length === 0 && <div className='content'>
                <div className='page-heading'>
                    <h1>Your Semesters</h1>
                    {/* <h2 className="page-subheading">Your Semesters</h2> */}
                </div>
                <div className='page-content'>
                    <p>No current, upcoming, or retired semesters.</p>
                    <Link to='/create/semester'>
                        <span className="create-link">Create New Semester</span>
                    </Link>
                </div>
            </div>}
        </main>
    );
};

export default Dashboard;