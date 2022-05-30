import React, { Component} from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "./Courses.css";

class S_assignments extends Component {
    constructor(props){
        super(props)
        // this.new_submission = this.new_submission.bind(this)
        // this.state = {
        //     show: false
        // }
        let show = true
    }

    click_show(){
        // if (this.state.show === true){
        //     this.setState({show:false})
        // }else{
        //     this.setState({show:true})
        // }
        this.show = false


    }

    
  
    getTable(){
        let request = new XMLHttpRequest()
        
        request.open("GET", "/s_assignments")
        request.onreadystatechange = function(){
            if (this.readyState === 4 && this.status===200){
                let table = document.getElementById("s_assignments_table")
                let data = JSON.parse(this.response).data
                for (let i = 0; i < data.length; i++) {
                    let row = table.insertRow()
                    row.insertCell().innerHTML = data[i][0]
                    row.insertCell().innerHTML = data[i][1]
                    row.insertCell().innerHTML = data[i][2]
                    row.insertCell().innerHTML = data[i][3]
                    let cell = row.insertCell()
                    cell.innerHTML = "<button class = 'submissions'>New Submission</button>"
                    
                }
            }
        }
        request.send()
    }

    submitButtons(){
        setTimeout(() => {
            let buttons = document.getElementsByClassName('submissions')
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].onclick = () => this.new_submission(i)
            }
        }, 300)
    }

    new_submission(idx){
        this.click_show()
        // let that = this
        // let table = document.getElementById("s_assignments_table")
        // let assignment_id = table.rows[idx].cells[0].innerHTML
        // let user_id = localStorage.getItem("user_id")
        // let request = new XMLHttpRequest()
        // request.open("POST", "/new_submission")
        // request.onreadystatechange = function() {
        //     if(this.readyState === 4 && this.status === 200) {
        //         that.updateSubmission(assignment_id)
        //     }
        // }
        // request.send(JSON.stringify({ "assignment_id": assignment_id, "user_id":user_id }))

    }

    updateSubmission(id){

    }

    

    Results = () =>(
        <div id="results" >
            Some Results
        </div>
        )
        
    
    
    render() { 
        
            this.getTable()
            this.submitButtons()
            return (
                
                <div class = "flex-child">
                    
                    <div class = "styled-table">
                        <table >
                            <thead>
                                <tr>
                                    <th>Assignment ID</th>
                                    
                                    <th>Description</th>
                                    <th>Due Date</th>
                                    <th>Your Submission</th>
                                    <th>New Submission</th>

                                </tr>
                            </thead>
                            <tbody id = "s_assignments_table">
                
                            </tbody>
                            
                        </table>
                    </div> 
                    <div id = "new_sub" >
                        { this.show ? <this.Results />:null }
                        adada
                    </div>
                    

                </div>
                
            
                 
            
        );
    }
}

export default S_assignments;