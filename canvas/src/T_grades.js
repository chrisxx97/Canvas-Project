import React, {useState, useEffect, Fragment} from "react";
import "./Courses.css";
import EditableRowGrade from "./components/EditableRowGrade";
import ReadOnlyRowGrade from "./components/ReadOnlyRowGrade";

const T_grades = () => {
    const [assignments, setAssignments] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editFormData, setEditFormData] = useState([]);

    async function fetchData(){
        const res = await fetch('/t_grade')
        res.json().then(res=>setAssignments(res));
    }

    const handleEditClick = (event, assignment) => {
        event.preventDefault();
        setEditID(assignment.assignment_id);


    }

    const handleEditFormChange = (event, assignment) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = { ...editFormData};
        newFormData[fieldName] = fieldValue;
        newFormData["assignment_id"] = assignment.assignment_id;
        newFormData["user_id"] = assignment.user_id;
        newFormData["points"] = assignment.points;
        newFormData['description'] = assignment.description;
        newFormData['s_assignment_id'] = assignment.s_assignment_id;

        setEditFormData(newFormData);
    }

    function submitData(){
        // const data = { username: 'example' };

        fetch("/new_grade", {
            method: "POST",
            body: JSON.stringify({
                assignment_id:editFormData.assignment_id,
                student_id: editFormData.user_id,
                // description:editFormData.description,
                // due_date: editFormData.due_date,
                grade: editFormData.answer,
                s_assignment_id: editFormData.s_assignment_id,
                // teacher_id: window.sessionStorage.getItem('user_id'),
            })

            }).then(response=> response.json());
    }
    const handelEditFormSubmit = async (event) => {
        event.preventDefault();

        submitData();

        
        setEditID(null);

    }

    useEffect(() => {
        fetchData();
    })

            return (
                <div >
            <form onSubmit={handelEditFormSubmit}>

                    <div class = "styled-table">
                        <table>
                            <thead>
                                <tr>
                                    {/* <th>Student Assignment ID</th> */}
                                    <th>Student ID</th>
                                    <th>Assignment ID</th>
                                    <th>Description</th>
                                    <th>Student Answer</th>
                                    <th>Total points</th>
                                    <th>Grade</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody >
                        {assignments.map((assignment) => (
                        <Fragment>
                            {editID === assignment.assignment_id ? (
                                <EditableRowGrade assignment={assignment} 
                                handleEditFormChange = {handleEditFormChange}/>
                            ):(
                                <ReadOnlyRowGrade assignment={assignment} 
                                handleEditClick = {handleEditClick}/>
                            )}

                        </Fragment>
                    ))}
                </tbody>
                            
                        </table>
                    </div>
                    </form>
                </div>
                
            
                 
            
        );
    
}

export default T_grades;