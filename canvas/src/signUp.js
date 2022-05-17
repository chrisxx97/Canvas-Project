import React, { Component } from "react";
import "./login.css";

function validate_info() {
	// reference: https://www.w3resource.com/javascript/form/email-validation.php
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("email"))) {
		if (Number.isInteger(document.getElementById("s_id"))) {
			if (document.getElementById("pw").length === 5) {
				if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+[0-9]+/.test(document.getElementById("pw")) == true) {
					if (document.getElementById("pw") === document.getElementById("confirm_pw")) {
						if (document.getElementById("student").checked == true || document.getElementById("teacher").checked == true) {
							// security questions chose by users or default by us?
							return true;
						}
						alert("You must select an account type!");
						return false;
					}
					alert("Password must match!");
					return false;

				}
				alert("Password must contain at least 1 symbol and 1 number!");
				return false;

			}
			alert("Password must be 5 characters in length!");
			return false;
		}
		alert("ID must be a number!")
		return false;
	}
	alert("Email not valid!");
	return false;
}

class signUp extends Component {
	render() {
		<h1>The University of Chicago</h1>
		<br>
		<h4>Enter the Following Information to Sign Up</h4>
		<br>
		<form action="/action_page.php">
			<input type="text" id="name" name="name" placeholder="Name"><br>
			<input type="text" id="email" name="email" placeholder="Email (must be valid)"><br>
			<input type="text" id="s_id" name="s_id" placeholder="ID (must be a number)"><br>
			<input type="text" id="pw" name="pw" placeholder="Password (5 chars in length, at least 1 number and 1 symbol)"><br>
			<input type="text" id="confirm_pw" name="confirm_pw" placeholder="Confirm your password"><br>
			<input type="text" id="sq1" name="sq1" placeholder="Your first security question"><br>
			<input type="text" id="sa1" name="sa1" placeholder="Your first answer"><br>
			<input type="text" id="sq2" name="sq2" placeholder="Your second security question"><br>
			<input type="text" id="sa2" name="sa2" placeholder="Your second answer"><br>
			<input type="text" id="sq3" name="sq3" placeholder="Your third security question"><br>
			<input type="text" id="sa3" name="sa3" placeholder="Your third answer"><br><br>
			<label for="student">student</label>
			<input type="radio" id="student" name="account_type" value="student">
			<label for="teacher">teacher</label>
			<input type="radio" id="teacher" name="account_type" value="teacher"><br><br>
			<button type="submit">Sign Up</button>
		</form>
	}
}