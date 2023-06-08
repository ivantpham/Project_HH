import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../assets/less/Page404.css';

const Page404 = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            // Chuyển hướng đến trang '/'
            window.location.href = '/Project_HH';
        }, 3000);

        // Xóa timeout khi component bị unmount (componentWillUnmount)
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="page404-container">
            <img
                className="page404-image"
                src="https://img.freepik.com/premium-vector/robot-404-error-vector-design-website-connection-failed-webpage-404-with-ai-technology-computer_572293-3195.jpg"
                alt=""
            />
        </div>
    );
};

export default Page404;
