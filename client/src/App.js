import './App.css';
import Header from './components/Header';
import { Routes, Route, Router, Switch } from 'react-router-dom';
import Blogs from './pages/Blogs';
import Register from './pages/Register';
import Login from './pages/Login';
import UserBlogs from './pages/UserBlogs.js';
import CreateBlog from './pages/CreateBlog.js';
import BlogDetails from './pages/BlogDetails.js';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />      </Routes>
    </>
  );
}

export default App;
