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
      nursery: 0,
      pre_school: 0,
      kinder: 0,
      early_elemtary: 0,
      late_elementary: 0,
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

  updateAttendance(ename, date, id) {


    console.log(ename);
    console.log(date);

    const nursery = prompt('Please enter the NURSERY attendance:')
    const pre_school = prompt('Please enter the PRE-SCHOOL attendance:')
    const kinder = prompt('Please enter the KINDER attendance:')
    const early_elementary = prompt('Please enter the EARLY-ELEMENTARY attendance:')
    const late_elementary = prompt('Please enter the LATE-ELEMENTARY attendance:')


    Axios.post('http://localhost:3001/updateAttendance', {
        id: id,
        nursery: nursery,
        pre_school: pre_school,
        kinder: kinder,
        early_elementary: early_elementary,
        late_elementary: late_elementary,
        name: ename,
        date: date

    }).then((response) => {

      console.log(response.body);
    });

    window.location.reload();
  
  }

  deleteEvent(ename, date, id) {

    
   
    console.log("delete:", ename);

   


    Axios.post('http://localhost:3001/deleteEvent', {

        id: id,
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
              {val.date} 
              </div>

              <div className="nursery"> 
              {"Nursery: "} {val.nursery} 
                
              </div>

              <div className="pre_school">
              {"Pre-School: "}
              {val.pre_school}
              </div>

              <div className="kinder">
              {"Kinder: "}
              {val.kinder}
              </div>

              <div className="early-elementary">
              {"Early-Elementary: "}
              {val.early_elementary}
              </div>

              <div className="late-elementary">
              {"Late-Elementary: "}
              {val.late_elementary}
              </div>

      
        <button type="submit" class="attend" onClick={this.updateAttendance.bind(this,val.event_name, val.date, val.event_id)}>Add Attendance</button>
 
        <button type="submit" class="delete" onClick={this.deleteEvent.bind(this,val.event_name, val.date, val.event_id)}>Delete Event</button>
     
        </div>

        
        
        ))}
       </div>

      );
  }
  
}

export default Display;
