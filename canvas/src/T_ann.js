import React, {useState, useEffect} from "react";
import { BrowserRouter, Link,NavLink, Route, Routes } from 'react-router-dom';
import Ann_form from "./Ann_form";

const T_ann = () =>{
    const [announcements, setAnnouncements] = useState([]);


    async function fetchData(){
        const res = await fetch('/t_ann')
        res.json().then(res=>setAnnouncements(res));
    }

    useEffect(() => {
        fetchData();
    })

    return(

        <div>
            {/* <span> {JSON.stringify(announcements)}</span> */}
            <table class = "styled-table">
                <thead>
                    <tr>
                        <th>Announcement ID</th>
                        <th>Date Posted</th>
                        {/* <th>Title</th> */}
                        <th>Announcement</th>

                    </tr>
                </thead>
                <tbody id = "s_ann_table">
                    {announcements.map((announcement) => (
                        <tr>
                            <td>{announcement.announcement_id}</td>
                            <td>{announcement.posted_date}</td>
                            <td>{announcement.content}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            <NavLink to = "Ann_form">Create a New Announcement</NavLink>
                    <Routes>
                        <Route path = "/Ann_form" element = {<Ann_form />}/>
                    </Routes>
        </div>
    )
}

export default T_ann;