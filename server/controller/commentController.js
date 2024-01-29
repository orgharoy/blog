import Comment from "../models/comments.js";
import Blog from "../models/blogs.js";

export const createComment = async (req, res) => {
    try {
      const { blogId, name, email, body } = req.body;
      console.log(req.body);

      const newComment = await Comment.create({ blogId, name, email, body });
  
      res.status(201).json({
        message: 'Comment Successfully Posted',
        comment: newComment,
      });
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getBlogsComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const comments = await Comment.findAll({
      where: { blogId },
      order: [['createdAt', 'DESC']] // Order by createdAt in descending order
    });

    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments by blogId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCommentById = async (req, res) => {
    try {
      const commentID = req.params.id;
      const { name, email, body } = req.body;
  
      const comment = await Comment.findByPk(commentID);
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      await comment.update({ name, email, body, });
      res.json(comment);
    } catch (error) {
      console.error('Error updating comment by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const deleteCommentByID = async (req, res) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findByPk(commentId);
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      await comment.destroy();
  
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };