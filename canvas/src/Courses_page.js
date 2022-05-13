import React, { Component } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import S_announcements from "./S_announcements";

class Courses_page extends Component {
    render() {
            return (

            <div>
            
                <div id="Announcement">
                    <NavLink to = "s_announcements">Announcements</NavLink>
                    
                </div>
                
                <div id="Assignments">
                    <h2>Assignments</h2>
                    
                </div>

                <div id="Grades">
                    <h2>Grades</h2>
                    
                </div>
                <Routes>
                    <Route path = "/s_announcements" element = {<S_announcements />}/>
                </Routes>
            </div>
                 
            
        );
    }
}

export default Courses_page;
