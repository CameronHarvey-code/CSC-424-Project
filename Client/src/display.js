import React from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';


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

    Axios.post('http://localhost:3001/updateAttendance', {
        attendance: 13,
        name: ename,
        date: date,

    }).then((response) => {


    });
  
  }


  render() {
      return(

        <div className="col">

        {this.state.info.map((val) => (
     <div>
        <div>
            {val.event_name}      {val.event_date} {val.event_attendance}
        </div>

        <Button onClick={this.updateAttendance.bind(this,val.event_name, val.event_date)}>Add Attendance</Button>
       
        </div>
        
        ))}
       </div>

      );
  }
  
}

export default Display;