import { useState } from 'react';
import axios from 'axios';

export const useFetchUserData = () => {
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/GetUserData`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return { userData, fetchUserData };
};
