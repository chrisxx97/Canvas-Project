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
            loaded: false,
            settings_new_name: null,
            settings_new_email: null,
            settings_new_s1: null,
            settings_new_s2: null,
            settings_new_s3: null,
            user_to_edit: null,
            user_to_edit_idx: -1,
            new_course_name: null,
            new_capacity: null,
            new_description: null
        }

        this.handleFormChangeUser = this.handleFormChangeUser.bind(this)
        this.handleFormChangeCourse = this.handleFormChangeCourse.bind(this)
        this.attachCourse = this.attachCourse.bind(this)
        this.inputSettingsNewName = this.inputSettingsNewName.bind(this)
        this.inputSettingsNewEmail = this.inputSettingsNewEmail.bind(this)
        this.inputSettingsNewS1 = this.inputSettingsNewS1.bind(this)
        this.inputSettingsNewS2 = this.inputSettingsNewS2.bind(this)
        this.inputSettingsNewS3 = this.inputSettingsNewS3.bind(this)
        this.editUserInfo = this.editUserInfo.bind(this)
        this.inputNewCourseName = this.inputNewCourseName.bind(this)
        this.inputNewCapacity = this.inputNewCapacity.bind(this)
        this.inputNewDescription = this.inputNewDescription.bind(this)
        this.addNewCourse = this.addNewCourse.bind(this)
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
                    cell = row.insertCell()
                    cell.innerHTML = "<button class='edit-info-btn'>Edit this User</button>"

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

    editButtons() {
        setTimeout(() => {
            let buttons = document.getElementsByClassName('edit-info-btn')
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].onclick = () => this.showEditForm(i + 1)
            }
        }, 800)
    }

    showEditForm(idx) {
        let table = document.getElementById("users-table")
        let email = table.rows[idx].cells[1].innerHTML
        let name = table.rows[idx].cells[0].innerHTML
        this.setState({
            user_to_edit: email,
            user_to_edit_idx: idx
        });
        document.getElementById("edit-user-info-h").innerText = "Edit User Information for " + name
        document.getElementById("edit-user-info").style.display = ""
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

    updateUserName(idx, newName) {
        document.getElementById("users-table").rows[idx].cells[0].innerHTML = newName
    }

    updateUserEmail(idx, newEmail) {
        document.getElementById("users-table").rows[idx].cells[1].innerHTML = newEmail
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
        }, 200)
    }

    attachCourse(event) {
        event.preventDefault()
        let that = this
        let request = new XMLHttpRequest()
        request.open("POST", "/enrollment")
        request.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let p = document.getElementById("attach-course-success")
                p.style.display = "";
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

    inputSettingsNewName(event) {
        this.setState({
            settings_new_name: event.target.value
        })
    }

    inputSettingsNewEmail(event) {
        this.setState({
            settings_new_email: event.target.value
        })
    }

    inputSettingsNewS1(event) {
        this.setState({
            settings_new_s1: event.target.value
        })
    }

    inputSettingsNewS2(event) {
        this.setState({
            settings_new_s2: event.target.value
        })
    }

    inputSettingsNewS3(event) {
        this.setState({
            settings_new_s3: event.target.value
        })
    }

    editUserInfo(event) {
        event.preventDefault()
        let that = this
        let request = new XMLHttpRequest()
        request.open("POST", "/edit_user_info_admin/" + this.state.user_to_edit)
        request.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                document.getElementById("edit-user-info").style.display = "none"
                alert(JSON.parse(this.response).message)

                if (that.state.settings_new_name)
                    that.updateUserName(that.state.user_to_edit_idx, that.state.settings_new_name)
                if (that.state.settings_new_email)
                    that.updateUserEmail(that.state.user_to_edit_idx, that.state.settings_new_email)

                that.setState({
                    settings_new_name: null,
                    settings_new_email: null,
                    settings_new_s1: null,
                    settings_new_s2: null,
                    settings_new_s3: null
                })
            }
        }
        request.send(JSON.stringify({
            "new_name": that.state.settings_new_name,
            "new_email": that.state.settings_new_email,
            "new_s1": that.state.settings_new_s1,
            "new_s2": that.state.settings_new_s2,
            "new_s3": that.state.settings_new_s3
        }))
    }

    inputNewCourseName(event) {
        this.setState({
            new_course_name: event.target.value
        })
    }

    inputNewCapacity(event) {
        this.setState({
            new_capacity: event.target.value
        })
    }

    inputNewDescription(event) {
        this.setState({
            new_description: event.target.value
        })
    }

    addNewCourse(event) {
        event.preventDefault()
        let that = this
        let request = new XMLHttpRequest()
        request.open("POST", "/add_course")
        request.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                alert(JSON.parse(this.response).message)
                that.setState({
                    new_course_name: null,
                    new_capacity: null,
                    new_description: null
                })
            }
        }
        request.send(JSON.stringify({
            "new_course_name": that.state.new_course_name,
            "new_capacity": that.state.new_capacity,
            "new_description": that.state.new_description
        }))
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
                this.editButtons()
                this.setOptions()
            }
            return (
                <div>
                    <h2>Settings</h2>
                    <br />
                    <h4>Registered Users</h4>

                    <div>
                        Search: <input type="text" id="search" onKeyUp={this.usersSearchFilter} placeholder="Name or Email" />
                    </div>

                    <div onChange={this.usersSearchFilter}>
                        Filter by Status:&nbsp;&nbsp;
                        <input type="radio" id="all" name="filter" value="all" />
                        <label htmlFor="all">All&nbsp;&nbsp;</label>
                        <input type="radio" id="active" name="filter" value="active" />
                        <label htmlFor="active">Active&nbsp;&nbsp;</label>
                        <input type="radio" id="inactive" name="filter" value="inactive" />
                        <label htmlFor="inactive">Inactive&nbsp;&nbsp;</label>
                    </div>

                    <div class="table-responsive">
                        <table id="users-table" border="1">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Change Status</th>
                                <th>Edit User Info</th>
                            </tr>
                        </table>
                    </div>
                    <br />

                    <div class="row">
                        <div class="col-md-6">
                            <form onSubmit={this.attachCourse} className="form-select form-select-md mb-3">
                                <h5>Add a class for a user: </h5>
                                <select id="attach-course-user" value={this.state.user_id}
                                        onChange={this.handleFormChangeUser}>
                                    <option value="none" selected disabled>Select a User</option>
                                </select>
                                <select id="attach-course-course" value={this.state.course_to_add}
                                        onChange={this.handleFormChangeCourse}>
                                    <option value="none" selected disabled>Select a Course</option>
                                </select>
                                <input type="submit" value="Submit"/>
                                <br/>
                                <p id="attach-course-success"></p>
                            </form>
                        </div>
                    </div>
                    <br /><br />

                    <div id="add-course">
                        <h4>Add a New Course</h4>
                        <form onSubmit={this.addNewCourse}>
                            <div className="row">
                                <label htmlFor="add-course-name" className="col-sm-2 col-form-label">New Course Name</label>
                                <div className="col-sm-3">
                                    <input className="form-control" id="add-course-name" name="name" type="text"
                                           value={this.state.new_course_name} onInput={this.inputNewCourseName} required/>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="add-course-capacity" className="col-sm-2 col-form-label">Capacity</label>
                                <div className="col-sm-3">
                                    <input className="form-control" id="add-course-capacity" name="capacity" type="number"
                                           value={this.state.new_capacity} onInput={this.inputNewCapacity} required/>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="add-course-description" className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-3">
                                    <input className="form-control" id="add-course-description" name="s3" type="text"
                                           value={this.state.new_description} onInput={this.inputNewDescription} required/>
                                </div>
                                <div className="col-sm-2">
                                    <input className="form-control" type="submit" value="Add"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br /><br />

                    <div id="edit-user-info" style={{display: "none"}}>
                        <h4 id="edit-user-info-h"></h4>
                        <form onSubmit={this.editUserInfo}>
                            <div className="row">
                                <label htmlFor="edit-btn-name" className="col-sm-3 col-form-label">Name</label>
                                <div className="col-sm-3">
                                    <input className="form-control" id="edit-btn-name" name="name" type="text"
                                           value={this.state.settings_new_name} onInput={this.inputSettingsNewName}/>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="edit-btn-email" className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-3">
                                    <input className="form-control" id="edit-btn-email" name="email" type="email"
                                           value={this.state.settings_new_email} onInput={this.inputSettingsNewEmail}/>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="edit-btn-s1" className="col-sm-3 col-form-label">What is your favorite
                                    movie?</label>
                                <div className="col-sm-3">
                                    <input className="form-control" id="edit-btn-s1" name="s1" type="text"
                                           value={this.state.settings_new_s1} onInput={this.inputSettingsNewS1}/>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="edit-btn-s2" className="col-sm-3 col-form-label">What is your father's
                                    middle name?</label>
                                <div className="col-sm-3">
                                    <input className="form-control" id="edit-btn-s2" name="s2" type="text"
                                           value={this.state.settings_new_s2} onInput={this.inputSettingsNewS2}/>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="edit-btn-s3" className="col-sm-3 col-form-label">What is the make of
                                    your first car?</label>
                                <div className="col-sm-3">
                                    <input className="form-control" id="edit-btn-s2" name="s3" type="text"
                                           value={this.state.settings_new_s3} onInput={this.inputSettingsNewS3}/>
                                </div>
                                <div className="col-sm-2">
                                    <input className="form-control" type="submit" value="Edit"/>
                                </div>
                            </div>
                        </form>
                    </div>

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
