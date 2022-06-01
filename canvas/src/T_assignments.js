import React, { Component } from "react";
import "./Courses.css";
import { BrowserRouter, Link,NavLink, Route, Routes } from 'react-router-dom';

import Ass_form from "./Ass_form";

class T_assignments extends Component {


    getTable(){
        let request = new XMLHttpRequest()
        
        request.open("GET", "/t_assignments")
        request.onreadystatechange = function(){
            if (this.readyState === 4 && this.status===200){
                let table = document.getElementById("t_ass_table")
                let data = JSON.parse(this.response).data
                for (let i = 0; i < data.length; i++) {
                    let row = table.insertRow()
                    row.insertCell().innerHTML = data[i][0]
                    row.insertCell().innerHTML = data[i][1]
                    // row.insertCell().innerHTML = data[i][2]                    
                }
            }
        }
        request.send()
    }

    render() {
        this.getTable()
            return (
                <div >
                    <table class = "styled-table">
                        <thead>
                            <tr>
                                <th>Assignment ID</th>
                                <th>Description</th>
                                
                            </tr>
                        </thead>
                        <tbody id = "t_ass_table">

                        </tbody>
                        
                    </table>
                    <NavLink to = "Ass_form">Create a New Assignment</NavLink>
                    <Routes>
                        <Route path = "/Ass_form" element = {<Ass_form />}/>
                    </Routes>
                </div>

                

            
                 
            
        );
    }
}

export default T_assignments;
