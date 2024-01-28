import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom'

const TopBar = () => {

  const items = [
    {
      label: (
        <Link to="/create-blog">
          Create Blog
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          All Blogs
        </a>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item（disabled）',
      key: '3',
      disabled: true,
    },
  ];

  return (
    <div className="container mx-auto flex items-center justify-between h-full">
      <div className="flex items-center h-full">
        <Link to="/" className="font-semibold text-2xl hover:underline transition-all">myBlogs</Link>
      </div>
      <div className="hidden md:flex items-center h-full">
        <Dropdown menu={{ items, }} className=" cursor-pointer">
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Menu
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

export default TopBar