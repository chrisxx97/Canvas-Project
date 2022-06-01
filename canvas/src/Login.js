import React, { useState } from "react";
import {
    Route,
    Routes,
    NavLink,
	Link,
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
		<div id="login_page">
			<h1 id="login">The University of Chicago</h1>
			<br />
			<h4 id="login">Log in to Your UChicago Account</h4>
			<br />
			<form name="myform" >
				<input type="text" id="username" name="username" placeholder="name" 
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


