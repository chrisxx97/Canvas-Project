/*
References:
https://www.w3schools.com/howto/howto_js_filter_table.asp
 */

import React, { Component } from "react";
import "./Settings.css";

function usersSearch() {
    let input, filter, table, tr, tdName, tdEmail, i, name, email;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("users-table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        tdName = tr[i].getElementsByTagName("td")[0];
        tdEmail = tr[i].getElementsByTagName("td")[1];
        if (tdName) {  // if (tdName && tdEmail)
            name = tdName.textContent || tdName.innerText;
            email = tdEmail.textContent || tdEmail.innerText;

            if (name.toUpperCase().indexOf(filter) > -1 || email.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function usersFilter() {

}

class Settings extends Component {
    render() {
        return (
            <div>
                <h2>Settings</h2>
                <h3>Registered Users</h3>

                Search: <input type="text" id="search" onKeyUp={usersSearch} placeholder="Name or Email" />
                <br />

                Filter by Status:
                <input type="radio" id="all" name="filter" value="all" onKeyUp={usersFilter} />
                <label htmlFor="active">All</label>
                <input type="radio" id="active" name="filter" value="active" onKeyUp={usersFilter} />
                <label htmlFor="active">Active</label>
                <input type="radio" id="inactive" name="filter" value="inactive" onKeyUp={usersFilter} />
                <label htmlFor="inactive">Inactive</label>
                <br /><br />

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
            </div>
        );
    }
}

export default Settings;
