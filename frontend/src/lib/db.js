import mongoose from 'mongoose';

const connect = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB Already connected!');
    return mongoose.connection.asPromise();
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connection to MongoDB Successful');
    } catch (error) {
      console.log('Connection Failed!');
    }
  }
};

export default connect;