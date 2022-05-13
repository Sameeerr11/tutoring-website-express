var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const User = require('./../models/user.model')
const Tutor = require('./../models/tutor.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const auth = require('./middleware/auth');

mongoose.connect('mongodb://localhost:27017/tutorly-website')

router.get('/', function(req, res, next) {
  console.log('get is working')
  res.send('Success');
});

//Protected route
// router.get('/welcome', auth, function(req, res) {
//   res.send("Success");
// });



router.post('/registerstudent', async (req, res) => {
	// console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			firstname: req.body.firstname,
      lastname: req.body.lastname,
			email: req.body.email,
			password: newPassword,
      hoursCompleted: 0,

		})
		res.json({ status: 'ok' })
	} catch (err) {
    // console.error(err)
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

router.post('/loginstudent', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return 	res.json({ status: 'error', error: 'Invalid login' })
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
        user_type: "student",
        user_id: user._id,
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
});



router.post('/registertutor', async (req, res) => {

	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await Tutor.create({
			firstname: req.body.firstname,
      lastname: req.body.lastname,
			email: req.body.email,
			password: newPassword,
      aboutMe: req.body.aboutme,
      hoursCompleted: 0,

		})
		res.json({ status: 'ok' })
	} catch (err) {
    // console.error(err)B
		res.json({ status: 'error', error: 'Duplicate email' })
	}
});

router.post('/logintutor', async (req, res) => {
	const user = await Tutor.findOne({
		email: req.body.email,
	})

	if (!user) {
		return 	res.json({ status: 'error', error: 'Invalid login' })
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
        user_type: "tutor",
        user_id: user._id,
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
});


module.exports = router;
