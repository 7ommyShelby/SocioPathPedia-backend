const postmodel = require('../model/post');
const usermodel = require('../model/User');
// const cloudinary = require('cloudinary').v2

const createPost = async (req, res) => {
    try {

        const { id } = req.user;
        const { description } = req.body;
        console.log(req.body);

        console.log(req.file, 'file');


        const picturePath = req.file ? req.file.path : null;

        const user = await usermodel.findById(id);

        const newpost = new postmodel({
            userid: id,
            firstName: user.firstName,
            lastName: user.lastName,
            description,
            picturePath,
            location: user.location,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        })

        await newpost.save()

        const post = await postmodel.find().sort({ createdAt: -1 })
        // console.log(post);
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

        const userposts = await postmodel.find({ userid }).sort({ createdAt: -1 })

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
const commentpost = async (req, res) => {

    try {

        const { id } = req.user;
        const { postId, comment } = req.body;

        const post = await postmodel.findById(postId)
        const loggeduser = await usermodel.findById(id)

        const usercomment = { userid: id, text: comment, user: { name: `${loggeduser.firstName + " " + loggeduser.lastName}`, profile : loggeduser.picturePath }, }

        // console.log("current post", post);
        // console.log("Current user", loggeduser);

        post.comments.push(usercomment)
        // const updatepost = await postmodel.findById(postid)
        await post.save()

        res.json({
            message: "Comment Added Successfully",
            post
        })


    } catch (error) {
        console.log("something went wrong at commentpost", error.message);
        res.status(404).json({
            message: "something went wrong at commentpost" + error.message
        })
    }
}

const postcontroller = {
    createPost,
    getfeedPost,
    getUserPost,
    LikePost,
    commentpost
}

module.exports = postcontroller