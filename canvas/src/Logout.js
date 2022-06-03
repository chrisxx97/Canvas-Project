import React from "react";
import Login from "./Login";
import Main from "./Main";

export default function Logout() {
    // set the login boolean to false
    window.sessionStorage.setItem('login', false)
    sessionStorage.clear()

    document.getElementById("account").style.display = "none"
    document.getElementById("dashboard").style.display = "none"
    document.getElementById("courses").style.display = "none"
    document.getElementById("settings").style.display = "none"

    //auto redirect to login page
    return (
        <div>
            <h4>Logged out!</h4>
            <a href="/">Click to go back to login page</a>
        </div>
    );
};
