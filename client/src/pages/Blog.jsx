import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiRoutes from '../api/apiRoutes.js';
import { Form, Input, Button } from 'antd';
import Comment from '../componenets/Comment';
import NotificationContext from '../context/notificationContext.jsx';

const Blog = () => {
  const { openNotification } = useContext(NotificationContext);
  let { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(apiRoutes.getBlogById + id);
        const response = await axios.get(apiRoutes.getBlogById + id);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        openNotification('error', 'Unsuccessful', error.message);
      }
    };

    fetchData();
  }, [openNotification]);

  const onFinish = (values) => {
    console.log('Submitted values:', values);
    // Add your submission logic here
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
            <Form onFinish={onFinish}>
              <div className="flex gap-2">
                <Form.Item name="textarea" rules={[{ required: true, message: 'Enter Your Name' }]}>
                  <Input placeholder="Name"/>
                </Form.Item>
                <Form.Item name="textarea" rules={[{ required: true, message: 'Enter Your Email' }]}>
                  <Input placeholder="Email"/>
                </Form.Item>
              </div>
              <Form.Item name="body" rules={[{ required: true, message: 'Enter a comment' }]}>
                <Input.TextArea placeholder="Do you have anything to say?" />
              </Form.Item>
              <Form.Item className="flex justify-end">
                <Button type="primary" htmlType="submit">
                  Comment
                </Button>
              </Form.Item>
            </Form>

            <div>
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Blog