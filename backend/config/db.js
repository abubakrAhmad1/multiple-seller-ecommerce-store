const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/multiSellerApp',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      }
    );

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('\n⚠️  Please make sure MongoDB is running!');
    console.error('   - If using local MongoDB: Start MongoDB service');
    console.error('   - If using MongoDB Atlas: Check your connection string');
    console.error('   - Connection string:', process.env.MONGODB_URI || 'mongodb://localhost:27017/multiSellerApp');
    console.error('\n💡 The server will continue to run but database operations will fail.\n');
    // Don't exit - let the server start but warn the user
    // process.exit(1);
    throw error;
  }
};

module.exports = connectDB;