import React, { useState, useEffect } from "react";
import { database, auth } from "../../firebase";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    deleteDoc,
    doc,
} from "firebase/firestore";
import "./chat.css";

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        // Monitor authentication state
        const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setDisplayName(currentUser.displayName || "");
            } else {
                setUser(null);
            }
        });
        const q = query(collection(database, "messages"), orderBy("createdAt", "asc"));
        const unsubscribeMessages = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(fetchedMessages.slice(-200));
        });

        return () => {
            unsubscribeAuth();
            unsubscribeMessages();
        };
    }, []);

    const handleSetDisplayName = () => {
        if (!displayName.trim()) {
            const name = prompt("Please enter your display name:");
            if (name) {
                setDisplayName(name.trim());
            }
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        if (!user) {
            alert("You need to be logged in to send messages.");
            return;
        }

        if (!displayName.trim()) {
            alert("Please set your display name first.");
            handleSetDisplayName();
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(database, "messages"), {
                text: newMessage,
                createdAt: new Date(),
                uid: user.uid,
                displayName: displayName || "Anonymous",
            });
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send the message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const clearMessages = async () => {
        const confirm = window.confirm(
            "Are you sure you want to clear all messages?"
        );
        if (!confirm) return;

        try {
            const q = query(collection(database, "messages"));
            const snapshot = await onSnapshot(q, async (snapshot) => {
                for (const doc of snapshot.docs) {
                    await deleteDoc(doc.ref);
                }
            });
            alert("All messages cleared!");
        } catch (error) {
            console.error("Error clearing messages:", error);
            alert("Failed to clear messages. Please try again.");
        }
    };

    return (
        <div className="chat-app-container">
            {/* Chat Header */}
            <div className="chat-header">
                <h2>Chat Room</h2>
                <div className="header-actions">
                    {user && (
                        <>
                            <button onClick={handleSetDisplayName}>
                                {displayName ? "Change Name" : "Set Name"}
                            </button>
                            <button onClick={clearMessages}>Clear Messages</button>
                        </>
                    )}
                </div>
            </div>

            {/* Chat Messages */}
            <div className="messages-container">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.uid === user?.uid ? "own-message" : "other-message"
                            }`}
                    >
                        <strong>{message.displayName || "Anonymous"}: </strong>
                        {message.text}
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="send-message-form">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="message-input"
                />
                <button type="submit" disabled={loading} className="send-button">
                    {loading ? "Sending..." : "Send"}
                </button>
            </form>
        </div>
    );
};

export default ChatApp;

