import axios from 'axios';

export const loginUser = async () => {
    const url = 'https://golden-pens-backend.onrender.com/api/v1/auth/login';
    const requestBody = {
        identifier: 'laughmanlj@gmail.com',  
        password: 'Bjk-1903',             
        isRememberMe: false                    
    };

    try {
        const response = await axios.post(url, requestBody);
        console.log('User authenticated successfully:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }
};


