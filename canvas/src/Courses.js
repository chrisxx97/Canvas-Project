import React, { Component } from "react";
import "./Courses.css";

function closeCourseBar() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("courses-content").style.left = "0";
}

class Courses extends Component {
    render() {
        return (
            <div>
                <div id="mySidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={closeCourseBar}>&times;</a>
                    <h2> Courses</h2>
                    <a href="#">Web Development</a>
                    <a href="#">Database</a>
                    <a href="#">Distributed Systems</a>
                    <a href="#">Object-oriented Programming</a>
                </div>

                <div id="courses-content">
                    <h2>Courses</h2>
                    Add things here!!
                </div>
            </div>
        );
    }
}

export default Courses;
