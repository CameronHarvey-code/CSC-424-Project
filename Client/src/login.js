import React, { useEffect, useState, location } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link } from "react-router-dom";
import Axios from 'axios';
import auth from './auth';
import styles from './login.css';




export const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      email: email,
      password: password,
    }).then((response) => {

      
      if(response.data.message){

        setLoginStatus(response.data.message);

      }

      else {

        window.location.reload();
      }
   

     
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {

    if (response.data.loggedIn == true) {
      setLoginStatus(response.data.user.rows[0].user_email);
      //console.log(response.data.user.rows[0].user_email);

      auth.login(() => {
       
        props.history.push("/loggedin");
        
      });
      

    
    }

    if (response.data.loggedIn == false) {
      //console.log(response.data[0]);
      setLoginStatus(response.data.message);
    }
  });

  }, []);

  return (

    <div>
        <head>
        <link rel="stylesheet" href="login.css"></link>
        </head>
    <div className="Login" >

   
    <h1>Login </h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">

          <emaillabel>
            <Form.Label>Email address:</Form.Label>
          </emaillabel>

          <inputemail>
          <Form.Control
            autoFocus
            type="email"
            placeholder= "Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
         </inputpassword>

        </Form.Group>

        <logButton>
          <Button onClick={login} block size="lg" type="submit" disabled={!validateForm()}>
           Login
          </Button>
        </logButton>

    <register>
        <Link to="/register">
          Register
        </Link>

    </register>

    <h4>{loginStatus}</h4>
    
      </Form>
     
    </div>
    </div>
  );
}
