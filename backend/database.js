//Connect to MongoDB
const mongoose = require("mongoose")

const MONGODB_URL = "mongodb+srv://benr:YourTubers@cluster0.hqsjccs.mongodb.net/"

exports.connect = () => {
    mongoose.connect(MONGODB_URL, {
        useNewURLParser:true,
        useUnifiedTopology: true
    })
    .then(
        console.log('DB connected successfully')
    )
    .catch((error) => {
        console.log('DB connection FAILED');
        console.log(error);
        process.exit(1)
    })
}