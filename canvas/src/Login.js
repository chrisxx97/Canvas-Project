import React, { Component, useState } from "react";
import {
    Route,
    Routes,
    NavLink,
    BrowserRouter
} from "react-router-dom";
//import "./login.css";
import AnswerSq from "./AnswerSq";
import axios from "axios";	


export default function Login() {
	const [username, setUsername] = useState();
	const [pwd, setPwd] = useState();

	const submitForm = () => {
		// POST request with a JSON body using axios
		const data = { username:  username, pwd: pwd};
		axios.post('http://localhost:5000/login', data)
			.then(response => {
				console.log(response)
				if(response.data['success']){
					window.sessionStorage.setItem('login', true)
					window.location.reload(false)
				}else{
					alert('login fails')

				}

			});
	}



	return (
		<div>
			<h1>The University of Chicago</h1>
			<br />
			<h4>Log in to Your UChicago Account</h4>
			<br />
			<form name="myform">
				<input type="text" id="username" name="username" placeholder="Username" 
				onChange={(e) => setUsername(e.target.value)} /><br />
				<input type="text" id="pwd" name="pwd" placeholder="Password" 
				onChange={(e) => setPwd(e.target.value)}/><br /><br />
				<NavLink to="/login/AnswerSq"><div>Forgot your password?</div></NavLink><br />
				<button type="button" onClick={submitForm}>LOG IN</button>
			</form>
			<br />
			<p>You should first login or register to click on other buttons.</p> 
	<Routes>
		<Route path = "/AnswerSq" element = {<AnswerSq />}/>
	</Routes>
		</div>
	);
	
}
