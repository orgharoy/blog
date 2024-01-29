import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiRoutes from '../api/apiRoutes.js';
import { Form, Input, Button, Skeleton, Empty, Tooltip, Modal } from 'antd';
import { HeartOutlined, HeartFilled, DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import Comment from '../componenets/Comment';
import NotificationContext from '../context/notificationContext.jsx';

const Blog = ({commentsCache, setCommentsCache}) => {
  const { openNotification } = useContext(NotificationContext);
  const [buttonLoad, setButtonLoad] = useState(false);
  let { id } = useParams();
  const [form] = Form.useForm();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const { confirm } = Modal;
  const navigate = useNavigate();

  const [editingComment, setEditingComment] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiRoutes.getBlogById + id + "?userId=1");
      console.log(response.data);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      openNotification('error', 'Unsuccessful', error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(apiRoutes.getComments + id);
      setComments(response.data);
      setCommentsCache((prevCache) => ({
        ...prevCache,
        id: response.data,
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      openNotification('error', 'Unsuccessful', error.message);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchData();
    if(commentsCache[id]){
      console.log(commentsCache[id]);
      setComments(commentsCache[id])
    } else {
      fetchComments();
    }
    
  }, []);

  const onFinish = async (values) => {
    setButtonLoad(true);
    values.blogId = id;

    try {

      if(editMode){
        const response = await axios.put(apiRoutes.updateComment + editingComment.id, values);
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editingComment.id ? response.data : comment
          )
        );
        setCommentsCache((prevCache) => ({
          ...prevCache,
          id: comments,
        }));
        setButtonLoad(false);
        setEditMode(false);
      }
      else {
        const response = await axios.post(apiRoutes.createComment, values);
        setComments((prevComments) => [response.data.comment, ...prevComments]);
        setCommentsCache((prevCache) => ({
          ...prevCache,
          id: comments,
        }));
        setButtonLoad(false);
        setEditMode(false);
      }
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

  const handleDeleteComment = async (commentID) => {
    try {
      const response = await axios.delete(apiRoutes.deleteComment + commentID);
      setComments((prevComments) => prevComments.filter(comment => comment.id !== commentID));
      setCommentsCache((prevCache) => ({
        ...prevCache,
        id: comments,
      }));
      openNotification('success', 'Success', 'Comment deleted successfully');
    } catch (error) {
      console.error('Error fetching comments:', error);
      openNotification('error', 'Unsuccessful', error.message);
    }
  }

  const showConfirm = () => {
    confirm({
      title: 'Are you sure yo want to delete this Blog?',
      icon: <ExclamationCircleFilled />,
      content: 'This record will be deleted forever, and will not be retrievable later',
      cancelText: 'No',
      okText: 'Yes',
      okType: 'danger',
      //closable: 'true',
      mask: 'true',
      maskClosable: 'true',
      onOk() {

        return new Promise(async (resolve, reject) => {
 
          try {
            const response = await axios.delete(apiRoutes.deleteBlog + id); 
            openNotification('success', 'Success', 'Blog Successfully Deleted') 
            resolve(response.data);
            navigate('/');
          } catch (err) {
            openNotification('error', 'Error Deleting Data', err.response.data) ;
            reject(err);
          }
        });
      },
    });
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.post(apiRoutes.makeFavourite, {userId : 1, blogId : id});
      setBlog(prevBlog => ({ ...prevBlog, isFavorite: true }));
      openNotification('success', 'Success', response.data.message);
    } catch (error) {
      console.error('Error fetching comments:', error);
      openNotification('error', 'Unsuccessful', error.message);
    }
  }

  const removeFavourite = async () => {
    try {
      
      const response = await axios.delete(apiRoutes.deleteFavourite + "1/" + id);
      setBlog(prevBlog => ({ ...prevBlog, isFavorite: false }));
      openNotification('success', 'Success', response.data.message);
    } catch (error) {
      console.error('Error fetching comments:', error);
      openNotification('error', 'Unsuccessful', error.message);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="w-full grid grid-cols-6 gap-10 mt-5 mb-32">

        <div className="col-span-6 md:col-span-4 flex justify-between">
          <h1 className="font-bold text-3xl">{blog.title}</h1>
          <div className="flex items-center gap-2 text-xl"> 

            {
              !blog.isFavorite ? 
                <Tooltip placement="topRight" title={"Mark Favourite"}>
                  <HeartOutlined className="cursor-pointer hover:text-red-600" onClick={handleFavourite}/>
                </Tooltip>
                :
                <Tooltip placement="topRight" title={"Remove Favourite"}>
                  <HeartFilled className="cursor-pointer text-rose-600 " onClick={removeFavourite}/>
                </Tooltip>
            }
            
            <Tooltip placement="topRight" title={"Edit Blog"}>
              <EditOutlined className="cursor-pointer" onClick={() => {navigate(`/blog/edit/${id}`);}}/>
            </Tooltip>
            <Tooltip placement="topRight" title={"Delete Blog"}>
              <DeleteOutlined className="cursor-pointer hover:text-red-600" onClick={showConfirm}/>
            </Tooltip>

          </div>
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
                comments.map((comment) => <Comment key={comment.id} comment = {comment} onEditComment={handleEditComment} deleteComment = {handleDeleteComment}/>)
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Blog