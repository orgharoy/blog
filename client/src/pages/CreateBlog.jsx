import React from 'react';
import { Button, Form, Input } from 'antd';

const CreateBlog = () => {
  const { TextArea } = Input;

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form name="basic" 
      labelCol={{span: 3, }}
      wrapperCol={{span: 21, }}
      //style={{ maxWidth: 600,}}
      initialValues={{ remember: true, }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="container mx-auto px-9"
    >
      <Form.Item  label="Blog Title" name="title" rules={[ { required: true, message: 'Please enter blog title!',},]} >
        <Input />
      </Form.Item>

      <Form.Item  label="Blog Contents" name="password" rules={[ { required: true, message: 'Please enter blog contents!', }, ]}>
        <TextArea rows={14} />
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Button type="primary" htmlType="submit">
          Create Blog
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateBlog