import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useFetchUserData } from '../ApiCall/userDataService';
function Home() {
    const { userData, fetchUserData } = useFetchUserData();
    // const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/v1/CreateData', formData);
            fetchUserData();
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);
    const Handledelete = async (id) => {
      const response = await axios.delete(`http://localhost:5000/api/v1//DeleteUserData/${id}`)
      console.log(response)
    }
    return (
        <div>
            <h5 className='text-center my-5'>Create your Blogs and Save Here</h5>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            title
                        </label>
                        <input
                            type="text" name='title'
                            className="form-control border border-info"
                            id="title" value={formData.title} onChange={handleInputChange}
                            placeholder="Enter your Blog Title" required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">
                            Description
                        </label>
                        <textarea name='description' value={formData.description} onChange={handleInputChange}
                            className="form-control border border-info"
                            id="exampleFormControlTextarea1" 
                            rows={3}
                            defaultValue={""} required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>

                </form>
            </div>
            <h4 className='text-center'>All Blogs</h4>
            <div className='container mt-5'>
                {userData ? <div className='row'>
                    {userData.map((element) => (
                        <div key={element.id} className='col-md-4'>
                            <div className='card'>
                                <div className='card-body'>
                                <h6><i class="fa-solid fa-trash" onClick={() => Handledelete(element.id)}></i></h6>
                                    <div>
                                        <h6 className='card-title mx-2'> Title : {element.title} </h6> 
                                    </div>

                                    <p className='card-text'>Description: {element.description}</p>
                                    {/* Add other user data fields as needed */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div> : <h1>Loading data</h1>}


            </div>
        </div>
    )
}

export default Home