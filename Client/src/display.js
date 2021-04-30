import React from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';

import styles from './display.css'


var nursery, kinder, pre_school, early_elementary, late_elementary;
var teachers_assistants, sanctuary, media_room, ushers, visitors, w_baptisms, h_g_baptisms;



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
      teachers_assistants: 0, 
      sanctuary: 0, 
      media_room: 0, 
      ushers: 0, 
      visitors: 0, 
      w_baptisms: 0, 
      h_g_baptisms: 0,
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



    Axios.post('http://localhost:3001/updateAttendance', {
        id: id,
        nursery: nursery,
        pre_school: pre_school,
        kinder: kinder,
        early_elementary: early_elementary,
        late_elementary: late_elementary,
        teachers_assistants: teachers_assistants,
        sanctuary: sanctuary,
        media_room: media_room,
        ushers: ushers,
        visitors: visitors,
        w_baptisms: w_baptisms,
        h_g_baptisms: h_g_baptisms,
        name: ename,
        date: date

    }).then((response) => {

      console.log(response.body);
    });

    window.location.reload();
  
  }

  deleteEvent(ename, date, id) {

    
    if (window.confirm('Are you sure you want to delete this event?')) {
    console.log("delete:", ename);

   


    Axios.post('http://localhost:3001/deleteEvent', {

        id: id,
        name: ename,
        date: date,

    }).then((response) => {


    });

    window.location.reload();

  }
  else{

  }
  
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

              <div class="form">
                
                <div className="nursery"> 
                  <label for="nursery"> {"Nursery: "}  </label>
              
                  <div > 
                    <input type="text" placeholder={val.nursery} name="nursery" value={this.nursery} onChange={(e) => nursery = e.target.value } ></input>
                  </div>
                
              </div>

              <div className="pre_school">
                <label for="pre_school">  {"Pre-School: "} </label>
                <div>
                <input type="text" placeholder={val.pre_school} name="pre_school" value={this.pre_school} onChange={(e) => pre_school = e.target.value } ></input>
                </div>
              </div>

              <div className="kinder">
              <label for="kinder">  {"Kinder: "} </label>
                <div>
                <input type="text" placeholder={val.kinder} name="kinder" value={this.kinder} onChange={(e) => kinder = e.target.value } ></input>
                </div>
              </div>

              <div className="early-elementary">
              <label for="early-elementary">  {"Early Elementary: "} </label>
                <div>
                <input type="text" placeholder={val.early_elementary} name="early_elementary" value={this.early_elementary} onChange={(e) => early_elementary = e.target.value } ></input>
                </div>
              </div>

              <div className="late-elementary">
              <label for="late-elementary">  {"Late Elementary: "} </label>
                <div>
                <input type="text" placeholder={val.late_elementary} name="late_elementary" value={this.late_elementary} onChange={(e) => late_elementary = e.target.value } ></input>
                </div>
              </div>

              <div className="teachers-assistants">
              <label for="teachers-assistants">  {"Teachers & Assistants: "} </label>
                <div>
                <input type="text" placeholder={val.teachers_assistants} name="teachers-assistants" value={this.teachers_assistants} onChange={(e) => teachers_assistants = e.target.value } ></input>
                </div>
              </div>

              <div className="sanctuary">
              <label for="sanctuary">  {"Sanctuary: "} </label>
                <div>
                <input type="text" placeholder={val.sanctuary} name="sanctuary" value={this.sanctuary} onChange={(e) => sanctuary = e.target.value } ></input>
                </div>
              </div>

              <div className="media-room">
              <label for="media-room">  {"Media Room: "} </label>
                <div>
                <input type="text" placeholder={val.media_room} name="media-room" value={this.media_room} onChange={(e) => media_room = e.target.value } ></input>
                </div>
              </div>

              <div className="ushers">
              <label for="ushers">  {"Ushers: "} </label>
                <div>
                <input type="text" placeholder={val.ushers} name="ushers" value={this.ushers} onChange={(e) => ushers = e.target.value } ></input>
                </div>
              </div>

              <div className="visitors">
              <label for="visitors">  {"Visitors: "} </label>
                <div>
                <input type="text" placeholder={val.visitors} name="visitors" value={this.visitors} onChange={(e) => visitors = e.target.value } ></input>
                </div>
              </div>

              <div className="w-baptisms">
              <label for="w-baptisms">  {"Water Baptisms: "} </label>
                <div>
                <input type="text" placeholder={val.w_baptisms} name="w-baptisms" value={this.w_baptisms} onChange={(e) => w_baptisms = e.target.value } ></input>
                </div>
              </div>

              <div className="h-g-baptisms">
              <label for="h-g-baptisms">  {"Holy Ghost Baptisms: "} </label>
                <div>
                <input type="text" placeholder={val.h_g_baptisms} name="h-g-baptisms" value={this.h_g_baptisms} onChange={(e) => h_g_baptisms = e.target.value } ></input>
                </div>
              </div>

          </div>
              


        <button type="submit" class="attend" onClick={this.updateAttendance.bind(this,val.event_name, val.date, val.event_id)}>Update Attendance</button>
 
        <button type="submit" class="delete" onClick={this.deleteEvent.bind(this,val.event_name, val.date, val.event_id)}>Delete Event</button>
     
        </div>

        
        
        ))}
       </div>

      );
  }
  
}

export default Display;
