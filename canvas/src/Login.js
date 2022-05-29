import React, { Component } from "react";
import "./login.css";

class Login extends Component {
	// list of functions

	render() {

		return (
			<div>
				<h1>The University of Chicago</h1>
				<br>
				<h4>Log in to Your UChicago Account</h4>
				<br>
				<form name="myform" action="/action_page.php">
					<input type="text" id="cnetid" name="cnetid" placeholder="CNetID / UCMEDID"><br>
					<input type="text" id="pw" name="pw" placeholder="Password"><br><br>
					<a href="file:///Users/apple/Desktop/Web%20Project/forgotpw.html">Forgot your password?</a><br>
					<a href="file:///Users/apple/Desktop/Web%20Project/signup.html">Sign up</a><br></br>
					<button type="submit">LOG IN</button>
				</form>
				<br>
				<p>You should login to click on other buttons.</p> 
			</div>
		)
	}
}