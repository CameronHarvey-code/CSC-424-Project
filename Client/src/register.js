import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link} from 'react-router-dom';
import Axios from 'axios';






export const Register = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const [registerStatus, setRegisterStatus] = useState("");

  function validateForm() {
    return emailRegister.length > 0 && passwordRegister.length > 0 && firstName.length > 0 && lastName.length >0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }



  const register = () => {
    Axios.post('http://localhost:3001/register', {
      email: emailRegister,
      password: passwordRegister,
      firstName: firstName,
      lastName: lastName,
    }).then((response) => {
      console.log(response);
    });

    setRegisterStatus("Succesfully registered. Redirecting..");
    console.log("Reg status:", registerStatus);

    setTimeout(function () {
      props.history.push("/");
    window.location.reload();
  }, 3000);

   
  };

  

  return (

    



    <div className="Register" >

   
    <h1>Register </h1>

  
      <Form onSubmit={handleSubmit}>

        <Form.Group size="lg" controlId="firstname">

          <firstnamelabel>
            <Form.Label>First Name:</Form.Label>
          </firstnamelabel>

          <inputfirstname>
          <Form.Control
            autoFocus
            type="firstname"
            placeholder= "First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            
          />
          </inputfirstname>
        </Form.Group>

        <Form.Group size="lg" controlId="lastname">

          <lastnamelabel>
            <Form.Label>Last Name:</Form.Label>
          </lastnamelabel>

          <inputlastname>
          <Form.Control
            autoFocus
            type="lastname"
            placeholder= "Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            
          />
          </inputlastname>
        </Form.Group>



        <Form.Group size="lg" controlId="email">

          <emaillabel>
            <Form.Label>Email address:</Form.Label>
          </emaillabel>

          <inputemail>
          <Form.Control
            autoFocus
            type="email"
            placeholder= "Email"
            value={emailRegister}
            onChange={(e) => setEmailRegister(e.target.value)}
            
          />
          </inputemail>
        </Form.Group>


        <Form.Group size="lg" controlId="password">

        <passwordlabel>
        <Form.Label >Password:</Form.Label>
        </passwordlabel>

          <inputpassword>
          <Form.Control
            type="password"
            placeholder="Password"
            value={passwordRegister}
            onChange={(e) => setPasswordRegister(e.target.value)}
            
          />
         </inputpassword>

        </Form.Group>

        <logButton>
          <Button onClick ={register} block size="lg" type="submit" disabled={!validateForm()}>
           Register
          </Button>
        </logButton>

        <log>
        <Link to='/'>
          Back to login
        </Link>

        </log> 

        <h4>{registerStatus}</h4>

  
    
      </Form>

      <style jsx>{`

            body {
               font: 13px/20px "Lucida Grande", Tahoma, Verdana, sans-serif;
               color: #404040;
               background: #0ca3d2;
              }
        
        
            .Register {
              position: relative;
              margin: 40px auto;
              padding: 20px 20px 150px;
              width: 310px;
              background: white;
              border-radius: 3px;
              -webkit-box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
              box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);


          }

    

          .Register:before {
            content: '';
            position: absolute;
            top: -8px;
            right: -8px;
            bottom: -8px;
            left: -8px;
            z-index: -1;
            background: rgba(0, 0, 0, 0.08);
            border-radius: 4px;
          }

          .Register h1 {
            margin: -20px -20px 21px;
            line-height: 40px;
            font-size: 15px;
            font-weight: bold;
            color: #555;
            text-align: center;
            text-shadow: 0 1px white;
            background: #f3f3f3;
            border-bottom: 1px solid #cfcfcf;
            border-radius: 3px 3px 0 0;
            background-image: -webkit-linear-gradient(top, whiteffd, #eef2f5);
            background-image: -moz-linear-gradient(top, whiteffd, #eef2f5);
            background-image: -o-linear-gradient(top, whiteffd, #eef2f5);
            background-image: linear-gradient(to bottom, whiteffd, #eef2f5);
            -webkit-box-shadow: 0 1px whitesmoke;
            box-shadow: 0 1px whitesmoke;
          }
          
          
          
          .Register register {
            position relative;
           
            top : 80px;
            left -40px;
          }

          .Register logButton {
            position relative;
            top: 130px;
            left : 240px;
          }

          .Register inputfirstname {

            position relative;
            top 25px;
            left -5px;
          }

          .Register firstnamelabel {
            position relative;
            left 39px;
          }

          .Register inputpassword {

            position relative;
            left 4px;
            top 120px;
            margin : 20px 0 0;
            width : 200px;
            
          }

          .Register inputemail {

            position relative;
            left -25px;
            top 90px;
            
          }

          .Register passwordlabel {

            position relative;
            top 95px;
            left 40px;


          }

          .Register emaillabel {

            position relative;
           
            left 39px;
            top 65px;


          }

          .Register inputlastname {

            position relative;
            left -5px;
            top 55px;
          }
          
          .Register lastnamelabel {
            position relative;
            top 30px;
            left 39px;
          }

          .Register log {
            position relative;
            top 180px;
            left -89px;
          }

          .Register h4 {
            
            position relative;

            top 90px;
            left 30px;
          }
         

          `}

          
          


        </style>




    </div>
    );
    
    
  }




