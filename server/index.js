import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { databaseInit } from './database/index.js';

import { createBlog, getBlogs, getBlogsById, updateBlogById, deleteBlogById, getFavoriteBlogsByUserId } from './controller/blogController.js';
import { createComment, getBlogsComments, updateCommentById, deleteCommentByID } from './controller/commentController.js';
import { createFavourite, deleteFavorite } from './controller/favouriteController.js'

const app = express();
const port = 3000;

databaseInit();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true,}),);


app.post('/api/blog', createBlog)
app.get('/api/blogs', getBlogs)
app.get('/api/blogs/favourite/:userId', getFavoriteBlogsByUserId)
app.get('/api/blog/:id', getBlogsById)
app.put('/api/blog/:id', updateBlogById);
app.delete('/api/blog/:id', deleteBlogById);

app.post('/api/comment', createComment);
app.get('/api/comment/:blogId', getBlogsComments);
app.put('/api/comment/:id', updateCommentById);
app.delete('/api/comment/:id', deleteCommentByID);

app.post('/api/favorite', createFavourite);
app.delete('/api/favorite/:userId/:blogId', deleteFavorite);


app.listen(port, () => {
  console.log(`🚀 App Started On Port: ${port}`);
});