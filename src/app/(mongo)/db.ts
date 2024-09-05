import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string;

if (!MONGO_URL) {
    console.error('MONGO_URL environment variable is missing. Please define it in your .env.local file.');
    process.exit(1); // Exit the process with a failure status code
}

export const connectToDatabase = async () => {
    try {
        // Check if the connection is already established
        if (mongoose.connection.readyState === 0) {
            // Connect to MongoDB with additional options
            await mongoose.connect(MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // Optionally add other options here
            });
            console.log('Connected to MongoDB successfully');
        } else {
            console.log('Already connected to MongoDB');
        }
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw new Error('Failed to connect to MongoDB'); // Rethrow the error to be handled by the caller
    }
};

// Optional: Function to disconnect from MongoDB
export const disconnectFromDatabase = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            console.log('Disconnected from MongoDB successfully');
        } else {
            console.log('MongoDB is not connected, nothing to disconnect');
        }
    } catch (error) {
        console.error('Failed to disconnect from MongoDB:', error);
    }
};
