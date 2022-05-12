const mongoose = require('mongoose')

// const tutor_ids = new mongoose.Schema(
// 	{
// 		tutor_id: { type: String },
// 	}
// )


const User = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        favoriteTutors: { type: [String], required: false},
        hoursCompleted: { type: Number, required: false}
	},
	{ collection: 'students' }
)

const model = mongoose.model('students', User)

module.exports = model