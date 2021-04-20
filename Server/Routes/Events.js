const express = require('express');
const client = require('../Database/dbConn');
const queries = require('../Database/Queries');

const router = express.Router();

router.post('/addEvent', (req, res) => {

    const date = req.body.date;
    const event = req.body.event;
  
    client.execute(queries.AddEvent,
      [event, date],
      (err, result) => {
        console.log(err);
      });
})

router.post('/deleteEvent', (req, res) => {

    const id = req.body.id;
  
    //console.log("Delete:", id);
    client.execute(queries.DeleteEvent,
        [id], {prepare : true},
        (err, result) => {
            console.log(err);
        });
})

router.get('/eventDisplay', (req, res) => {
    client.execute(queries.EventDisplay,
        (err, result) => {
          //console.log("Event Display:", result);
            res.send(result);
        });
    
});

router.post('/updateAttendance', (req, res) => {

    const id = req.body.id;
    const nursery = req.body.nursery;
    const pre_school = req.body.pre_school;
    const kinder = req.body.kinder;
    const early_elementary = req.body.early_elementary;
    const late_elementary = req.body.late_elementary;
    const name = req.body.name;
    const date = req.body.date;
    console.log(req.body.name);
    console.log(req.body.date);
    console.log(req.body.nursery);
    console.log(req.body.sanctuary);
    client.execute(queries.UpdAtt,
        [nursery, pre_school, kinder, early_elementary, late_elementary, id], {prepare : true},
        (err, result) => { 
            console.log(err);
        });
});


module.exports = router;