import React from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';

import styles from './display.css'


class Display extends React.Component {

   

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      info: [],
      attendance: 0,
      name: "",
    };

  }
  


  componentDidMount() {

    Axios.get('http://localhost:3001/eventDisplay', {

          }).then((response) => {
       
           this.setState({
               info: response.data.rows

           })

           
   
           console.log(this.state.info);

          });

  }

  updateAttendance(ename, date) {

    
   
    console.log(ename);

    const enteredNum = prompt('Please enter the attendance.')


    Axios.post('http://localhost:3001/updateAttendance', {
        attendance: enteredNum,
        name: ename,
        date: date,

    }).then((response) => {


    });

    window.location.reload();
  
  }

  deleteEvent(ename, date) {

    
   
    console.log("delete:", ename);

   


    Axios.post('http://localhost:3001/deleteEvent', {
      
        name: ename,
        date: date,

    }).then((response) => {


    });

    window.location.reload();
  
  }


  render() {
      return(

        <div className="display">

        {this.state.info.map((val) => (
     <div className="event">
        <div className="name">
            {val.event_name}    
            </div>

            <div className="date">
              {"Event Date: " }
              {val.event_date} 
              </div>

              <div className="attendance">
              {"Attendance: "}
              {val.event_attendance}
        </div>

      
        <button type="submit" class="attend" onClick={this.updateAttendance.bind(this,val.event_name, val.event_date)}>Add Attendance</button>
 
        <button type="submit" class="delete" onClick={this.deleteEvent.bind(this,val.event_name, val.event_date)}>Delete Event</button>
     
        </div>

        
        
        ))}
       </div>

      );
  }
  
}

export default Display;
