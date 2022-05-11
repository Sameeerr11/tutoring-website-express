var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/tutorly-website');
var collection = db.get('students');

//View all students
router.get('/', function(req, res) {
    collection.find({}, function(err, students){
      if (err) throw err;
      res.json(students);
    });
  });

//READ (show single student)
router.get('/:id', function(req, res) {
  collection.find({_id: req.params.id}, function(err, student){
    if (err) throw err;
    res.json(student);
  });
});

//CREATE (insert new student)
router.post('/', function(req, res) {
  collection.insert({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        favoriteTutors: req.body.favoriteTutors,
        hoursCompleted: req.body.hoursCompleted

  }, function(err, student){
    if (err) throw err;
    res.json(student);
  });
});

//UPDATE a student
router.put('/:id', function(req, res){
  collection.update({
      _id: req.params.id }, { $set:{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        favoriteTutors: req.body.favoriteTutors,
        hoursCompleted: req.body.hoursCompleted
      }
  }, function(err, student){
      if(err) throw err;
          res.json(student);
  });
});

//DELETE
router.delete('/:id', function(req, res) {
  collection.remove({_id: req.params.id}, function(err, student){
    if (err) throw err;
    res.json(student);
  });
});

module.exports = router;