import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined, MessageOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

const BlogCard = () => {
  return (
    <Link to="/blog" className="cursor-pointer border rounded-[6px] w-[250px] h-[300px] bg-gradient-to-r from-[#98f6f3] to-[#00ff80] group hover:from-[#00ff80] hover:to-[#98f6f3] transition-all">
        <div className="rounded-[4.5px] p-3 w-full h-[98.5%] bg-white relative">
            <h1 className="font-semibold text-2xl w-8/12">An Amazing Blog Title</h1>
            <p className="mt-5 border-t pt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est voluptates inventore vero dicta eius a dignissimos nam aut! Atque, dolor!</p>
            <div className="mt-6">
                <h2 className="text-blue-600 ">
                    Read More 
                    <ArrowRightOutlined className="ml-2 group-hover:ml-4 transition-all"/>
                </h2>
            </div>

            <Tag color="cyan" className="absolute top-6 right-1">
                155 
                <MessageOutlined className="ml-2"/>
            </Tag>
        </div>
    </Link>
  )
}

export default BlogCard