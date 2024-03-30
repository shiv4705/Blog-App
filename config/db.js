const mongoose = require ('mongoose')
const colors = require ('colors')

const connectDB = async () => {
    try {
        const mongoURL = process.env.MONGO_URL;
        await mongoose.connect(mongoURL);
        console.log(`Connected to MongoDB Databse ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`MONGO Connect Error ${error}`.bgRed.white)
    }
}

module.exports = connectDB;