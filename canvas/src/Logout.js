import React from "react";
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Login from "./Login";

 export default function Logout() {
    // set the login boolean to false
    window.sessionStorage.setItem('login', false)
    sessionStorage.clear()
    //auto redirect to login page
    return (
        <>
        <NavLink to="/login"><div>Back to Login Page</div></NavLink><br />
        <Routes>
            <Route>
            <Route exact path="/login" element={<Login />} />
            </Route>
        </Routes>
        </>       
    );
};
