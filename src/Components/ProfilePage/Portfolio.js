import React, { Component } from 'react'
import GirlImage from '../../Assets/women.jpg'

import { signOut } from 'firebase/auth';
import { database } from '../../firebase'
import { useNavigate } from 'react-router-dom'

import './Portfolio.css'

function Portfolio() {
    const history = useNavigate();
    const handleClick = () => {
        signOut(database).then(val => {
            console.log(val, "val");
            history('/')
        })
    }

    const handleInfo = () => {
        history('/info')
    }
    const handleTracker = () => {
        history('/tracker')
    }
    const handleDoctor = () => {
        history('/doctor')
    }
    return (
        <>
            <div className='Portfolio_container'>

                <div className='Portfolio_content'>


                    <button className='button-89' onClick={handleTracker}> Tracker</button>
                    <button className='button-89' onClick={handleInfo}>Info</button>
                    <button className='button-89' onClick={handleDoctor}>Nearest Hospital</button>
                    <button className='button-89' onClick={handleClick}>Sign Out</button>


                </div>
                <main>
                    <div class="card">
                        <img src={GirlImage} alt="women"></img>

                    </div>
                    <div className='card_para'>
                        <p style={{ fontSize: "1.5rem" }}>
                            Each individual woman's body demands to be accepted on its own terms

                        </p>
                    </div>
                </main>



            </div>
        </>
    )
}

export default Portfolio