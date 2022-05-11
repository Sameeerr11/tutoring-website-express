var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/tutorly-website');
var collection = db.get('tutor_ratings');

//View all ratings
router.get('/', function(req, res) {
    collection.find({}, function(err, ratings){
      if (err) throw err;
      res.json(ratings);
    });
  });

//READ (show single ratings)
router.get('/:id', function(req, res) {
  collection.find({_id: req.params.id}, function(err, rating){
    if (err) throw err;
    res.json(rating);
  });
});

//CREATE (insert new rating)
router.post('/', function(req, res) {
  collection.insert({
        student_id: req.body.student_id,
        student_name: req.body.student_name,
        tutor_id: req.body.tutor_id,
        tutor_name: req.body.tutor_name,
        rating: req.body.rating,
        feedback: req.body.feedback

  }, function(err, rating){
    if (err) throw err;
    res.json(rating);
  });
});

//UPDATE a rating
router.put('/:id', function(req, res){
  collection.update({
      _id: req.params.id }, { $set:{
        student_id: req.body.student_id,
        student_name: req.body.student_name,
        tutor_id: req.body.tutor_id,
        tutor_name: req.body.tutor_name,
        rating: req.body.rating,
        feedback: req.body.feedback
      }
  }, function(err, rating){
      if(err) throw err;
          res.json(rating);
  });
});

//DELETE
router.delete('/:id', function(req, res) {
  collection.remove({_id: req.params.id}, function(err, rating){
    if (err) throw err;
    res.json(rating);
  });
});

module.exports = router;