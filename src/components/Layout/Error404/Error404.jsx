import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Error404 = () => {
    let navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 10000);

        // Clean up the timer to prevent memory leaks
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <Navbar />
            <h1>Page Not Found! Redirecting to home in a few seconds...</h1>
        </>
    );
};

export default Error404;
