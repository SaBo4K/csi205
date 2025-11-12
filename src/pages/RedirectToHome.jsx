import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RedirectToHome() {
    const location = useLocation();
    
    useEffect(() => {
        // แสดง console log เพื่อ debug (สามารถลบได้)
        if (location.pathname === '/forward-to-home') {
            console.log('Forward to Home - Redirecting...');
        } else {
            console.log(`404 Not Found: "${location.pathname}" - Redirecting to Home...`);
        }
    }, [location.pathname]);

    return <Navigate to="/" replace />;
}