import React, { useState, useEffect } from 'react';
import '../Styles/Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ username: '', title: '', desc: '' });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs/getallblog');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/blogs/createblog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBlog)
      });
      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
      // Refresh blogs after creating new blog
      fetchBlogs();
      // Reset form fields
      setNewBlog({ username: '', title: '', desc: '' });
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="blogs-container">
      <h2>Create Blog</h2>
      <form className="create-blog-form" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={newBlog.username} onChange={handleChange} required />
        <input type="text" name="title" placeholder="Title" value={newBlog.title} onChange={handleChange} required />
        <textarea name="desc" placeholder="Description" value={newBlog.desc} onChange={handleChange} required></textarea>
        <button type="submit">Create</button>
      </form>

      <h2>All Blogs</h2>
      <div>
        {blogs.map(blog => (
          <div className="blog" key={blog._id}>
            <h3>{blog.title}</h3>
            <p>By: {blog.username}</p>
            <p>{blog.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
