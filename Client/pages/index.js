import dynamic from 'next/dynamic'
import React, { Component } from "react";
import ReactDOM from 'react-dom'
import Login from './login'



const LoginComponent = dynamic(() => import('./login'))


class Index extends Component {

  state = {};
  render() {
    return (
    <div>
    
    <Login/>
    </div>
    );
           
  }
}

export default Index;
