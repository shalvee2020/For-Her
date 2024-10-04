import React from 'react'
import { useState } from 'react';
// import { database } from './FirebaseConfig';
import { database } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './LoginandRegister.css'
function LoginRegister() {
    const [login, setLogin] = useState(false)
    const history = useNavigate();

    const handleSubmit = (e, type) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email);
        console.log(password);
        if (type == 'signup') {
            createUserWithEmailAndPassword(database, email, password).then(data => {
                console.log(data, "authData")
                history('/portfolio')
            }).catch(err => {
                alert(err.code)
                setLogin(true)
            })
        } else {
            signInWithEmailAndPassword(database, email, password)
                .then((data) => {
                    console.log(data, "authData");
                    history("/portfolio");
                })
                .catch((err) => {
                    alert(err.code);
                });
        }

    }

    return (

        <div className="user">
            <div className="row">
                <div className='bo1'>
                    <div
                        className={login == false ? "activeColor" : "pointer"}
                        onClick={() => setLogin(false)}
                    >
                        SignUp
                    </div>
                </div>
                <div className='bo2'>
                    <div
                        className={login == true ? "activeColor" : "pointer"}
                        onClick={() => setLogin(true)}
                    >
                        SignIn
                    </div>
                </div>
            </div>

            <header className="user__header">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
                <h1 className="user__title">A lightweight and simple {login ? 'SignIn' : 'SignUp'} form</h1>
            </header>

            <form className="form" onSubmit={(e) => handleSubmit(e, login ? 'signin' : 'signup')}>

                <div className="form__group">
                    <input name='email' placeholder="Email" className="form__input" />
                </div>

                <div className="form__group">
                    <input name='password' type="password" placeholder="Password" className="form__input" />
                </div>

                <button className="btn" >{login ? 'Signin' : 'Signup'}</button>
            </form>
        </div>

    )

}


export default LoginRegister;