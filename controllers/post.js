const postmodel = require('../model/post');
const usermodel = require('../model/User');
// const cloudinary = require('cloudinary').v2

const createPost = async (req, res) => {
    try {

        const { userid, description, picturePath } = req.body;

        const user = await usermodel.findById(userid);

        const newpost = new postmodel({
            userid,
            firstName: user.firstName,
            lastName: user.lastName,
            description,
            picturePath : req.file.path,
            location: user.location,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        })

        await newpost.save()

        const post = await postmodel.find()

        res.json(post)

    } catch (error) {
        console.log("something went wrong at creating post", error.message);
        res.status(404).json({
            message: "something went wrong at creating post" + error.message
        })
    }
}

const getfeedPost = async (req, res) => {
    try {
        const post = await postmodel.find().sort({ createdAt: -1 })
        res.json(post)
    } catch (error) {
        console.log("something went wrong at getting newsfeed", error.message);
        res.status(404).json({
            message: "something went wrong at getting newsfeed" + error.message
        })
    }
}

const getUserPost = async (req, res) => {
    try {
        const { userid } = req.params

        const userposts = await postmodel.find({ userid })

        res.json(userposts)

    } catch (error) {
        console.log("something went wrong at getting userpost", error.message);
        res.status(404).json({
            message: "something went wrong at getting userpost" + error.message
        })
    }
}
const LikePost = async (req, res) => {
    try {

        const { id } = req.params;
        const { userid } = req.body;

        const post = await postmodel.findById(id);

        const isliked = post.likes.get(userid)

        if (isliked) {
            post.likes.delete(userid)
        } else {
            post.likes.set(userid, true)
        }

        const updatepost = await postmodel.findByIdAndUpdate(id, { likes: post.likes }, { new: true })

        res.json(updatepost)

    } catch (error) {
        console.log("something went wrong at likepost", error.message);
        res.status(404).json({
            message: "something went wrong at likepost" + error.message
        })
    }
}


const postcontroller = {
    createPost,
    getfeedPost,
    getUserPost,
    LikePost
}

module.exports = postcontroller