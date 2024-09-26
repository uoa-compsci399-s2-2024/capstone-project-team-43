import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './../App.css';
import './../index.css';
import { fetchTeam, fetchUser, updateUserDetails, deleteUser } from '../Api.js';
import getUserID from '../components/get-user-id.js';
import SignOutButton, { handleSignOut } from '../components/sign-out-button.js';


// Formats user data & edit functionality
const AccountDetail = ({ description, data, onEdit, isEditing, onSave, onCancel, isStudent = false }) => {
    const [value, setValue] = useState(data || 'None');

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className='account-detail'>
            {isEditing ? (
                <>
                {/* Format when user is editing */}
                    <div className='data-container'>
                        <div className='container-text'>
                            <p className='account-data'>Edit {description.toLowerCase()}: {
                            <input 
                                type="text" 
                                value={value} 
                                onChange={handleInputChange} 
                                className='edit-input' 
                                style = {{width: `${value.length}ch`}}
                            />}</p>
                        </div>
                        {/* save & cancel buttons */}
                        <div className='editing-button-container'>
                            <button onClick={() => onSave(value)} className='save-edit-button'>Save Changes</button>
                            <button onClick={onCancel} className='cancel-edit-button'>Cancel</button>
                        </div>
                    </div>

                </>
            ) : (
                    <>  
                    {/* format when user isn't editing */}
                    <div className='data-container'>
                        <div className='container-text'>
                            <p className='account-data'>{description}: {data ? data : 'None'}</p>
                        </div>
                        {/* Display edit option for all non-student users*/}
                        {!isStudent && <button onClick={onEdit} className='edit-button'></button>}
                    </div> 
                </>
            )}
        </div>
    );
}

const AccountSettings = ({ }) => {
    const [userID, setUserID] = useState(null);
    const [user, setUser] = useState(null);
    const [team, setTeam] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(null);

    const [showDeletionWarning, setShowDeletionWarning] = useState(false);  
    const openDeletionWarning = () => setShowDeletionWarning(true);
    const closeDeletionWarning = () => setShowDeletionWarning(false);

    useEffect(() => {
        console.log("getting user id");
        const id = getUserID();
        console.log("user id"+id);
        setUserID(id);
    }, []);

    // Get user data
    useEffect(() => {
        async function getUser() {
            try {
                const data = await fetchUser(userID);
                setUser(data);
                console.log('Fetched user data:', data);  
            } catch (error) {
                console.error('Failed to load user:', error);
            }
        }
        getUser();
    }, [userID]);

    // Get team data if student
    useEffect(() => {
        async function getTeam() {
            try {
                const data = await fetchTeam(userID);
                setTeam(data);
                console.log('Fetched team data:', data);  
            } catch (error) {
                console.error('Failed to load team:', error);
            }
        }
        getTeam();
    }, [userID]);

    // Show loading screen when fetching data
    if (!user) {
        return <div>Loading...</div>;  
    }

    // Handle entering edit mode
    const handleEdit = (field) => {
        setEditingField(field);
    };

    // Handle saving edit changes
    const handleSave = async (newValue) => {
        console.log(`Saving ${editingField} with value: ${newValue}`);
        
        // update details in database
        await updateUserDetails(userID, editingField, newValue || null);

        // update details on page immediately
        setUser((prevUser) => ({
            ...prevUser,
            [editingField]: newValue, 
        }));

        setEditingField(null); // Exit edit mode
    };

    // Handle cancelling edit
    const handleCancel = () => {
        setEditingField(null); // Exit edit mode without saving
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        try {
            // delete user
            const response = deleteUser(userID);
            console.log(response);  
            
            // automatically sign the user out 
            await handleSignOut();

        } catch (error) {
            console.error('Failed to delete user account:', error);
        }
    };

    const isStudent = user.role === 'student'  

    return(
        <div className='AccountSettings'>
            <div className='page-header'>
                <h2></h2>
                <h1>Account Settings</h1>
            </div>
            <div className='page-content'>
                <div className='content-section'>
                    <h2>Your Account Details</h2>
                    <AccountDetail 
                        description="First name" 
                        data={user.first_name} 
                        onEdit={() => handleEdit('first_name')} 
                        isEditing={editingField === 'first_name'} 
                        onSave={handleSave} 
                        onCancel={handleCancel}
                        isStudent={isStudent}
                    />
                    <AccountDetail 
                        description="Last name" 
                        data={user.last_name} 
                        onEdit={() => handleEdit('last_name')} 
                        isEditing={editingField === 'last_name'} 
                        onSave={handleSave} 
                        onCancel={handleCancel}
                        isStudent={isStudent}
                    />
                    <AccountDetail 
                        description="Email address" 
                        data={user.email} 
                        onEdit={() => handleEdit('email')} 
                        isEditing={editingField === 'email'} 
                        onSave={handleSave} 
                        onCancel={handleCancel}
                        isStudent={isStudent}
                    />
                    {user.role === 'client' && (
                        <AccountDetail 
                            description="Company name" 
                            data={user.company} 
                            onEdit={() => handleEdit('company')} 
                            isEditing={editingField === 'company'} 
                            onSave={handleSave} 
                            onCancel={handleCancel}
                            isStudent={isStudent}
                        /> )} 
                    {/* Display team name & number if user is student and in a team */ }
                    { team && user.role === 'student' && (
                        <div className='content-section'>
                            <h2>Your Team</h2>
                            <>
                                <AccountDetail description="Team number" data={team.team_number} isStudent={isStudent}/>
                                <AccountDetail description="Team name" data={team.team_name} isStudent={isStudent}/>
                            </>
                        </div>
                    )}
                    {/* Add sign out & delete account options here*/}
                    <div className='account-settings-buttons'>
                        <SignOutButton></SignOutButton>
                        {/* no delete account option for students */}
                        {!isStudent && <button className='delete-account-button' onClick={setShowDeletionWarning}>Delete Account</button>}
                    </div>
                    
                    { showDeletionWarning && (
                        <div className='pop-up'>
                            <div className='pop-up-header'>
                                <h3>Delete Account</h3>
                                <button className = 'quit-button' onClick={closeDeletionWarning}></button>
                            </div>
                            <div className='pop-up-text'>
                                <p className='warning'>Deleting your account will delete any project proposals you have submitted. This cannot be undone.</p>
                            </div>
                            <button className='confirm-delete-account-button' onClick={handleDeleteAccount}>Confirm Account Deletion</button>
                        </div>                
                    )}
                    </div>
                </div>
            </div>
    );
}

export default AccountSettings;
