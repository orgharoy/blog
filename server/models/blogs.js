import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    userId: {type: Number, required: true},
    //id: {type: Number, required: true},
    title: { type: String, required: true },
    body: { type: String, required: true, unique: true },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;