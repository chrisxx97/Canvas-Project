import React, { Component } from "react";
import "./Dashboard.css";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: window.sessionStorage.getItem('role'),
            user_id: window.sessionStorage.getItem('user_id')
        };
    }

    createAssignmentTable(tableID, data, idx1, idx2, idx3, idx4) {
        let table = document.getElementById(tableID)
        for (let i = 0; i < data.length; i++) {
            let row = table.insertRow()
            row.insertCell().innerHTML = data[i][idx1]
            row.insertCell().innerHTML = data[i][idx2]
            row.insertCell().innerHTML = data[i][idx3]
            row.insertCell().innerHTML = data[i][idx4]
        }
    }

    getData() {
        let that = this
        let request = new XMLHttpRequest()
        request.open("GET", "/" + this.state.user_id)

        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let data = JSON.parse(this.response)

                if (!that.state.role.localeCompare("admin")) {
                    document.getElementById("numOfActiveStudents").innerText += " " + data.numOfActiveStudents
                    document.getElementById("numOfActiveTeachers").innerText += " " + data.numOfActiveTeachers
                    document.getElementById("numOfCourses").innerText += " " + data.numOfCourses

                } else if (!that.state.role.localeCompare("teacher")) {
                    that.createAssignmentTable("to-be-graded", data.to_be_graded, 4, 6, 3, 2)

                } else {
                    that.createAssignmentTable("todo", data.todo, 4, 10, 3, 2)
                    that.createAssignmentTable("upcoming", data.upcoming, 4, 10, 3, 2)
                    that.createAssignmentTable("past", data.past, 4, 10, 3, 2)
                }
            }
        }

        request.send()
    }

    render() {
        this.getData()
        if (!this.state.role.localeCompare("admin")) {
            return (
                <div>
                    <h2>Dashboard</h2>
                    <div id="dashboard-admin">
                        <p id='numOfActiveStudents'>Number of active students: </p>
                        <p id='numOfActiveTeachers'>Number of active teachers: </p>
                        <p id='numOfCourses'>Number of courses: </p>
                    </div>
                </div>
            )
        } else if (!this.state.role.localeCompare("teacher")) {
            return (
                <div>
                    <h2>Dashboard</h2>
                    <div id="dashboard-teacher">
                        <h3>Assignments</h3>
                        <div>
                            To be graded
                            <table id="to-be-graded" border="1">
                                <tr>
                                    <th>Assignment</th>
                                    <th>Course</th>
                                    <th>Points</th>
                                    <th>Due Date</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Dashboard</h2>
                    <div id="dashboard-student">
                        <h3>Assignments</h3>
                        <div>
                            To Do
                            <table id="todo" border="1">
                                <tr>
                                    <th>Assignment</th>
                                    <th>Course</th>
                                    <th>Points</th>
                                    <th>Due Date</th>
                                </tr>
                            </table>
                        </div>
                        <br />

                        <div>
                            Upcoming
                            <table id="upcoming" border="1">
                                <tr>
                                    <th>Assignment</th>
                                    <th>Course</th>
                                    <th>Points</th>
                                    <th>Due Date</th>
                                </tr>
                            </table>
                        </div>
                        <br />

                        <div>
                            Past
                            <table id="past" border="1">
                                <tr>
                                    <th>Assignment</th>
                                    <th>Course</th>
                                    <th>Points</th>
                                    <th>Due Date</th>
                                </tr>
                            </table>
                        </div>
                        <br />
                    </div>
                </div>
            )
        }
    }
}

export default Dashboard;
