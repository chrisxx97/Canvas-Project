import React, { Component } from "react";
import "./Dashboard.css";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h2>Dashboard</h2>

                <div id="dashboard-assignments">
                    <h3>Assignments</h3>
                    <div>
                        To Do
                        <table id="todo" border="1">
                            <tr>
                                <th>Assignment</th>
                                <th>Course</th>
                                <th>Points</th>
                                <th>Due Date</th>
                                <th>Status</th>
                            </tr>
                            <tr>
                                <td>HW3</td>
                                <td>Web Development</td>
                                <td>30</td>
                                <td>05/14/2022</td>
                                <td>Submitted</td>
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
                                <th>Status</th>
                            </tr>
                            <tr>
                                <td>HW3</td>
                                <td>Web Development</td>
                                <td>30</td>
                                <td>05/14/2022</td>
                                <td>Submitted</td>
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
                                <th>Status</th>
                            </tr>
                            <tr>
                                <td>HW3</td>
                                <td>Web Development</td>
                                <td>30</td>
                                <td>05/14/2022</td>
                                <td>Submitted</td>
                            </tr>
                        </table>
                    </div>
                    <br />

                    <div>
                        (For teachers) To be Graded
                        <table id="need-grading" border="1">
                            <tr>
                                <th>Assignment</th>
                                <th>Course</th>
                                <th>Points</th>
                                <th>Due Date</th>
                                <th>Status</th>
                            </tr>
                            <tr>
                                <td>HW3</td>
                                <td>Web Development</td>
                                <td>30</td>
                                <td>05/14/2022</td>
                                <td>Submitted</td>
                            </tr>
                        </table>
                    </div>
                    <br />
                </div>

            </div>

        );
    }
}

export default Dashboard;
