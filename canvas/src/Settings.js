/*
References:
https://www.w3schools.com/howto/howto_js_filter_table.asp
 */

import React, { Component } from "react";
import "./Settings.css";

class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id: -1,
            course_to_add: -1,
            users: [],
            courses: [],
            loaded: false
        }

        this.handleFormChangeUser = this.handleFormChangeUser.bind(this)
        this.handleFormChangeCourse = this.handleFormChangeCourse.bind(this)
        this.attachCourse = this.attachCourse.bind(this)
    }

    getData() {
        let that = this
        let request = new XMLHttpRequest()
        request.open("GET", "/users_courses")

        request.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let table = document.getElementById("users-table")
                let data = JSON.parse(this.response).users
                let data_courses = JSON.parse(this.response).courses

                for (let i = 0; i < data.length; i++) {
                    let row = table.insertRow()
                    row.insertCell().innerHTML = data[i][3]
                    row.insertCell().innerHTML = data[i][4]
                    row.insertCell().innerHTML = data[i][6]
                    row.insertCell().innerHTML = data[i][5]
                    let cell = row.insertCell()
                    cell.innerHTML = "<button class='change-status'>Activate/Deactivate</button>"

                    // that.state.users
                    that.state.users.push({"user_id": data[i][0], "name": data[i][3]})
                }

                for (let i = 0; i < data_courses.length; i++) {
                    that.state.courses.push({"course_id": data_courses[i][0], "name": data_courses[i][1]})
                }
            }
        }

        request.send()
    }

    statusButtons() {
        setTimeout(() => {
            let buttons = document.getElementsByClassName('change-status')
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].onclick = () => this.changeStatus(i + 1)
            }
        }, 800)
    }

    changeStatus(idx) {
        let that = this
        let table = document.getElementById("users-table")
        let email = table.rows[idx].cells[1].innerHTML
        let status = table.rows[idx].cells[3].innerHTML
        let newStatus = "inactive"
        if (!status.localeCompare("inactive")) {
            newStatus = "active"
        }

        let request = new XMLHttpRequest()
        request.open("POST", "/settings")
        request.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                that.updateUsers(idx, newStatus)
            }
        }
        request.send(JSON.stringify({ "email": email, "newStatus": newStatus }))
    }

    updateUsers(idx, newStatus) {
        document.getElementById("users-table").rows[idx].cells[3].innerHTML = newStatus
    }

    usersSearchFilter(event) {
        let input, keyword, filter, table, tr, tdName, tdEmail, tdStatus, i, name, email, tdStatusStr;
        input = document.getElementById("search");
        keyword = input.value.toUpperCase();
        filter = getRadioValue("filter")
        table = document.getElementById("users-table");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            tdName = tr[i].getElementsByTagName("td")[0];
            tdEmail = tr[i].getElementsByTagName("td")[1];
            tdStatus = tr[i].getElementsByTagName("td")[3];

            if (tdName) {  // if (tdName && tdEmail && tdStatus)
                name = tdName.textContent || tdName.innerText;
                email = tdEmail.textContent || tdEmail.innerText;
                tdStatusStr = tdStatus.textContent || tdStatus.innerText;

                if ((name.toUpperCase().indexOf(keyword) > -1 || email.toUpperCase().indexOf(keyword) > -1) &&
                    (!filter.localeCompare("") || !filter.localeCompare("all") || !tdStatusStr.toLowerCase().localeCompare(filter))) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    setOptions() {
        let { users } = this.state;
        let { courses } = this.state;
        setTimeout(() => {
            let userMenu = document.getElementById("attach-course-user")
            let courseMenu = document.getElementById("attach-course-course")
            for (let i = 0; i < users.length; i++) {
                let option = document.createElement("option")
                option.value = users[i].user_id
                option.text = users[i].name
                userMenu.add(option);
            }
            for (let i = 0; i < courses.length; i++) {
                let option = document.createElement("option")
                option.value = courses[i].course_id
                option.text = courses[i].name
                courseMenu.add(option);
            }
        }, 100)
    }

    attachCourse(event) {
        event.preventDefault()
        let that = this
        let request = new XMLHttpRequest()
        request.open("POST", "/enrollment")
        request.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let p = document.getElementById("attach-course-success")
                document.getElementById("attach-course-success").style.display = "";
                p.innerText = JSON.parse(this.response).message
            }
        }
        request.send(JSON.stringify({ "user_id": that.state.user_id, "course_to_add": that.state.course_to_add }))
    }

    handleFormChangeUser(event) {
        document.getElementById("attach-course-success").style.display = "none";
        this.setState({
            user_id: event.target.value
        });
    }

    handleFormChangeCourse(event) {
        document.getElementById("attach-course-success").style.display = "none";
        this.setState({
            course_to_add: event.target.value
        });
    }

    isAdmin() {
        if (window.sessionStorage.getItem('role').localeCompare("admin")) {
            return false
        }
        return true
    }

    render() {
        if (this.isAdmin()) {
            if (!this.state.loaded) {
                this.setState({
                    loaded: true
                });
                this.getData()
                this.statusButtons()
                this.setOptions()
            }
            return (
                <div>
                    <h2>Settings</h2>
                    <h3>Registered Users</h3>

                    <div>
                        Search: <input type="text" id="search" onKeyUp={this.usersSearchFilter} placeholder="Name or Email" />
                    </div>

                    <div onChange={this.usersSearchFilter}>
                        Filter by Status:
                        <input type="radio" id="all" name="filter" value="all" />
                        <label htmlFor="all">All</label>
                        <input type="radio" id="active" name="filter" value="active" />
                        <label htmlFor="active">Active</label>
                        <input type="radio" id="inactive" name="filter" value="inactive" />
                        <label htmlFor="inactive">Inactive</label>
                    </div>
                    <br />

                    <table id="users-table" border="1">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Change Status</th>
                        </tr>
                    </table>
                    <br />

                    <form onSubmit={this.attachCourse}>
                        <label>
                            Add a class for a user: <br />
                            <select id="attach-course-user" value={this.state.user_id} onChange={this.handleFormChangeUser}>
                                <option value="none" selected disabled hidden>Select a User</option>
                            </select>
                            <select id="attach-course-course" value={this.state.course_to_add} onChange={this.handleFormChangeCourse}>
                                <option value="none" selected disabled hidden>Select a Course</option>
                            </select>
                        </label>
                        <input type="submit" value="Submit" />
                        <br />
                        <p id="attach-course-success"></p>
                    </form>

                </div>
            )
        } else {
            return (
                <div>You are not authorized to view the Settings page.</div>
            )
        }
    }
}

function getRadioValue(groupName)
{
    let elements = document.getElementsByName(groupName);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return elements[i].value;
        }
    }
    return "";
}

export default Settings;
