import React, { Component } from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "./Courses.css";

class S_grades extends Component {
    render() {
            return (
                <div >
                    <div class = "styled-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Assignment ID</th>
                                    <th>Description</th>
                                    <th>Max number of points</th>
                                    <th>Grade</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Assignment 1 </td>
                                    <td>30</td>
                                    <td>25</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Assignment 2</td>
                                    <td>30</td>
                                    <td>29</td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                
            
                 
            
        );
    }
}

export default S_grades;