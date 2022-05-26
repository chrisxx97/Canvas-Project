/*
References:
https://www.w3schools.com/howto/howto_js_filter_table.asp
 */

import React, { Component } from "react";
import "./Settings.css";
import axios from "axios";

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            data: null
        };
    }

    getData() {
        axios({
            method: "GET",
            url:"/test",
        }).then((response) => {
            const res = response.data
            console.log(res)
            document.getElementById("test").style.display = ""
            document.getElementById("response").innerHTML = res.name
            this.setState({
                name: res.name,
                data: res.data})
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
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
                console.log(filter)
                if ((name.toUpperCase().indexOf(keyword) > -1 || email.toUpperCase().indexOf(keyword) > -1) &&
                    (!filter.localeCompare("") || !filter.localeCompare("all") || !tdStatusStr.toLowerCase().localeCompare(filter))) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    render() {
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
                    </tr>
                    <tr>
                        <td>user1</td>
                        <td>user11@uchicago.edu</td>
                        <td>Student</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>user2</td>
                        <td>user211@uchicago.edu</td>
                        <td>Student</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>user112</td>
                        <td>user2@uchicago.edu</td>
                        <td>Teacher</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>user3</td>
                        <td>user3@uchicago.edu</td>
                        <td>Student</td>
                        <td>Inactive</td>
                    </tr>
                    <tr>
                        <td>user4</td>
                        <td>user41@uchicago.edu</td>
                        <td>Teacher</td>
                        <td>Active</td>
                    </tr>
                </table>

                <br />
                <button onClick={this.getData}>Click me</button>
                <div id="test" style={{display:"none"}}>
                    <p>Test details: </p>
                    <p id="response"></p>
                </div>

            </div>
        );
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
