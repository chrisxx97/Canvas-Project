import React, { Component } from "react";
import "./Courses.css";

class S_announcements extends Component {

    getTable(){
        let request = new XMLHttpRequest()
        
        request.open("GET", "/s_ann")
        request.onreadystatechange = function(){
            if (this.readyState === 4 && this.status===200){
                let table = document.getElementById("s_ann_table")
                let data = JSON.parse(this.response).data
                for (let i = 0; i < data.length; i++) {
                    let row = table.insertRow()
                    row.insertCell().innerHTML = data[i][0]
                    row.insertCell().innerHTML = data[i][2]
                    row.insertCell().innerHTML = data[i][3]
                    row.insertCell().innerHTML = data[i][4]
                    
                }
            }
        }
        request.send()
    }

    render() {
            this.getTable()
            return (
                <div class = "flex-child">
                    <div class = "styled-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Announcement ID</th>
                                    <th>Date Posted</th>
                                    <th>Title</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody id = "s_ann_table">
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                
            
                 
            
        );
    }
}

export default S_announcements;
