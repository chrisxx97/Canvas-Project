import React, { Component } from "react";
import "./login.css";


class AnswerSq extends Component {
	render() {
		return (
			<div>
				<h1>The University of Chicago</h1>
				<br />
				<h4>Forgot Password?</h4>
				<br />
				<p>You have indicated that you've forgotten your password, or you have entered your password incorrectly three times.</p><br />
				<div id="security_questions">
					<p>In order to reset your password, please answer the following security question:</p><br />
					<form>
						<label for="ans1">Question 1:</label><br />
						<input type="text" id="ans1" name="ans1" placeholder="Enter Answer Here" /><br />
						<label for="ans2">Question 2:</label><br />
						<input type="text" id="ans2" name="ans2" placeholder="Enter Answer Here" /><br />
						<label for="ans3">Question 3:</label><br />
						<input type="text" id="ans3" name="ans3" placeholder="Enter Answer Here" /><br /><br />
						<button type="submit" onclick="validate_security_questions()">SUBMIT</button>
					</form>
				</div>
			</div>
		)
	}
}

export default AnswerSq;