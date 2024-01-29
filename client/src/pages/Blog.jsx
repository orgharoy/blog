import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiRoutes from '../api/apiRoutes.js';
import { Form, Input, Button, Skeleton, Empty, message } from 'antd';
import Comment from '../componenets/Comment';
import NotificationContext from '../context/notificationContext.jsx';

const Blog = () => {
  const { openNotification } = useContext(NotificationContext);
  const [buttonLoad, setButtonLoad] = useState(false);
  let { id } = useParams();
  const [form] = Form.useForm();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const [editingComment, setEditingComment] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiRoutes.getBlogById + id);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      openNotification('error', 'Unsuccessful', error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(apiRoutes.getComments + id);
      console.log(response.data)
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      openNotification('error', 'Unsuccessful', error.message);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchComments();
  }, []);

  const onFinish = async (values) => {
    setButtonLoad(true);
    values.blogId = id;

    try {
      const response = await axios.post(apiRoutes.createComment, values);
      setButtonLoad(false);
      setComments((prevComments) => [values, ...prevComments]);
      form.resetFields();
    } catch (error) {
      console.log('Error:', error);
      setButtonLoad(false);
      openNotification('error', 'Unsuccessful', error.message);
    }
  };

  const onReset = () => {
    form.resetFields();
    
    setEditMode(false);
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setEditMode(true);
    form.setFieldsValue({
      name: comment.name,
      email: comment.email,
      body: comment.body,
    });

  };

  return (
    <div className="container mx-auto">
      <div className="w-full grid grid-cols-6 gap-10 mt-5 mb-32">

        <div className="col-span-6 md:col-span-4">
          <h1 className="font-bold text-3xl">{blog.title}</h1>
        </div>
        <div className="col-span-6 md:col-span-2"></div>

        <div className="col-span-6 md:col-span-4">
          <p>{blog.body}</p>
        </div>
        <div className="col-span-6 md:col-span-2">
          <div className="border rounded-md p-2">
            <Form onFinish={onFinish} form={form}>
              <div className="flex gap-2">
                <Form.Item name="name" rules={[{ required: true, message: 'Enter Your Name' }]}>
                  <Input placeholder="Name"/>
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, message: 'Enter Your Email' }]}>
                  <Input placeholder="Email"/>
                </Form.Item>
              </div>
              <Form.Item name="body" rules={[{ required: true, message: 'Enter a comment' }]}>
                <Input.TextArea placeholder="Do you have anything to say?" />
              </Form.Item>
              <Form.Item className="flex justify-end">
                <Button type="primary" onClick={onReset} className="mr-3">
                  Clear
                </Button>
                <Button type="primary" htmlType="submit" loading={buttonLoad}>
                  {editMode ? 'Update' : 'Comment'}
                </Button>
              </Form.Item>
            </Form>

            <div >
              {loadingComments ? (
                <Skeleton active />
              ) : comments.length === 0 ? (
                <Empty description="No Comments Yet" />
              ) : (
                comments.map((comment) => <Comment key={comment.id} comment = {comment} onEditComment={handleEditComment}/>)
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Blog