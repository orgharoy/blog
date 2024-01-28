import express from 'express';
import bodyParser from 'body-parser';
import { databaseInit } from './database/index.js';

import { createBlog, getBlogs, getBlogsById, updateBlogById, deleteBlogById } from './controller/blogController.js';

const app = express();
const port = 3000;

databaseInit();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.post('/api/blogs/create', createBlog)
app.get('/api/blogs', getBlogs)
app.get('/api/blogs/:id', getBlogsById)
app.put('/api/blogs/:id', updateBlogById);
app.delete('/api/blogs/:id', deleteBlogById);

app.listen(port, () => {
  console.log(`🚀 App Started On Port: ${port}`);
});