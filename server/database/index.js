import mongoose from 'mongoose';
import Blog from '../models/blogs.js';
import { config } from 'dotenv'
config();

async function databaseInit() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('✅ Connected to MongoDB');

    await Blog.init();
    console.log('✅ Models migrated to the database');

  } catch (error) {
    console.error('❌Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect
  }
}

export { databaseInit };