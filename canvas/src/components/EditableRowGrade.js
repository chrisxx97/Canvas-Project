import React from 'react'

const EditableRow = ({assignment, handleEditFormChange})=>{
    return (
        <tr>
            <td>{assignment.user_id}</td>
            <td>{assignment.assignment_id}</td>
            <td>{assignment.description}</td>
            <td>{assignment.answer}</td>
            <td>{assignment.points}</td>
            {/* <td>{assignment.grade}</td> */}
            <td>
                <input type = "text" name = "answer" onChange = {(event=>handleEditFormChange(event, assignment))}/>
            </td>
            <td>
                <button type="submit">Save</button>
            </td>
        </tr>
    )
}

export default EditableRow;