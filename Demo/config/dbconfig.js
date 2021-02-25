const mongoose = require('mongoose');
const MongoURI = 'mongodb://localhost:27017/demoo'

const InitDB = async () => {
    try {
        await mongoose.connect(MongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to demoo...")
    } catch (e) {
        console.log(e);
        throw e
    }
}
module.exports = InitDB;