const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')
const mongoose = require('mongoose');

//GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if (!blogs) {
            return rex.status(200).send({
                success: false,
                message: 'No Blogs Found'
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: 'All Blogs Lists',
            blogs,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error while getting Blogs',
            error
        })
    }
}

//Create Blog
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body
        //validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: 'Please Provide all Fields'
            })
        }
        const exisitingUser = await userModel.findById(user)
        //validation
        if (!exisitingUser) {
            return res.status(404).send({
                success: false,
                message: 'Unable to Find User'
            })
        }
        const newBlog = new blogModel({ title, description, image, user })
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({ session })
        exisitingUser.blogs.push(newBlog)
        await exisitingUser.save({ session })
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: "Blog Created",
            newBlog,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while Creating Blog',
            error
        })
    }
}

//Update Blog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, image } = req.body
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            success: true,
            message: 'Blog Updated',
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while Updating Blog',
            error
        })
    }
}

//Single BLog
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found with this'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Fetch Single Blog',
            blog,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while getting Single Blog',
            error
        })
    }
}

//Delete Blog
exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findOneAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: 'Blog Deleted!'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while Deleteing Blog',
            error
        })
    }
}

//Get User Blog
exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'User Blogs',
            userBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error in User Blog',
            error
        })
    }
};