import React, { Component } from "react";
import "./Courses.css";

class T_grades extends Component {


    getTable(){
        let request = new XMLHttpRequest()
        
        request.open("GET", "/t_grade")
        request.onreadystatechange = function(){
            if (this.readyState === 4 && this.status===200){
                let table = document.getElementById("t_grade")
                let data = JSON.parse(this.response).data
                for (let i = 0; i < data.length; i++) {
                    let row = table.insertRow()
                    row.insertCell().innerHTML = data[i][0]
                    row.insertCell().innerHTML = data[i][1]
                    row.insertCell().innerHTML = data[i][2] 
                    row.insertCell().innerHTML = data[i][3] 
                    row.insertCell().innerHTML = data[i][4]                    
                    row.insertCell().innerHTML = data[i][5]                    


                }
            }
        }
        request.send()
    }


    render() {
        this.getTable()
            return (
                <div >
                    <div class = "styled-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Assignment ID</th>
                                    <th>Student ID</th>
                                    <th>Assignment ID</th>
                                    <th>Description</th>
                                    <th>Total points</th>
                                    <th>Mark</th>
                                    <th>New Mark</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody id = "t_grade">
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                
            
                 
            
        );
    }
}

export default T_grades;