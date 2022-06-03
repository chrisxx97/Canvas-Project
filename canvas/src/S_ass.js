import React, {useState, useEffect, Fragment} from "react";
import EditableRow from "./components/EditableRow";
import ReadOnlyRow from "./components/ReadOnlyRow";



const S_ass = () =>{
    const [assignments, setAssignments] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editFormData, setEditFormData] = useState([]);

    async function fetchData(){
        const res = await fetch('/s_assignments')
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
        newFormData["description"] = assignment.description;
        newFormData["due_date"] = assignment.due_date;

        setEditFormData(newFormData);
    }

    function submitData(){
        // const data = { username: 'example' };

        fetch("/new_submission", {
            method: "POST",
            body: JSON.stringify({
                assignment_id:editFormData.assignment_id,
                description:editFormData.description,
                due_date: editFormData.due_date,
                answer: editFormData.answer,
                user_id: window.sessionStorage.getItem('user_id'),
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

    return(

        <div>
            {/* <span> {JSON.stringify(announcements)}</span> */}
            <form onSubmit={handelEditFormSubmit}>
            <table class = "styled-table">
                <thead>
                    <tr>
                        <th>Assignment ID</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Your Submission</th>
                        <th>Action</th>


                    </tr>
                </thead>
                <tbody >
                    {assignments.map((assignment) => (
                        <Fragment>
                            {editID === assignment.assignment_id ? (
                                <EditableRow assignment={assignment} 
                                handleEditFormChange = {handleEditFormChange}/>
                            ):(
                                <ReadOnlyRow assignment={assignment} 
                                handleEditClick = {handleEditClick}/>
                            )}

                        </Fragment>
                    ))}
                </tbody>
                
            </table>
            </form>
        </div>
    )
}

export default S_ass;