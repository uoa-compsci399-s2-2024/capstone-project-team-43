import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { getUserId, getUserRole, isLoggedIn } from '../../utils/auth';
import SignOutButton from "../../components/sign-out-button";

const Dashboard = () => {

    const navigate = useNavigate(); 

    const userId = getUserId();
    const userRole = getUserRole();
    const loggedin = isLoggedIn();
    console.log('user id:',userId);
    console.log('logged in', loggedin);

    // if user is client 
    // redirect to  project proposal form
    useEffect(() => {
        if(isLoggedIn() && userRole === 'client') {
            console.log('client user!')
            navigate("/projects/submit");
        }
    }, [navigate]);

    return(
        <main>
            <h1>Semester 2, 2024</h1>
            <p>{userId}</p>
            <p>{userRole}</p>
        </main>
    );
};

export default Dashboard;