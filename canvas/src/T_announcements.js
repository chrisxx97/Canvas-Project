import React, { Component } from "react";
import { BrowserRouter, Link,NavLink, Route, Routes } from 'react-router-dom';
import Ann_form from "./Ann_form";
import "./Courses.css";



class T_announcements extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    // handleSubmit(event){
    //     alert("A new announcement has been posted: " + this.state.value);
    //     event.preventDefault();

    //     // post new announcment to database
    //     // reload the current component



    //     this.setState({value:''});


    // }


    // handleChange(event){
    //     this.setState({value: event.target.value});
    // }


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
                    // row.insertCell().innerHTML = data[i][3]
                    row.insertCell().innerHTML = data[i][4]
                    
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
                                <th>Announcement ID</th>
                                <th>Date Posted</th>
                                {/* <th>Title</th> */}
                                <th>Announcement</th>

                            </tr>
                        </thead>
                        <tbody id = "s_ann_table">
                        </tbody>
                        
                    </table>
                    <NavLink to = "Ann_form">Create a New Announcement</NavLink>
                    <Routes>
                        <Route path = "/Ann_form" element = {<Ann_form />}/>
                    </Routes>
                </div>
                

                

            
                 
            
        );
    }
}

export default T_announcements;
