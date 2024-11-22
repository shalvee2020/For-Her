import React from 'react';
import GirlImage from '../../Assets/women.jpg';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'; // Use the correct auth instance
import { useNavigate } from 'react-router-dom';

import './Portfolio.css';

function Portfolio() {
    const navigate = useNavigate(); // Renamed to 'navigate' for clarity

    const handleClick = () => {
        signOut(auth) // Use the correct 'auth' instance here
            .then(() => {
                console.log("User signed out");
                navigate('/'); // Navigate to the home page after sign-out
            })
            .catch((error) => {
                console.error("Sign-out error:", error);
            });
    };

    const handleInfo = () => {
        navigate('/info');
    };

    const handleTracker = () => {
        navigate('/tracker');
    };

    const handleDoctor = () => {
        navigate('/doctor');
    };
    const handleChat = () => {
        navigate('/chat');
    };

    return (
        <>
            <div className='Portfolio_container'>
                <div className='Portfolio_content'>
                    <button className='button-89' onClick={handleTracker}>Tracker</button>
                    <button className='button-89' onClick={handleInfo}>Info</button>
                    <button className='button-89' onClick={handleDoctor}>Nearest Hospital</button>
                    <button className='button-89' onClick={handleChat}>Chat</button>
                    <button className='button-89' onClick={handleClick}>Sign Out</button>
                </div>
                <main>
                    <div className="card">
                        <img src={GirlImage} alt="women" />
                    </div>
                    <div className='card_para'>
                        <p style={{ fontSize: "1.5rem" }}>
                            Each individual woman's body demands to be accepted on its own terms
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Portfolio;
