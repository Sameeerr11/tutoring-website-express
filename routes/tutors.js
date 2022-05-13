var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/tutorly-website');

var collection = db.get('tutors')

router.get('/', function(req,res){
  collection.find({}, function(err, tutors){
    if(err) throw err;
      res.json(tutors);
  });
});

router.get('/:id', function(req,res){
    collection.find({ _id: req.params.id }, function(err, tutor){
      if(err) throw err;
        res.json(tutor);
    });
  });


router.post('/', function(req, res){
    collection.insert({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        aboutMe: req.body.aboutMe,
        image: req.body.image,
        averageRating: req.body.averageRating,
        hoursCompleted: req.body.hoursCompleted,
        coursesTaught: req.body.coursesTaught,
        languagesSpoken: req.body.languagesSpoken,
        workingHours: req.body.workingHours
    }, function(err, tutor){
        if(err) throw err;
        res.json(tutor);
    });
});


router.put('/:id', function(req, res){
    collection.update({
        _id: req.params.id }, { $set:{
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          aboutMe: req.body.aboutMe,
          image: req.body.image,
          averageRating: req.body.averageRating,
          hoursCompleted: req.body.hoursCompleted,
          coursesTaught: req.body.coursesTaught,
          languagesSpoken: req.body.languagesSpoken,
          workingHours: req.body.workingHours
        }
    }, function(err, tutor){
        if(err) throw err;
            res.json(tutor);
    });
});


router.delete('/:id', function(req,res){
    collection.remove({ _id: req.params.id }, function(err, tutor){
      if(err) throw err;
        res.json(tutor);
    });
  });

module.exports = router;
