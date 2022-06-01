import React, { useState } from "react";
import { useNavigate , Link, NavLink, Route, Routes } from 'react-router-dom';

// class Ann_form extends React.Component {

function Ass_form(){
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         title: ''
    //     };
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //     this.handleChange = this.handleChange.bind(this);
    //     const navigate = useNavigate();
    // }
    const [value, setValue] = useState('')
    const navigate = useNavigate();
    function handleSubmit(event){
        // alert("A new announcement has been posted: " + this.state.value);
        // alert("Success! \nNew Announcement Posted.")
        event.preventDefault();

        // post new announcment to database
        // this.addAnnouncement(this.state.value);
        addAnnouncement(value)

        // reload the current component
        // this.setState({value:''});
        setValue('')
        navigate('/courses_menu/courses_page/T_assignments/')
        


    }
    

    function addAnnouncement(content){
        // let table = document.getElementById("new_ann");
        let request = new XMLHttpRequest()
        request.open("POST", "/new_ann")
        // request.onreadystatechange = function() {
        //     if(this.readyState === 4 && this.status === 200) {
        //         // that.updateUsers(idx, newStatus)
        alert("Success! \nNew Assignment Posted.")

            // }else{
                // alert("Error! Something went wrong.")
            // }
        
        request.send(JSON.stringify({"content": content}))
    }

  
    // render() {
      return (
        <div>
            <h2>New Assignment:</h2>
            <form onSubmit={handleSubmit}>
                <label>
                {/* <textarea  value = {this.state.value} onChange={this.handleChange} /> */}
                <textarea  value = {value} onChange={e => setValue(e.target.value)} />

                </label><br/>
                <input type="submit" value="Post" />
            </form>
        </div>
      );
    // }
  }

  export default Ass_form;