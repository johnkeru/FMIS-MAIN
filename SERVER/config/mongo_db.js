const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to MongoDB')
    } catch (e) {
        console.error('Error connecting to MongoDB:', e.message)
        process.exit(1)
    }
} 