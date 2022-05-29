import React, { Component } from "react";
import "./login.css";
import ForgotPw from './ForgorPw';

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
					<NavLink to="/ForgotPw"><div>Forgot your password?</div></NavLink><br>
					<button type="submit">LOG IN</button>
				</form>
				<br>
				<p>You should first login or register to click on other buttons.</p> 
        <Routes>
          <Route path = "/ForgotPw" element = {<ForgorPw />}/>
        </Routes>
			</div>
		)
	}
}