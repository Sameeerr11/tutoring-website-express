var express = require('express');
var router = express.Router();

var monk = require('monk');
// var db = monk('localhost:27017/final-proj'); //by Erum (Uncomment accordingly)
var db = monk('localhost:27017/tutorly-website'); //by Sameer (Uncomment accordingly)
var collection = db.get('appts');

//View all appointments
router.get('/', function(req, res) {
    collection.find({}, function(err, appts){
      if (err) throw err;
      res.json(appts);
    });
  });

//READ (show single appointment)
router.get('/:id', function(req, res) {
  collection.find({_id: req.params.id}, function(err, appt){
    if (err) throw err;
    res.json(appt);
  });
});

//CREATE (insert new appointment)
router.post('/', function(req, res) {
  collection.insert({
    tutor_id: req.body.tutor_id,
    tutor_name: req.body.tutor_name,
    student_id: req.body.student_id,
    student_name: req.body.student_name,
    date: req.body.date,
    time: req.body.time,
    course_name: req.body.course_name,
    course_id: req.body.course_id

  }, function(err, appt){
    if (err) throw err;
    res.json(appt);
  });
});

//Update an appointment
router.put('/:id', function(req, res){
  collection.update({
      _id: req.params.id }, { $set:{
          tutor_id: req.body.tutor_id,
          tutor_name: req.body.tutor_name,
          student_id: req.body.student_id,
          student_name: req.body.student_name,
          date: req.body.date,
          time: req.body.time,
          course_name: req.body.course_name,
          course_id: req.body.course_id
      }
  }, function(err, appt){
      if(err) throw err;
          res.json(appt);
  });
});

//DELETE
router.delete('/:id', function(req, res) {
  collection.remove({_id: req.params.id}, function(err, appt){
    if (err) throw err;
    res.json(appt);
  });
});

module.exports = router;