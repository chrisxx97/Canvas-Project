import React from "react";
import Login from "./Login";

 export default function Logout() {
    // set the login boolean to false
    window.sessionStorage.setItem('login', false)
    sessionStorage.clear()
    //auto redirect to login page
    return (
        <>
        <a href="/login">Click to log out and back to login page!</a>
        </>       
    );
};
