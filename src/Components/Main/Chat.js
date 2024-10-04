// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar'; // Import your existing Navbar component

// const Chat = () => {
//     const navigate = useNavigate(); // For navigation within your React app

//     const handleAIChat = () => {
//         navigate('#'); // Replace with the actual route if needed
//     };

//     const handleFellowMatesChat = () => {
//         window.location.href = 'https://chlobaatkare.onrender.com'; // External URL
//     };

//     return (
//         <div style={styles.page}>
//             <Navbar /> {/* Using the existing Navbar component */}
//             <div style={styles.container}>
//                 <h1>Who do you want to talk to?</h1>
//                 <button style={styles.button} onClick={handleAIChat}>Talk to AI</button>
//                 <button style={styles.button} onClick={handleFellowMatesChat}>Talk to Fellow Mates</button>
//             </div>
//         </div>
//     );
// };

// // Inline CSS styles
// const styles = {
//     page: {
//         position: 'relative',
//         height: '100vh',
//     },
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//     },
//     button: {
//         padding: '10px 20px',
//         margin: '10px',
//         fontSize: '16px',
//         cursor: 'pointer',
//     }
// };

// export default Chat;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import your existing Navbar component
import './chat.css'; // Import the separate CSS file

const Chat = () => {
    const navigate = useNavigate(); // For navigation within your React app
    const [roomId, setRoomId] = useState(''); // To store and display the selected room ID
    const [shouldRedirect, setShouldRedirect] = useState(false); // To control the redirection

    const handleAIChat = () => {
        navigate('/ai'); // Replace with the actual route if needed
    };

    const handleFellowMatesChat = () => {
        setRoomId('General'); // Example room ID for general chat
        setShouldRedirect(true); // Trigger redirection after 3 seconds
    };

    // Specific task handlers for periods-related topics
    const handleCrampsChat = () => {
        setRoomId('CRAMPS123'); // Example room ID for Cramps
        setShouldRedirect(true); // Trigger redirection after 3 seconds
    };

    const handlePeriodsRelatedChat = () => {
        setRoomId('PERIODS456'); // Example room ID for Periods-related discussions
        setShouldRedirect(true); // Trigger redirection after 3 seconds
    };

    // Effect to handle the 3-second delay before redirecting
    useEffect(() => {
        if (shouldRedirect) {
            const timer = setTimeout(() => {
                window.location.href = 'https://chlobaatkare.onrender.com'; // Redirect to the external page after 3 seconds
            }, 3000);
            return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
        }
    }, [shouldRedirect]);

    return (
        <div className="chat-page">
            <Navbar /> {/* Using the existing Navbar component */}
            <div className="chat-container">
                <h1>Who do you want to talk to?</h1>
                <button className="chat-button" onClick={handleAIChat}>Talk to AI</button>
                <button className="chat-button" onClick={handleFellowMatesChat}>Talk to Fellow Mates</button>

                {/* Display buttons for specific tasks */}
                <div className="task-container">
                    <h2>Specific Topics:</h2>
                    <button className="task-button" onClick={handleCrampsChat}>Cramps</button>
                    <button className="task-button" onClick={handlePeriodsRelatedChat}>Periods Related Topics</button>
                </div>

                {/* Display the room ID if one is selected */}
                {roomId && (
                    <div className="room-id-container">
                        <h3>Your Room ID: {roomId}</h3>
                        <p>Redirecting you to the chat in 3 seconds...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
