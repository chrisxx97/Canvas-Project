import React, { Component } from "react";
import "./Courses.css";

class S_announcements extends Component {
    render() {
            return (
                <div class = "flex-child">
                    <div class = "styled-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Announcements</th>
                                    <th>Date Posted</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hello Class! </td>
                                    <td>5/15/2022</td>
                                </tr>
                                <tr>
                                    <td>The first assignment is due next week. </td>
                                    <td>5/15/2022</td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                
            
                 
            
        );
    }
}

export default S_announcements;
