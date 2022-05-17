import React, { Component } from "react";
import "./login.css";

function validate_security_questions() {.  // did not work?
	let ans1 = document.getElementById('ans1');
	let ans2 = document.getElementById('ans2');
	let ans3 = document.getElementById('ans3');

	// validate if all answers match the database information
	document.getElementById('reset_password').removeAttribute("hidden");
	console.log('123')
	//question_page.setAttribute("hidden", "hidden")
}

class forgotPw extends Component {
	render() {
		return (
			<h1>The University of Chicago</h1>
			<br>
			<h4>Forgot Password?</h4>
			<br>
			<p>You have indicated that you've forgotten your password, or you have entered your password incorrectly three times.</p><br>

			<div id="security_questions">
				<p>In order to reset your password, please answer the following security question:</p><br>
				<form>
					<label for="ans1">Question 1:</label><br>
					<input type="text" id="ans1" name="ans1" placeholder="Enter Answer Here"><br>
					<label for="ans2">Question 2:</label><br>
					<input type="text" id="ans2" name="ans2" placeholder="Enter Answer Here"><br>
					<label for="ans3">Question 3:</label><br>
					<input type="text" id="ans3" name="ans3" placeholder="Enter Answer Here"><br><br>
					<button type="submit" onclick="validate_security_questions()">SUBMIT</button>
				</form>
			</div>

			<div id="reset_password" hidden>
				<p>You can now reset your password.</p>
				<form>
					<input type="text" id="new_pw" placeholder="Enter your new password"><br>
					<button type="submit">RESET</button>
				</form>
			</div>	

			<br><br>
			<p>If you indicated that you've forgotten your password in error, you may close your browser completely, reopen your browser, then go to the site you wish to access to try again.</p> 
		)
	}
}