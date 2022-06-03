import React, { Component } from "react";

class Account extends Component {

    constructor(props) {
        super(props)
        this.state = {
            new_name: null,
            new_email: null
        }

        this.inputNewName = this.inputNewName.bind(this)
        this.inputNewEmail = this.inputNewEmail.bind(this)
        this.editProfile = this.editProfile.bind(this)
    }

    getData() {
        let request = new XMLHttpRequest()
        request.open("GET", "/users/" + window.sessionStorage.getItem("user_id"))

        request.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let data = JSON.parse(this.response).user
                document.getElementById("account-name").innerText = "Name: " + data[3]
                document.getElementById("account-username").innerText = "Username: " + data[1]
                document.getElementById("account-id").innerText = "ID: " + data[0]
                document.getElementById("account-email").innerText = "Email: " + data[4]
                document.getElementById("account-role").innerText = "Role: " + data[6]
            }
        }

        request.send()
    }

    showEditProfileForm() {
        document.getElementById("edit-profile-success").style.display = "none"
        document.getElementById("edit-profile").style.display = ""
        document.getElementById("edit-profile-button").style.display = "none"
    }

    editProfile(event) {
        event.preventDefault()
        let that = this
        let request = new XMLHttpRequest()
        request.open("POST", "/edit_profile/" + window.sessionStorage.getItem("user_id"))
        request.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                document.getElementById("edit-profile").style.display = "none"
                document.getElementById("edit-profile-button").style.display = ""
                let p = document.getElementById("edit-profile-success")
                p.style.display = "";
                p.innerText = JSON.parse(this.response).message

                if (that.state.new_name)
                    document.getElementById("account-name").innerText = "Name: " + that.state.new_name
                if (that.state.new_email)
                    document.getElementById("account-email").innerText = "Email: " + that.state.new_email
                that.setState({
                    new_name: null,
                    new_email: null
                })
            }
        }
        request.send(JSON.stringify({ "new_name": that.state.new_name, "new_email": that.state.new_email }))
    }

    inputNewName(event) {
        this.setState({
            new_name: event.target.value
        })
    }

    inputNewEmail(event) {
        this.setState({
            new_email: event.target.value
        })
    }

    render() {
        this.getData()
        return (
            <div>
                <h2>Account</h2>
                <br />
                <h4>Profile</h4>
                <br />
                <div class="row">
                    <div class="col-md-2">
                        <p id="account-name"></p>
                    </div>
                    <div class="col-md-4">
                        <p id="account-email"></p>
                    </div>
                </div>
                <div className="row">
                    <div class="col-md-2">
                        <p id="account-username"></p>
                    </div>
                    <div class="col-md-2">
                        <p id="account-id"></p>
                    </div>
                    <div class="col-md-2">
                        <p id="account-role"></p>
                    </div>
                </div>
                <br />
                <button id="edit-profile-button" class="btn btn-outline-secondary" onClick={this.showEditProfileForm}>Edit Profile</button>
                <br />
                <div id="edit-profile" style={{display: "none"}}>
                    <h4>Edit Profile</h4>
                    <form onSubmit={this.editProfile}>
                        <div class="row">
                            <label htmlFor="edit-form-name" className="col-sm-1 col-form-label">Name</label>
                            <div className="col-sm-3">
                                <input className="form-control" id="edit-form-name" name="name" type="text"
                                       value={this.state.new_name} onInput={this.inputNewName}/>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="edit-form-email" className="col-sm-1 col-form-label">Email</label>
                            <div className="col-sm-3">
                                <input className="form-control" id="edit-form-email" name="email" type="email"
                                       value={this.state.new_email} onInput={this.inputNewEmail}/>
                            </div>
                            <div className="col-sm-2">
                                <input className="form-control" type="submit" value="Edit" />
                            </div>

                        </div>

                    </form>
                </div>
                <p id="edit-profile-success"></p>
            </div>
        );
    }
}

export default Account;
