import React, { Component } from "react";

class Account extends Component {

    constructor(props) {
        super(props)
        this.state = {
            new_name: null,
            new_email: null,
            new_s1: null,
            new_s2: null,
            new_s3: null
        }

        this.inputNewName = this.inputNewName.bind(this)
        this.inputNewEmail = this.inputNewEmail.bind(this)
        this.inputNewS1 = this.inputNewS1.bind(this)
        this.inputNewS2 = this.inputNewS2.bind(this)
        this.inputNewS3 = this.inputNewS3.bind(this)
        this.editProfile = this.editProfile.bind(this)
    }

    getData() {
        let request = new XMLHttpRequest()
        request.open("GET", "/users/" + window.sessionStorage.getItem("user_id"))

        request.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let data = JSON.parse(this.response).user
                document.getElementById("account-name").innerText = data[3]
                document.getElementById("account-username").innerText = data[1]
                document.getElementById("account-id").innerText = data[0]
                document.getElementById("account-email").innerText = data[4]
                document.getElementById("account-role").innerText = data[6]
                document.getElementById("account-security-1").innerText = data[7]
                document.getElementById("account-security-2").innerText = data[8]
                document.getElementById("account-security-3").innerText = data[9]
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
                    document.getElementById("account-name").innerText = that.state.new_name
                if (that.state.new_email)
                    document.getElementById("account-email").innerText = that.state.new_email
                if (that.state.new_s1)
                    document.getElementById("account-security-1").innerText = that.state.new_s1
                if (that.state.new_s2)
                    document.getElementById("account-security-2").innerText = that.state.new_s2
                if (that.state.new_s3)
                    document.getElementById("account-security-3").innerText = that.state.new_s3
                that.setState({
                    new_name: null,
                    new_email: null,
                    new_s1: null,
                    new_s2: null,
                    new_s3: null
                })
            }
        }
        request.send(JSON.stringify({
            "new_name": that.state.new_name,
            "new_email": that.state.new_email,
            "new_s1": that.state.new_s1,
            "new_s2": that.state.new_s2,
            "new_s3": that.state.new_s3
        }))
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

    inputNewS1(event) {
        this.setState({
            new_s1: event.target.value
        })
    }

    inputNewS2(event) {
        this.setState({
            new_s2: event.target.value
        })
    }

    inputNewS3(event) {
        this.setState({
            new_s3: event.target.value
        })
    }

    render() {
        this.getData()
        return (
            <div>
                <h2>Account</h2>
                <br />
                <h4>Profile</h4>
                <div class="row">
                    <div className="col-md-1 fw-bold text-uppercase">Name</div>
                    <div className="col-md-2" id="account-name"></div>
                    <div className="col-md-1"></div>
                    <div className="col-md-1 fw-bold text-uppercase">Email</div>
                    <div className="col-md-2" id="account-email"></div>
                    <div className="col-md-1"></div>
                </div>
                <div className="row">
                    <div className="col-md-1 fw-bold text-uppercase">User Name</div>
                    <div className="col-md-2" id="account-username"></div>
                    <div className="col-md-1"></div>
                    <div className="col-md-1 fw-bold text-uppercase">User ID</div>
                    <div className="col-md-2" id="account-id"></div>
                    <div className="col-md-1"></div>
                </div>
                <div className="row">
                    <div className="col-md-1 fw-bold text-uppercase">Role</div>
                    <div className="col-md-2" id="account-role"></div>
                    <div className="col-md-1"></div>
                </div>
                <br />
                <h4>Security Questions</h4>
                <div className="row">
                    <div className="col-md-3 fw-bold">What is your favorite movie?</div>
                    <div className="col-md-3" id="account-security-1"></div>
                </div>
                <div className="row">
                    <div className="col-md-3 fw-bold">What is your father's middle name?</div>
                    <div className="col-md-3" id="account-security-2"></div>
                </div>
                <div className="row">
                    <div className="col-md-3 fw-bold">What is the make of your first car?</div>
                    <div className="col-md-3" id="account-security-3"></div>
                </div>
                <br />
                <button id="edit-profile-button" class="btn btn-outline-secondary" onClick={this.showEditProfileForm}>Edit Profile</button>
                <br />
                <div id="edit-profile" style={{display: "none"}}>
                    <h4>Edit Profile</h4>
                    <form onSubmit={this.editProfile}>
                        <div class="row">
                            <label htmlFor="edit-form-name" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-3">
                                <input className="form-control" id="edit-form-name" name="name" type="text"
                                       value={this.state.new_name} onInput={this.inputNewName}/>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="edit-form-email" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-3">
                                <input className="form-control" id="edit-form-email" name="email" type="email"
                                       value={this.state.new_email} onInput={this.inputNewEmail}/>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="edit-form-s1" className="col-sm-3 col-form-label">What is your favorite movie?</label>
                            <div className="col-sm-3">
                                <input className="form-control" id="edit-form-s1" name="s1" type="text"
                                       value={this.state.new_s1} onInput={this.inputNewS1}/>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="edit-form-s2" className="col-sm-3 col-form-label">What is your father's middle name?</label>
                            <div className="col-sm-3">
                                <input className="form-control" id="edit-form-s2" name="s2" type="text"
                                       value={this.state.new_s2} onInput={this.inputNewS2}/>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="edit-form-s3" className="col-sm-3 col-form-label">What is the make of your first car?</label>
                            <div className="col-sm-3">
                                <input className="form-control" id="edit-form-s2" name="s3" type="text"
                                       value={this.state.new_s3} onInput={this.inputNewS3}/>
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
