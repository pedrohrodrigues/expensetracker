import mongoose from 'mongoose';

export const db = async () => {
  try {
    mongoose.set('strictQuery', false);
    if (process.env.MONGO_URL) await mongoose.connect(process.env.MONGO_URL);
    console.log('Database is working');
  } catch {
    console.log('Database connection error');
  }
};
