const mongoose = require('mongoose')

const Tutor = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        aboutMe: { type: String, required: false},
        hoursCompleted: { type: Number, required: false},
        languagesSpoken: { type: [String], required: false},
        averageRating: { type:Number, required: false},
        workingHours: { type:[], required: false},
        coursesTaught: { type:[String], required: false},
	},
	{ collection: 'tutors' }
)

const model = mongoose.model('tutors', Tutor)

module.exports = model