import React, { useState } from "react";
import {
    NavLink,
	Link
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
				if (response.data['inactive']) {
					alert('Please wait for Admin to activate your account.')
				} else if(response.data['success']){
					let user_id = response.data['user_id']
					let role = response.data['role']
					window.sessionStorage.setItem('login', true)
					window.location.reload(false)
					window.sessionStorage.setItem('user_name', username)
					window.sessionStorage.setItem('user_id', user_id)
					window.sessionStorage.setItem('role', role)
				}else{
					alert('login fails')

				}

			});
	}



	return (
		<div id="login_page">
			<h1 id="login">The University of Chicago</h1>
			<br />
			<h4 id="login">Log in to Your UChicago Account</h4>
			<br />
			<form name="myform" >
				<input type="text" id="username" name="username" placeholder="Username"
				onChange={(e) => setUsername(e.target.value)} /><br />
				<input type="text" id="pwd" name="pwd" placeholder="Password" 
				onChange={(e) => setPwd(e.target.value)}/><br /><br />
				<NavLink to="AnswerSq"><div>Forgot your password?</div></NavLink><br />
				<button type="button" onClick={submitForm}>LOG IN</button>
			</form>
			<br />
		</div>
	);
	
}
