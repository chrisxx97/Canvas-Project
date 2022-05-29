import React, { Component } from "react";
import "./login.css";

class ResetPw extends Component {
	render() {
		return (
			<div>
				<p>You can now reset your password.</p>
				<form>
					<input type="text" id="new_pw" placeholder="Enter your new password" /><br />
					<button type="submit">RESET</button>
				</form>
			</div>
			)
	}
}

export default ResetPw;