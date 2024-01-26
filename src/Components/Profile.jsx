import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem("ID");
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`http://localhost:5000/ap2/v2/getUser/${userId}`);
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]); // The dependency array ensures that the effect runs when userId changes

    return (
        <div>
            <h1>Profile</h1>
            {userData ? (
                <div>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    {/* Add other user data fields as needed */}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Profile;
