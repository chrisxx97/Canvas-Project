import React, { useState } from "react";
import { useNavigate , Link, NavLink, Route, Routes } from 'react-router-dom';

function Ass_form(){

    // const [description, setDescription] = useState('')
    // const [due, setDue] = useState('')
    // const [points, setPoints] = useState('')
    const [inputs, setInputs] = useState([])

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    function handleSubmit(event){
        // alert("A new announcement has been posted: " + this.state.value);
        // alert("Success! \nNew Announcement Posted.")
        event.preventDefault();

        // post new announcment to database
        // this.addAnnouncement(this.state.value);
        addAnnouncement()

        // reload the current component

        // setValue('')
        navigate('/courses_menu/courses_page/T_assignments/')
        


    }
    

    function addAnnouncement(){

        let request = new XMLHttpRequest()
        request.open("POST", "/new_ass")
        alert("Success! \nNew Assignment Posted.")

        
        request.send(JSON.stringify({"description": inputs.description, "due":inputs.due, "points":inputs.points}))
    }

  

      return (
        <div>
            <h2>New Assignment:</h2>
            <form onSubmit={handleSubmit}>
                <label> Description
                <textarea  name = "description" value = {inputs.description || ""} onChange={handleChange} />
                </label>
                <label> Due Date
                <input name = "due" type = "date" value = {inputs.due || ""} onChange = {handleChange}/>
                </label>
                <label> Points
                <input name = "points" type = "number" value = {inputs.points || ""} onChange = {handleChange}/>
                </label>
                <br/>
                <input type="submit" value="Post" />
            </form>
        </div>
      );

  }

  export default Ass_form;