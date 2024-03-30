import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'
// import 

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([])

    //get user blogs
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userID');
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });
            console.log('API Response:', data); // Log the API response
            if (data?.success) {
                setBlogs(data?.UserBlogs.blogs);
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getUserBlogs();
    }, []);

    useEffect(() => {
        console.log('Blogs:', blogs); // Log the blogs state whenever it changes
    }, [blogs]);

    return (
        <div>
            {blogs && blogs.map((blog, index) => (
                <BlogCard
                    id={blog._id}
                    isUser={true}
                    key={index}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={blog.user.username}
                    time={blog.createdAt}
                />
            ))}
            {/* console.log(data) */}
        </div>
    )
}

export default UserBlogs