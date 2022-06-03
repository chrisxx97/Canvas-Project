import React, { useState, useEffect } from "react";
import axios from "axios";
function check_pwd(pwd){
	let rule1 = (pwd.length >= 5);
	let rule2 = false;
	let rule3 = false;
	let special_char = '!@#$%';
	const nums = "0123456789";
	for (var i = 0; i < special_char.length; i++){
		if(pwd.includes(special_char[i])){
			rule2 =  true;
			break;
		}
	}

	for (let i = 0; i < 10; i ++){
		if(pwd.includes(i.toString())){
			rule3 = true;
			break;
		}
	}
	return rule1 && rule2 && rule3;
}

export default function SignUp() {
	const email_regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/

	const [username, setUsername] = useState();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [validEmail, setValidEmail] = useState(false);
	const [pwd, setPwd] = useState();
	const [validPwd, setValidPwd] = useState(false);
	const [confirmPwd, setConfirmPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [sa1, setSa1] = useState();
	const [sa2, setSa2] = useState();
	const [sa3, setSa3] = useState();
	const [role, setRole] = useState("student");

	useEffect(() => {
		const result = email_regex.test(email);
		setValidEmail(result);
	}, [email]);

	useEffect(() => {
		if(pwd){
			const result = check_pwd(pwd);
			setValidPwd(result);
			// console.log(result)
			const match = pwd === confirmPwd;
			// console.log(confirmPwd)
			setValidMatch(match);
		}
	}, [pwd, confirmPwd]);

	const submitForm = () => {
		const data = {
			username: username, name: name, pwd: pwd, email: email,
			confirmPwd: confirmPwd, sa1: sa1, sa2: sa2, sa3: sa3, role: role
		};
		// validate input
		if (!validEmail) {
			alert("Email is invalid")
		} else if (!validPwd) {
			alert("Password format is invalid, should be 5 characters and contain  at least 1 symbol and number!")
		} else if (!validMatch) {
			alert("Your password must match!")
		} else {
		// POST request with a JSON body using axios
		axios.post('http://localhost:5000/signup', data)
			.then(response => {
				console.log(response.data["success"])
				alert("register success")

			});
		}

	}

	return (
		<div>
			<h1>The University of Chicago</h1>
			<br />
			<h4>Enter the Following Information to Sign Up</h4>
			<br />
			<form>
				<input type="text" id="username" name="username" placeholder="Username"
					onChange={(e) => setUsername(e.target.value)} /><br />
				<input type="text" id="name" name="name" placeholder="Name"
					onChange={(e) => setName(e.target.value)} /><br />
				<input type="text" id="email" name="email" placeholder="Email (must be valid)"
					onChange={(e) => setEmail(e.target.value)} /><br />
				<input type="text" id="pwd" name="pwd" placeholder="Password (more than 5 chars, at least 1 number and 1 symbol(!@#$%))"
					onChange={(e) => setPwd(e.target.value)} /><br />
				<input type="text" id="confirm_pwd" name="confirm_pwd" placeholder="Confirm your password"
					onChange={(e) => setConfirmPwd(e.target.value)} /><br />
				<p id="sq1" name="sq1">What is your favorite movie?</p>
				<input type="text" id="sa1" name="sa1" placeholder="Your first answer"
					onChange={(e) => setSa1(e.target.value)} /><br />
				<p id="sq2" name="sq2">What is your father's middle name?</p>
				<input type="text" id="sa2" name="sa2" placeholder="Your second answer"
					onChange={(e) => setSa2(e.target.value)} /><br />
				<p id="sq3" name="sq3">What is the make of your first car?</p>
				<input type="text" id="sa3" name="sa3" placeholder="Your third answer"
					onChange={(e) => setSa3(e.target.value)} /><br /><br />
				<label for="student">student</label>
				<input type="radio" id="student" name="account_type" value="student"
					onChange={(e) => setRole("student")} />
				<label for="teacher">teacher</label>
				<input type="radio" id="teacher" name="account_type" value="teacher"
					onChange={(e) => setRole("teacher")} /><br /><br />
				<button type="button" onClick={submitForm}>Sign Up</button>
			</form>
			<br />
		</div>
	);
};
