import React, { Component, useState } from "react";
import {
    Route,
    Routes,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Account from "./Account";
import Settings from "./Settings";
import Logout from "./Logout";
import Login from "./Login";
import SignUp from "./SignUp";
import AnswerSq from "./AnswerSq";
import Courses_menu from "./Courses_menu";
import openCourseBar from "./Courses_menu";

class Main extends Component {

    hideSettings() {
        setTimeout(() => {
            if (window.sessionStorage.getItem('role').localeCompare("admin")) {
                document.getElementById("settings").style.display = "none"
            }
        }, 50)
    }

    render() {
        console.log(window.sessionStorage.getItem('login'))
        if (window.sessionStorage.getItem('login')) {
            //logged in
            this.hideSettings()
            return (
                <>
                    <BrowserRouter>
                        <div>
                            <ul id="side-menu">
                                <li id="logo">
                                    <NavLink id="logo-a" to="/">
                                        <img id="logo-img" src={require("./assets/UChicago_Shield_2Color_Maroon_WhiteBorder_RGB.png")}
                                            alt="logo" />
                                    </NavLink>
                                </li>
                                <li className="menu-item" id="account">
                                    <NavLink to="/account">
                                        <div>Account</div>
                                    </NavLink>
                                </li>
                                <li className="menu-item" id="dashboard">
                                    <NavLink to="/">
                                        <div>Dashboard</div>
                                    </NavLink>
                                </li>
                                <li className="menu-item" id="courses">
                                    <NavLink to="/courses_menu" onclick={openCourseBar}>
                                        <div>Courses</div>
                                    </NavLink>
                                </li>
                                <li className="menu-item" id="settings">
                                    <NavLink to="/settings">
                                        <div>Settings</div>
                                    </NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to="logout">
                                        <div>Logout</div>
                                    </NavLink>
                                </li>
                            </ul>
                            
                            <div className="content">
                                <Routes>
                                    <Route exact path="/" element={<Dashboard />} />
                                    <Route path="/account" element={<Account />} />
                                    <Route path="/courses_menu/*" element={<Courses_menu />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route exact path="/logout" element={<Logout />} />
                                </Routes>
                            </div>
                        </div>
                    </BrowserRouter>
                </>
            )
        } else {
            return (
                <BrowserRouter>
                    <div>
                        <ul id="side-menu">
                            <li id="logo">
                                <img id="logo-img" src={require("./assets/UChicago_Shield_2Color_Maroon_WhiteBorder_RGB.png")}
                                     alt="logo" />
                            </li>
                            <li className="menu-item">
                                <NavLink to="/">
                                    <div>Login</div>
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to="signup">
                                    <div>SignUp</div>
                                </NavLink>
                            </li>
                        </ul>

                        <div className="content">
                            <Routes>
                                <Route exact path="/" element={<Login />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/AnswerSq" element={<AnswerSq />} />
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            );
        }
    }
}

export default Main;
