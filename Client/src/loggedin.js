import React, { useEffect, useState, location } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link } from "react-router-dom";
import Axios from 'axios';
import auth from './auth';
import SplitButton from 'react-bootstrap/SplitButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import styles from './loggedin.css';
import Display from './display.js';



export const Loggedin = props => {

  const [date, setDate] = useState("");
  const [event, setEvent] = useState("Add Service Type");
  const [disp, setDisp] = useState("none");
  const [enable, setEnable] = useState("disabled");
  const [predDisp, setpredDisp] = useState("none")



  function handleSubmit(event) {
    event.preventDefault();
  }

    function openForm() {
        setDisp('');
        console.log(disp);
    };

    function predictForm() {
      setpredDisp('');
      console.log(disp);
  };

  function predictCloseForm() {
    setpredDisp("none");
    console.log(disp);
};

   function closeForm() {
        setDisp("none");
    };
  
    function clearForm() {
      setDate("Add Event Date");
      setEvent("Add Service Type");
      setEnable("Disabled");
  };

  function validateInput() {

     prompt("Hello");
   
    
};

    const logout = () => {

        Axios.get('http://localhost:3001/logout', {
          }).then((response) => { 
          });

        props.history.push('/');
        window.location.reload();
      };

      const addEvent = () => {

        console.log(date);


        Axios.post('http://localhost:3001/addEvent', {
          date: date,
          event: event,
        }).then((response) => {

       
        });
        window.location.reload();
        }

      const predict = () => {

          console.log(date);
          Axios.post('http://localhost:3001/predict',{
            date: date,
          }).then((response) => {

          });
          

      }



  

    return(
      <div>
      <head>
        <link rel="stylesheet" href="loggedin.css"></link>
        </head>
      <body>
      <button type="submit" class="predict-button"  onClick={predictForm}>Predict Attendance</button>
        <button type="submit" class="open-button"  onClick={openForm}>New Event</button>
        

        <div class="predict-popup" style={{display: `${predDisp}`}} id="myForm">
            
            <form class="form-container"  onSubmit = {handleSubmit} >
            <h2 className="pred-event">Predict Attendance</h2><button class="btn-pred-clear" onClick={clearForm}>clear</button>

           <input type="date" placeholder="Entre Prediction Date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required></input>

           <button type="submit" class="btn" onClick={predict} display={disp}>Predict Date</button>
           <button class="btn cancel" onClick={predictCloseForm}>Close</button>
            


           </form>



       </div><div class="form-popup" style={{display: `${disp}`}} id="myForm">
            
            <form class="form-container"  onSubmit = {handleSubmit} >
            <h2 className="add-event">Add Event</h2><button class="btn-clear" onClick={clearForm}>clear</button>
            
          
            <Dropdown as={ButtonGroup} >
           <Button id="service-type" variant="success">{event}</Button>

           <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

           <Dropdown.Menu>
           <Dropdown.Item onClick={(e) => setEvent('SUNDAY')}>SUNDAY</Dropdown.Item>
           <Dropdown.Item onClick={(e) => setEvent('WEDNESDAY')}>WEDNESDAY</Dropdown.Item>
           </Dropdown.Menu>
           </Dropdown>

           <input type="date" placeholder="Enter Event Date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required></input>

           <button type="submit" class="btn" onClick={addEvent} display={disp}>Add Event</button>
           <button class="btn cancel" onClick={closeForm}>Close</button>
            


           </form>



       </div>
            <div class="form-popup" style={{display: `${disp}`}} id="myForm">
            
                 <form class="form-container"  onSubmit = {handleSubmit} >
                 <h2 className="add-event">Add Event</h2><button class="btn-clear" onClick={clearForm}>clear</button>
                 
               
                 <Dropdown as={ButtonGroup} >
                <Button id="service-type" variant="success">{event}</Button>

                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => setEvent('SUNDAY')}>SUNDAY</Dropdown.Item>
                <Dropdown.Item onClick={(e) => setEvent('WEDNESDAY')}>WEDNESDAY</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>

                <input type="date" placeholder="Enter Event Date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required></input>

                <button type="submit" class="btn" onClick={addEvent} display={disp}>Add Event</button>
                <button class="btn cancel" onClick={closeForm}>Close</button>
                 


                </form>



            </div>


            <div id="target">
            </div>

            
                 <button class="logout" onClick={logout} block size="lg" type="submit">
                     Logout
                 </button>
               



            </body> 
          

              <Display/>
              
            </div>
            
    );

 }
