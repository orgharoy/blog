import React from 'react';


import BlogCard from '../componenets/BlogCard';

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="py-8 flex flex-wrap justify-center gap-5">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  )
}

export default Home