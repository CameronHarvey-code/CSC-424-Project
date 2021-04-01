import React, { useEffect, useState, location } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link } from "react-router-dom";
import Axios from 'axios';
import auth from './auth';

import styles from './loggedin.css';
import Display from './display.js';



export const Loggedin = props => {

  const [date, setDate] = useState("");
  const [event, setEvent] = useState("");


  function handleSubmit(event) {
    event.preventDefault();
  }

    function openForm() {
        document.getElementById("myForm").setAttribute('style', 'display: block');
      

    };

    function closeForm() {
        document.getElementById("myForm").style.display = "none";

    };

    const logout = () => {

        Axios.get('http://localhost:3001/logout', {
          }).then((response) => { 
          });

        props.history.push('/');
        window.location.reload();
      };

      const addEvent = () => {
        Axios.post('http://localhost:3001/addEvent', {
          date: date,
          event: event,
        }).then((response) => {

       
        });
        window.location.reload();
        }



  

    return(
      <div>
      <head>
        <link rel="stylesheet" href="loggedin.css"></link>
        </head>
      <body>
        <button class="open-button" onclick={openForm}>Add New Event</button>

            <div class="form-popup" id="myForm">
                 <form class="form-container" onSubmit = {handleSubmit} >
                 <h1>Add Event</h1>

               
                <label for="date"><b>Date</b></label>
                <input type="date" placeholder="Enter Event Date" name="date" value={date}  onChange={(e) => setDate(e.target.value)} required></input>

  
                <label for="name"><b>Event Name</b></label>
                <input type="text" placeholder="Enter Event Name" name="name" value={event}  onChange={(e) => setEvent(e.target.value)} required></input>

                <button type="submit" class="btn" onClick={addEvent}>Add Event</button>
                 <button type="submit" class="btn cancel" onclick={closeForm}>Close</button>


                </form>



            </div>


            <div id="target">
  
            </div>

            <logoutButton>
                 <Button onClick={logout} block size="lg" type="submit">
                     Logout
                 </Button>
                </logoutButton>




            </body> 
          

              <Display/>
              
            </div>
            
    );

 }


