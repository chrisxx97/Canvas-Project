import React, { Component } from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "./Courses.css";
import ReactTable from "react-table";

class S_assignments extends Component {
    render() {
            return (
                <div class = "flex-child">
                    <div class = "styled-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Assignment ID</th>
                                    <th>Description</th>
                                    <th>Due Date</th>
                                    <th>Your Submission</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1 </td>
                                    <td>Assignment 1</td>
                                    <td>5/15/2022</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Assignment 2 </td>
                                    <td>5/15/2022</td>
                                    <td></td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                
            
                 
            
        );
    }
}

export default S_assignments;