/*
References:
https://www.w3schools.com/howto/howto_js_filter_table.asp
 */

import React, { Component } from "react";
import "./Settings.css";

class Settings extends Component {

    getUsers() {
        let request = new XMLHttpRequest()
        request.open("GET", "/users")

        request.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let table = document.getElementById("users-table")
                let data = JSON.parse(this.response).users
                for (let i = 0; i < data.length; i++) {
                    let row = table.insertRow()
                    row.insertCell().innerHTML = data[i][3]
                    row.insertCell().innerHTML = data[i][4]
                    row.insertCell().innerHTML = data[i][6]
                    row.insertCell().innerHTML = data[i][5]
                    let cell = row.insertCell()
                    cell.innerHTML = "<button class='change-status'>Activate/Deactivate</button>"
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
        }, 300)
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
        this.getUsers()
        this.statusButtons()
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
