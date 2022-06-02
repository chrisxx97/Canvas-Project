import React from 'react'

const EditableRow = ({assignment, handleEditFormChange})=>{
    return (
        <tr>
            <td>{assignment.assignment_id}</td>
            <td>{assignment.description}</td>
            <td>{assignment.due_date}</td>
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