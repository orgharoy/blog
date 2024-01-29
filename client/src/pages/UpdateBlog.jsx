import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiRoutes from '../api/apiRoutes.js';
import NotificationContext from '../context/notificationContext.jsx';

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const { TextArea } = Input;
  const [buttonLoad, setButtonLoad] = useState(false);
  const { openNotification } = useContext(NotificationContext);
  const [form] = Form.useForm();

  const [blog, setBlog] = useState({});

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiRoutes.getBlogById + id);
        setBlog(response.data);

        form.setFieldsValue({
          title: response.data.title,
          body: response.data.body,
        });

      } catch (error) {
        console.error('Error fetching blogs:', error);
        openNotification('error', 'Unsuccessful', error.message);
      }
    };

    fetchData()

  }, [])

  const onFinish = async (values) => {
    setButtonLoad(true);

    values.userId = 1;

    try {
      const response = await axios.put(apiRoutes.updateBlog + id, values);
      setButtonLoad(false);
      openNotification('success', 'Successfully Created', "Blog Suggessfully Updated") 
      
      form.resetFields();

      navigate(`/blog/${id}`);

    } catch (error) {
      console.log('heeror here : ' + error)
      setButtonLoad(false)
      openNotification('error', 'Unsuccessful', error.message)
    }
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form name="basic" 
      labelCol={{span: 3, }}
      wrapperCol={{span: 21, }}
      initialValues={{ remember: true, }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="container mx-auto px-9"
      form={form}
    >
      <Form.Item  label="Blog Title" name="title" labelAlign='left' rules={[ { required: true, message: 'Please enter blog title!',},]} >
        <Input />
      </Form.Item>

      <Form.Item  label="Blog Contents" name="body" labelAlign='left' rules={[ { required: true, message: 'Please enter blog contents!', }, ]}>
        <TextArea rows={14} />
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Button type="primary" htmlType="submit" loading={buttonLoad} >
          Update Blog
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UpdateBlog