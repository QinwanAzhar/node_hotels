import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connection URL
//const mongoURL = 'mongodb://localhost:27017/mydatabase';
const mongoURL=process.env.MONGODB_URL;
// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define event listeners for database connection
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});
db.on('error', (err) => {
    console.log('Error connecting to MongoDB server', err);
});
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});

// Export database connection
export default db;