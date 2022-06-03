import React from 'react'


const ReadOnlyRow = ({assignment, handleEditClick}) => {
    return (
        <tr>
            <td>{assignment.assignment_id}</td>
            <td>{assignment.description}</td>
            <td>{assignment.due_date}</td>
            <td>{assignment.answer}</td>
            <td>
                <button type = "button" onClick={(event) => handleEditClick(event, assignment)}>New Submission</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow;