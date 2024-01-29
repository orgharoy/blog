import React, { useState, useContext } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import apiRoutes from '../api/apiRoutes.js';
import NotificationContext from '../context/notificationContext.jsx';

const CreateBlog = () => {
  const { TextArea } = Input;
  const [buttonLoad, setButtonLoad] = useState(false);
  const { openNotification } = useContext(NotificationContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setButtonLoad(true);

    values.userId = 1;

    try {
      const response = await axios.post(apiRoutes.createBlog, values);
      setButtonLoad(false);
      openNotification('success', 'Successfully Created', response.data.message) 
      
      form.resetFields();

      //navigate(`/business-initiative/${response.data.model.id}`);

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
          Create Blog
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateBlog