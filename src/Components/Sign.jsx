import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Sign() {
    const navigate= useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
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
            const response = await axios.post('http://localhost:5000/ap2/v2/CreateUser', formData);
            // Handle the response here
            const result = response.data;
            const maindata = result.id;
           localStorage.setItem("ID", maindata);
           navigate("/Login")
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <div className='container'>
                <h4 className='my-5 text-center fw-bold'>Create your Accountfdgdfg</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            name
                        </label>
                        <input onChange={handleInputChange} value={formData.name}
                            type="text" name="name"
                            className="form-control"
                            id="text"
                            aria-describedby="text"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input onChange={handleInputChange} value={formData.email}
                            type="email" name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input onChange={handleInputChange}
                            type="password" value={formData.password} name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Check me out
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Sign