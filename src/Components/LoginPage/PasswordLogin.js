import React from 'react'
import { BrowserRouter, Form, Route, Routes } from 'react-router-dom'
import LoginRegister from './LoginRegister'
//import Main from './Main'

import Portfolio from '../ProfilePage/Portfolio'
import InfoLanding from '../InfoLanding/InfoLanding'
import Tracker from '../Tracker/Tracker'
// import NearestDoctor from './NearestDoctor'
import About from '../Main/About'
import Home from '../Main/Home'
// import Chat from '../Main/Chat'
// import ChatWithAI from '../Main/ChatwithAI'
import NearestHospital from '../NerarestHospital/NearestHospital'
function PasswordLogin() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/register' element={<LoginRegister />}></Route>
                    <Route path='/portfolio' element={<Portfolio />}></Route>
                    <Route path='/info' element={<InfoLanding />}></Route>
                    <Route path='/tracker' element={<Tracker />}></Route>
                    <Route path='/doctor' element={<NearestHospital />}></Route>
                    <Route path='/about' element={<About />}></Route>
                    
                   
                    
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default PasswordLogin;
