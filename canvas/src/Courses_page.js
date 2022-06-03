import React, { Component } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import S_announcements from "./S_announcements";
// import T_announcements from "./T_announcements";
import T_announcements from "./T_ann";

import S_assignments from "./S_ass";


import S_grades from "./S_grades";
import T_grades from "./T_grades";
// import T_grades from "./Ann_form";


import "./Courses.css";
import T_assignments from "./T_ass";

class Courses_page extends Component {

    // window.sessionStorage.getItem('role');

    render() {
        if (window.sessionStorage.getItem('role') == "student"){
            return (
                <div className = "flex-container">
                    <div className = "flex-child">
                        <ul className = "secondary_menu">
                            <li  id="Announcement">
                                <NavLink to = "S_announcements"> Announcements</NavLink>
                                
                            </li>

                            <li  id="Assignments">
                                <NavLink to = "S_assignments"> Assignments</NavLink>
                                
                            </li>

                            <li  id="Grades">
                                <NavLink to = "S_grades"> Grades</NavLink>
                                
                            </li>     
                        </ul>
                        
                        <Routes>
                            <Route path = "/S_announcements" element = {<S_announcements />}/>
                            <Route path = "/T_announcements/*" element = {<T_announcements />}/>
                            <Route path = "/S_assignments" element = {<S_assignments />}/>
                            <Route path = "/T_assignments/*" element = {<T_assignments/>}/>
                            <Route path = "/S_grades" element = {<S_grades />}/>
                            <Route path = "/T_grades" element = {<T_grades />}/>



                        </Routes>
                    </div>
                </div>
            
                 
            
        );
            }else if (window.sessionStorage.getItem('role') == "teacher"){
                return (
                    <div className = "flex-container">
                        <div className = "flex-child">
                            <ul className = "secondary_menu">
    
                                <li id="Announcement">
                                    <NavLink to = "T_announcements">Teacher Announcements</NavLink>
                                    
                                </li>
    
                                <li id="Assignments">
                                    <NavLink to = "T_assignments">Teacher Assignments</NavLink>
                                    
                                </li>
    
                                <li id="Grades">
                                    <NavLink to = "T_grades">Teacher Grades</NavLink>
                                    
                                </li>
                                
                            </ul>
                            
                            
                            
                            <Routes>
                                <Route path = "/S_announcements" element = {<S_announcements />}/>
                                <Route path = "/T_announcements/*" element = {<T_announcements />}/>
                                <Route path = "/S_assignments" element = {<S_assignments />}/>
                                <Route path = "/T_assignments/*" element = {<T_assignments/>}/>
                                <Route path = "/S_grades" element = {<S_grades />}/>
                                <Route path = "/T_grades" element = {<T_grades />}/>
    
    
    
                            </Routes>
                        </div>
                    </div>
                
                     
                
            );
            }
    }
}

export default Courses_page;
