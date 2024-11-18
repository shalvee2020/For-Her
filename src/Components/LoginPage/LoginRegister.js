import React, { useState } from 'react';
import { auth } from '../../firebase'; // Import the correct auth instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './LoginandRegister.css';

function LoginRegister() {
    const [isSignIn, setIsSignIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e, type) => {
        e.preventDefault();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        // Basic validation
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        if (type === 'signup') {
            createUserWithEmailAndPassword(auth, email, password)
                .then((data) => {
                    console.log(data, "authData");
                    navigate('/portfolio');
                })
                .catch((err) => {
                    console.error("Signup Error:", err);
                    alert(err.message);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((data) => {
                    console.log(data, "authData");
                    navigate("/portfolio");
                })
                .catch((err) => {
                    console.error("Signin Error:", err);
                    alert(err.message);
                });
        }
    };

    return (
        <div className="user">
            <div className="row">
                <div className="bo1">
                    <div
                        className={!isSignIn ? "activeColor" : "pointer"}
                        onClick={() => setIsSignIn(false)}
                    >
                        SignUp
                    </div>
                </div>
                <div className="bo1">
                    <div
                        className={isSignIn ? "activeColor" : "pointer"}
                        onClick={() => setIsSignIn(true)}
                    >
                        SignIn
                    </div>
                </div>
            </div>

            <header className="user__header">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
                <h1 className="user__title">A lightweight and simple {isSignIn ? 'SignIn' : 'SignUp'} form</h1>
            </header>

            <form className="form" onSubmit={(e) => handleSubmit(e, isSignIn ? 'signin' : 'signup')}>
                <div className="form__group">
                    <input name="email" placeholder="Email" className="form__input" required />
                </div>

                <div className="form__group">
                    <input name="password" type="password" placeholder="Password" className="form__input" required />
                </div>

                <button className="btn">{isSignIn ? 'SignIn' : 'SignUp'}</button>
            </form>
        </div>
    );
}

export default LoginRegister;
