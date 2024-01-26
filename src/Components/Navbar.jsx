import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
function Navbar() {
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem("ID");
    useEffect(() => {
        const userId = localStorage.getItem("ID");
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
            <nav className="navbar navbar-expand-lg bg-primary ">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white fw-bold" to="/">
                        Create your Blogs
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <button disabled={true}  className="btn btn-dark pe-auto" type="submit">
                            {userData ? <>{userData.name}</>  :"Loading.."}
                            </button>
                            <button className="btn btn-dark mx-3" type="submit">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Navbar