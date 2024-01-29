import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Card, Skeleton, Empty } from 'antd';
import apiRoutes from '../api/apiRoutes.js';
import NotificationContext from '../context/notificationContext.jsx';

import BlogCard from '../componenets/BlogCard';
const { Meta } = Card;

const Favourites = () => {
  const { openNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(apiRoutes.getFavouriteBlog + '1');
        const response = await axios.get(apiRoutes.getFavouriteBlog + 1);
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
        openNotification('error', 'Unsuccessful', error.message);
      }
    };

    fetchData();
  }, [openNotification]);

  return (
    <div className="container mx-auto">
      <h1 className="font-semibold text-2xl">My Favourites</h1>
      <div className="py-8 flex flex-wrap justify-center gap-5">
        
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} style={{ width: 250, marginTop: 300 }} loading={true}>
              <Skeleton avatar active />
            </Card>
          ))
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <Empty description="No Blogs" />
        )}
      </div>
    </div>
  );
};

export default Favourites