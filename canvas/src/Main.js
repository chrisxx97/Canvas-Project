import React, { Component } from "react";
import {
    Route,
    Routes,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Account from "./Account";
import Courses from "./Courses";
import Settings from "./Settings";
import Logout from "./Logout";

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul id="side-menu">
                        <li id="logo">
                            <NavLink id="logo-a" to="/">
                                <img id="logo-img" src="assets/UChicago_Shield_2Color_Maroon_WhiteBorder_RGB.png"
                                     alt="logo"/>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/account">
                                <img src="https://canvas.uchicago.edu/images/messages/avatar-50.png"
                                     alt="account"/>
                                <div>Account</div>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/">
                                <div>Dashboard</div>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/courses" onclick={openCourseBar}>
                                <div>Courses</div>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/settings">
                                <div>Settings</div>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="logout">
                                <div>Logout</div>
                            </NavLink>
                        </li>
                        
                        </li>
                        <li className="menu-item">
                            <NavLink to="login">
                                <div>Login</div>
                            </NavLink>
                        </li>

                        </li>
                        <li className="menu-item">
                            <NavLink to="signup">
                                <div>SignUp</div>
                            </NavLink>
                        </li>

                    </ul>

                    <div className="content">
                        <Routes>
                            <Route exact path="/" element={<Dashboard />}/>
                            <Route path="/account" element={<Account />}/>
                            <Route path="/courses" element={<Courses />}/>
                            <Route path="/settings" element={<Settings />}/>
                            <Route path="/logout" element={<Logout />}/>
                            <Route path="/login" element={<Login />}/>
                            <Route path="/signup" element={<SignUp />}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

function openCourseBar() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("courses-content").style.left = "250px";
}

export default Main;
