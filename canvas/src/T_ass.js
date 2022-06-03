import React, {useState, useEffect} from "react";
import { BrowserRouter, Link,NavLink, Route, Routes } from 'react-router-dom';
import Ass_form from "./Ass_form";


const T_ass = () =>{
    const [assignments, setAssignments] = useState([]);


    async function fetchData(){
        const res = await fetch('/t_assignments')
        res.json().then(res=>setAssignments(res));
    }

    useEffect(() => {
        fetchData();
    })

    return(

        <div>
            {/* <span> {JSON.stringify(announcements)}</span> */}
            <table class = "styled-table">
                <thead>
                    <tr>
                        <th>Assignment ID</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Total Points</th>


                    </tr>
                </thead>
                <tbody id = "s_ann_table">
                    {assignments.map((assignment) => (
                        <tr>
                            <td>{assignment.assignment_id}</td>
                            <td>{assignment.description}</td>
                            <td>{assignment.due_date}</td>
                            <td>{assignment.points}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            <NavLink to = "Ass_form">Create a New Assignment</NavLink>
                    <Routes>
                        <Route path = "/Ass_form" element = {<Ass_form />}/>
                    </Routes>
        </div>
    )
}

export default T_ass;