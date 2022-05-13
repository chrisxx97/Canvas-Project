import React, { Component } from "react";
import "./Courses.css";
import Courses_page from "./Courses_page";
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';


function openCourseBar() {
    document.getElementById("mySidenav").style.width = "250px";
    // document.getElementById("courses-content").style.left = "250px";
}
function closeCourseBar() {
    document.getElementById("mySidenav").style.width = "0";
    // document.getElementById("courses-content").style.left = "0";
}

class Courses_menu extends Component {
    render() {
        return (
                <div>
                    <div id="mySidenav" className="sidenav">
                        <a href="javascript:void(0)" className="closebtn" onClick={closeCourseBar}>&times;</a>
                        <h2> Courses</h2>
                        <NavLink to="courses_page" onClick={closeCourseBar}>Web Development</NavLink>
                        <NavLink to="courses_page" onClick={closeCourseBar}>Database</NavLink>
                        <NavLink to="courses_page" onClick={closeCourseBar}>Distributed Systems</NavLink>
                        <NavLink to="courses_page" onClick={closeCourseBar}>Object oriented Programming</NavLink>
                        
                    </div>

                    <div id="courses-content">
                        <h2>Course name</h2>
                        
                    </div>
                
                <Routes>
                    <Route path = "/courses_page/*" element = {<Courses_page />}/>
                </Routes>
                </div>
        );
    }
}

export default Courses_menu;
