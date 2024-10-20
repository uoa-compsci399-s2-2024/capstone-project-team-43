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
    console.log('user id:',userId);
    console.log('logged in', loggedin);

    // if user is client 
    // redirect to  project proposal form
    useEffect(() => {
        async function checkLoggedIn() {
            userId = await getUserID();
            userRole = await getUserRole();
            if(await isLoggedIn() && userRole === 'client') {
                console.log('client user!')
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
                    console.log('Fetched semester data:', data);
                } catch (error) {
                    console.error('Failed to load semester:', error);
                }
            }
        getSemesters();
    }, []); 


    return(
        <main className="dashboard-page">
            {semesters && <div className='content'>
                <div className='page-heading'>
                    <h1>Dashboard</h1>
                    <h2 className="page-subheading">Your Active Semesters</h2>
                </div>
                {semesters.filter(semester => (semester.status !== 'retired')).length > 0 && <div className='page-content'>
                <div className='dashboard-semesters-container'>
                    {/* {semesters.length === 0 && (
                        <p>You haven't submitted any project proposals yet.</p>
                    )} */}
                    {semesters.length > 0 && semesters.filter(semester => (semester.status === 'current')).map(semester => (
                            <div key={semester.id} className="semester-container existing" onClick={() => {navigate(`/manage/semester/${semester.id}`)}}>
                                <div className="head">
                                    <p className="name">{semester.name}</p>
                                    <p className="status">{semester.status}</p>
                                </div>
                            </div>     
                    ))} 
                    {semesters.length > 0 && semesters.filter(semester => (semester.status === 'upcoming')).map(semester => (
                            <div key={semester.id} className="semester-container existing">
                                <div className="head">
                                    <p className="name">{semester.name}</p>
                                    <p className="status">{semester.status}</p>
                                </div>
                    </div>  
                    ))}
                    {/* <div className="semester-container new" onClick={() => {navigate('/create/semester')}}>
                        <div className="head">
                            <p className="create-text">Create New Semester</p>
                        </div>
                    </div>                       */}
                </div>
                <div className='redirect-to-create'>
                    <Link to='/create/semester'>
                        <p>Create a New Semester</p>
                    </Link>
                </div>
                </div>}
                {semesters.filter(semester => (semester.status !== 'retired')).length === 0 && <div className='content'>
                <div className='page-content'>
                    <p>No current or upcoming semesters.</p>
                    <Link to='/create/semester'>
                        <span className="create-link">Create New Semester</span>
                    </Link>
                </div>
            </div>}
            </div>}
        </main>
    );
};

export default Dashboard;