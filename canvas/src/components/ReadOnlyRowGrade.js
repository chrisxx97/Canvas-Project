import React from 'react'


const ReadOnlyRow = ({assignment, handleEditClick}) => {
    return (
        <tr>
            <td>{assignment.s_assignment_id}</td>
            <td>{assignment.assignment_id}</td>
            <td>{assignment.description}</td>
            <td>{assignment.points}</td>
            <td>{assignment.grade}</td>
            <td>
                <button type = "button" onClick={(event) => handleEditClick(event, assignment)}>New Grade</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow;