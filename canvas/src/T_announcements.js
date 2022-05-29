import React, { Component } from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "./Courses.css";


class T_announcements extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        alert("A new announcement has been posted: " + this.state.value);
        event.preventDefault();

        // post new announcment to database
        // reload the current component



        this.setState({value:''});



    }

    addAnnouncement(){
        let table = document.getElementById("new_ann");
        
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    render() {
            return (
                <div >
                    <table class = "styled-table">
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
                        
                    </table><br/>
                    <h2>New Announcement:</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                        <textarea  value = {this.state.value} onChange={this.handleChange} />
                        </label><br/>
                        <input type="submit" value="Post" />
                    </form>
                </div>

                

            
                 
            
        );
    }
}

export default T_announcements;
