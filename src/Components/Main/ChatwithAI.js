// ChatWithAI.js

import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import your Navbar
import './ChatwithAI.css'; // Import the CSS for styling

const ChatWithAI = () => {
    const [input, setInput] = useState(''); // To store the user input
    const [chatLog, setChatLog] = useState([]); // To store the conversation history
    const [isLoading, setIsLoading] = useState(false); // To show a loading state during API call

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return; // Prevent empty inputs

        // Add the user message to chatLog
        setChatLog([...chatLog, { type: 'user', message: input }]);

        // Clear input field
        setInput('');

        try {
            setIsLoading(true);

            console.log(process.env.REACT_APP_OPENAI_API_KEY)

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo', // You can also use 'gpt-4' if your API key allows access to it
                    messages: [{ role: 'user', content: input }]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Replace with your API Key

                        'Content-Type': 'application/json',
                    }

                }

            );

            const botMessage = response.data.choices[0].message.content;

            // Add AI response to chatLog
            setChatLog([...chatLog, { type: 'user', message: input }, { type: 'bot', message: botMessage }]);

        } catch (error) {
            console.error("Error while communicating with ChatGPT API:", error);
            setChatLog([...chatLog, { type: 'bot', message: 'Sorry, something went wrong. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-ai-page">
            <Navbar />
            <div className="chat-ai-container">
                <h1>Chat with AI</h1>

                <div className="chat-log">
                    {chatLog.map((log, index) => (
                        <div key={index} className={log.type === 'user' ? 'user-message' : 'bot-message'}>
                            <p>{log.message}</p>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="chat-input-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="chat-input"
                    />
                    <button type="submit" disabled={isLoading} className="chat-submit">
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWithAI;



