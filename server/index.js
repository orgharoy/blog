import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { databaseInit } from './database/index.js';

import { createBlog, getBlogs, getBlogsById, updateBlogById, deleteBlogById } from './controller/blogController.js';
import { createComment, getCommentByBlogId, deleteCommentByID } from './controller/commentController.js';

const app = express();
const port = 3000;

databaseInit();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true,}),);


app.post('/api/blog', createBlog)
app.get('/api/blogs', getBlogs)
app.get('/api/blog/:id', getBlogsById)
app.put('/api/blog/:id', updateBlogById);
app.delete('/api/blog/:id', deleteBlogById);

app.post('/api/comment', createComment);
app.get('/api/comment/:blogId', getCommentByBlogId);
app.put('/api/comment/:id', createComment);
app.delete('/api/comment/:id', deleteCommentByID);

app.listen(port, () => {
  console.log(`🚀 App Started On Port: ${port}`);
});