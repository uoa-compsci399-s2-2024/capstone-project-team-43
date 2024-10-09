import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { getUserID, getUserRole, isLoggedIn } from '../../utils/auth';

const Dashboard = () => {

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

    return(
        <main>
            <h1>Semester 2, 2024</h1>
            <p>{userId}</p>
            <p>{userRole}</p>
        </main>
    );
};

export default Dashboard;