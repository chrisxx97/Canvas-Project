import React, { Component } from "react";
import "./login.css";

class SignUp extends Component {
	// list of functions

	render() {

		return (
			<div>
					<h1>The University of Chicago</h1>
					<br />
					<h4>Enter the Following Information to Sign Up</h4>
					<br />
					<form>
						<input type="text" id="name" name="name" placeholder="Name" /><br />
						<input type="text" id="email" name="email" placeholder="Email (must be valid)" /><br />
						<input type="text" id="s_id" name="s_id" placeholder="ID (must be a number)" /><br />
						<input type="text" id="pw" name="pw" placeholder="Password (5 chars in length, at least 1 number and 1 symbol)" /><br />
						<input type="text" id="confirm_pw" name="confirm_pw" placeholder="Confirm your password" /><br />
						<p id="sq1" name="sq1">What is your favorite movie?</p><br />
						<input type="text" id="sa1" name="sa1" placeholder="Your first answer" /><br />
						
						<p id="sq2" name="sq2">What is your father's middle name?</p><br />
						<input type="text" id="sa2" name="sa2" placeholder="Your second answer" /><br />
						<p id="sq3" name="sq3">What is the make of your first car?</p><br />
						<input type="text" id="sa3" name="sa3" placeholder="Your third answer" /><br /><br />
						<label for="student">student</label>
						<input type="radio" id="student" name="account_type" value="student" />
						<label for="teacher">teacher</label>
						<input type="radio" id="teacher" name="account_type" value="teacher" /><br /><br />
						<button type="submit">Sign Up</button>
					</form>
					<br />
			</div>
			)
	}
}

export default SignUp;