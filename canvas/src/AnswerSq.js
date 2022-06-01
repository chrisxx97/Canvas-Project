import React, { Component, useState, useEffect } from "react";
import "./login.css";
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

export default function AnswerSq() {
	const [username, setUsername] = useState();
	const [sa1, setSa1] = useState();
	const [sa2, setSa2] = useState();
	const [sa3, setSa3] = useState();
	const [pwd, setPwd] = useState();
	const [validPwd, setValidPwd] = useState(false);

	useEffect(() => {
		if(pwd){
			const result = check_pwd(pwd);
			setValidPwd(result);
			// console.log(result)
		}
	}, [pwd]);

	const submitForm = () => {
		if (!validPwd) {
			alert('Password must contain more than 5 characters and at least one number and symbol!')
		} else {
			// POST request with a JSON body using axios
			const data = { username: username, sa1:  sa1, sa2: sa2, sa3: sa3, pwd: pwd};
			axios.post('http://localhost:5000/login/AnswerSq', data)
				.then(response => {
					console.log(response)
					if (response.data['user_exists']) {
						if (response.data['answer_match']) {
							console.log(response['new_password'])
							alert('Your password has been reset!')
						} else {
							alert('Your security answers are wrong!')
						}
					} else{
						alert('This username does not exists!')

					}

				});
		}
		
	}


		return (
			<div>
				<div id="security_questions">
					<p>In order to reset your password, please enter your username and answer the following security question:</p><br />
					<form>
						<label for="username">What is your username:</label><br />
						<input type="text" id="username" name="username" placeholder="Enter username" 
						onChange={(e) => setUsername(e.target.value)}/><br />
						<label for="ans1">What is your favorite movie:</label><br />
						<input type="text" id="ans1" name="ans1" placeholder="Enter Answer Here" 
						onChange={(e) => setSa1(e.target.value)}/><br />
						<label for="ans2">What is your father's middle name:</label><br />
						<input type="text" id="ans2" name="ans2" placeholder="Enter Answer Here" 
						onChange={(e) => setSa2(e.target.value)}/><br />
						<label for="ans3">What is the make of your first car:</label><br />
						<input type="text" id="ans3" name="ans3" placeholder="Enter Answer Here" 
						onChange={(e) => setSa3(e.target.value)}/><br /><br />
						<input type="text" id="pwd" name="pwd" placeholder="Enter a new password" 
						onChange={(e) => setPwd(e.target.value)}/><br />
						<button type="button" onClick={submitForm}>SUBMIT</button>
					</form>
				</div>
			</div>
		)
}
