const mongoose = require('mongoose')

const url = process.env.DB_URL

mongoose.set('strictQuery', false)
mongoose.connect(url)
const numberSchema = mongoose.Schema({
	name: {
		type: String,
		minLength: 3
	},
	number:{
		type: String,
		minLength: 8,
		validate: {
			validator: (num) => {
				let dashFreq = 0
				for (let i = 0; i < num.length; i++) {
					let convertToNum = Number(num.charAt(i))
					if (convertToNum === undefined || isNaN(convertToNum)) {
						if (num.charAt(i) !== '-') {
							return false
						}
					}
					if (num.charAt(i) === '-') {
						dashFreq++
					}
				}

				if (dashFreq !== 1) {
					return false
				}

				return num.charAt(2) === '-' || num.charAt(3) === '-'
			}
		}
	}
})

numberSchema.set('toJSON', {
	transform: (document, entry) => {
		entry.id = entry._id.toString()
		delete entry._id
		delete entry.__v
	}
})
module.exports = mongoose.model('Number', numberSchema)



