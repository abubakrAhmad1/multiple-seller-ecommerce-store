const mongoose = require("mongoose");

const connectDB = async() => {
    const dataBaseName = 'multiSellerApp';
    await mongoose.connect(`mongodb://localhost:27017/${dataBaseName}`);
    console.log('Database is connected..!!');
}

module.exports = connectDB;